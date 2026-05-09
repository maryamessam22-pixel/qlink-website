import React, { useState, useEffect, useContext } from 'react';
import SEO from '../../components/common/SEO';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import Logo from '../../components/layout/Logo';
import ThemeToggleButton from '../../components/common/ThemeToggleButton';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/Supabase'; 
import qlinkBg from '../../assets/images/qlink-bg.png';
import watchImg from '../../assets/images/watch.png';
import './AuthPage.css';

function AuthPage() {
  const { login, closeModal, setShowLoginModal, pendingRoute, setPendingRoute, isAuthenticated } = useAuth();
  const { lang, setLang, t } = useContext(LanguageContext);
  const isAr = lang === 'ar';
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.state?.mode !== 'signup');
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const navigate = useNavigate();

  const handleLanguageToggle = () => {
    const nextLang = isAr ? 'en' : 'ar';
    setLang(nextLang);
    navigate(`/auth?lang=${nextLang}`, { replace: true, state: location.state });
  };

  const renderTopButtons = () => (
    <div className="auth-top-buttons">
      <button
        className="auth-lang-toggle"
        onClick={handleLanguageToggle}
        aria-label="Toggle language"
        title={isAr ? 'English' : 'العربية'}
        type="button"
      >
        {isAr ? 'EN' : 'AR'}
      </button>
      <ThemeToggleButton className="auth-theme-toggle" />
    </div>
  );


  useEffect(() => {
    setShowLoginModal(false);
  }, [setShowLoginModal]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlLang = params.get('lang');

    if (urlLang !== 'ar' && urlLang !== 'en' && lang !== 'en') {
      setLang('en');
    }
  }, [lang, location.search, setLang]);

  const [seoData, setSeoData] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  
  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const { data: seo } = await supabase
          .from('seo')
          .select('*')
          .eq('slug', 'auth')
          .single();
        if (seo) setSeoData(seo);
      } catch (err) {
        console.error("Error fetching SEO:", err);
      }
    };

    fetchSEO();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      
      if (email === 'maryamessam22@gmail.com') {
        if (password !== 'mariam123') {
          setErrorMsg(t('auth.adminError'));
          setIsLoading(false);
          return;
        }
        login('Mariam Essam', email, true);
      } 
      
      
      else {
        let displayName = email.split('@')[0];

        if (isLogin) {
          
          const { data: userData } = await supabase
            .from('login_signup')
            .select('full_name')
            .eq('email', email)
            .single();
            
          if (userData && userData.full_name) {
            displayName = userData.full_name;
          }
          login(displayName, email, true);
          
        } else {
          
          displayName = fullName;

          const newRecord = {
            id: crypto.randomUUID(), 
            full_name: fullName,
            email: email,
            password: password
          };

          const { error } = await supabase
            .from('login_signup')
            .insert([newRecord]);

          if (error) {
            console.error("Supabase Error:", error);
           
            setErrorMsg(`${t('auth.supabaseErrorPrefix')}${error.message}. ${t('auth.supabaseErrorHint')}`);
            setIsLoading(false);
            return; 
          }

          login(displayName, email, true);
        }
      }

   
      setTimeout(() => {
        setIsLoading(false);
        setShowSplash(true);
      }, 1000);

    } catch (err) {
      console.error("Auth Error:", err);
      setErrorMsg(t('auth.generalError'));
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        if (pendingRoute) {
          navigate(pendingRoute);
          setPendingRoute(null);
        } else {
          navigate('/'); 
        }
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showSplash, navigate, pendingRoute, setPendingRoute]);



  useEffect(() => {
    if (isAuthenticated && !showSplash && !isLoading) {
      if (pendingRoute) {
        navigate(pendingRoute);
        setPendingRoute(null);
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, showSplash, isLoading, navigate, pendingRoute, setPendingRoute]);

  if (showSplash) {
    return (
      <div className="auth-container">
        {renderTopButtons()}
        <div className="auth-light"></div>
        <div className="auth-light-two"></div>
        <div className="auth-light-three"></div>
        <img src={qlinkBg} className="auth-bg-graphic" alt="Qlink pattern" />
        <div className="auth-splash">
          <div className="auth-splash-watch-wrap">
            <img src={watchImg} className="auth-splash-watch" alt="Qlink Smartwatch" />
          </div>
          <Logo className="auth-splash-logo" />
          <div className="auth-splash-tagline">{t('auth.splashTagline')}</div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="auth-container">
        {renderTopButtons()}
        <div className="auth-light"></div>
        <div className="auth-light-two"></div>
        <div className="auth-light-three"></div>
        <img src={qlinkBg} className="auth-bg-graphic" alt="Qlink pattern" />
        <div className="auth-loader">
          <Logo className="auth-loader-logo" />
          <div className="auth-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`auth-container ${isAr ? 'rtl-active' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
      <SEO 
        title={seoData ? (isAr ? seoData.title_ar : seoData.title_en) : t('auth.title')}
        description={seoData ? (isAr ? seoData.description_ar : seoData.description_en) : t('auth.modalNotice')}
        slug="auth"
      />
      
      <button 
        className="auth-back-btn" 
        onClick={() => navigate('/')}
        aria-label={t('auth.backToHome')}
      >
        {isAr ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
        <span>{t('auth.back')}</span>
      </button>

      {renderTopButtons()}

      <div className="auth-light"></div>
      <div className="auth-light-two"></div>
      <div className="auth-light-three"></div>
      <img src={qlinkBg} className="auth-bg-graphic" alt="Qlink pattern" />

      <div className="auth-content">
        <div className="auth-screen" id={isLogin ? 'signin' : 'signup'}>
          <div className="auth-header">
            <Logo className="auth-logo" />
            <div className="auth-tagline">{t('auth.welcome')}</div>
          </div>

          <div className="auth-card">
            <div className="auth-tabs">
              <button
                className={`auth-tab ${isLogin ? 'active' : ''}`}
                onClick={() => { setIsLogin(true); setErrorMsg(''); }}
                type="button"
              >
                {t('auth.signIn')}
              </button>
              <button
                className={`auth-tab ${!isLogin ? 'active' : ''}`}
                onClick={() => { setIsLogin(false); setErrorMsg(''); }}
                type="button"
              >
                {t('auth.signUp')}
              </button>
            </div>

          
            {errorMsg && (
              <div style={{ color: '#fff', backgroundColor: 'rgba(224, 50, 50, 0.8)', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '15px', textAlign: 'center', border: '1px solid #E03232', fontWeight: '500' }}>
                {errorMsg}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="auth-field">
                  <label>{t('auth.fullName')}</label>
                  <div className="auth-input-wrap">
                    <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input 
                      type="text" 
                      placeholder={t('auth.fullNamePlaceholder')}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required 
                    />
                  </div>
                </div>
              )}

              <div className="auth-field">
                <label>{t('auth.email')}</label>
                <div className="auth-input-wrap">
                  <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="4" width="20" height="16" rx="3" /><path d="m2 7 10 7 10-7" />
                  </svg>
                  <input 
                    type="email" 
                    placeholder={t('auth.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="auth-field">
                <label>{t('auth.password')}</label>
                <div className="auth-input-wrap" style={{ position: 'relative' }}>
                  <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder={t('auth.passwordPlaceholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', [isAr ? 'left' : 'right']: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#888', display: 'flex', alignItems: 'center' }}
                    aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-btn-primary">
                {isLogin ? t('auth.btnSignIn') : t('auth.btnSignUp')} <span className="auth-btn-arrow">{t('auth.btnArrow')}</span>
              </button>
            </form>

            <div className="auth-divider"><span>{t('auth.continue')}</span></div>
            <div className="auth-socials">
              <button type="button" className="auth-social-btn">{t('auth.google')}</button>
              <button type="button" className="auth-social-btn">{t('auth.github')}</button>
            </div>
          </div>

          <div className="auth-card-footer">
            {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
            <a href="#" className="auth-link" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); setErrorMsg(''); }}>
              {isLogin ? t('auth.signUp') : t('auth.signIn')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
