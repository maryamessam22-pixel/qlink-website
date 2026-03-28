import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import qlinkBg from '../../assets/images/qlink-bg.png';
import watchImg from '../../assets/images/watch.png';
import './AuthPage.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      // Show loading screen briefly, then trigger Splash
      const timer = setTimeout(() => {
        setIsLoading(false);
        setShowSplash(true);
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (showSplash) {
      // Let splash screen animation play before redirecting
      const timer = setTimeout(() => {
        navigate('/');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showSplash, navigate]);

  if (showSplash) {
    return (
      <div className="auth-container">
        <div className="dynamic-light"></div>
        <div className="dynamic-light-2"></div>
        <div className="dynamic-light-3"></div>
        <img src={qlinkBg} className="auth-bg-graphic" alt="Qlink pattern" />
        
        <div className="splash-screen">
          <div className="splash-watch-wrapper">
            <img src={watchImg} className="splash-watch" alt="Qlink Smartwatch" />
          </div>
          <Logo className="splash-logo" />
          <div className="splash-tagline">Your Safety Always On</div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="auth-container">
        <div className="dynamic-light"></div>
        <div className="dynamic-light-2"></div>
        <div className="dynamic-light-3"></div>
        <img src={qlinkBg} className="auth-bg-graphic" alt="Qlink pattern" />
        <div className="loader-screen">
          <Logo className="auth-loader-logo" />
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="dynamic-light"></div>
      <div className="dynamic-light-2"></div>
      <div className="dynamic-light-3"></div>
      <img src={qlinkBg} className="auth-bg-graphic" alt="Qlink pattern" />

      <div className="auth-content">
        <div className="screen" id={isLogin ? 'signin' : 'signup'}>
          <div className="auth-header">
            <Logo className="auth-logo" />
            <div className="tagline">Welcome back to your safety network</div>
          </div>

          <div className="card">
            <div className="tab-row">
              <button
                className={`tab-btn ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
                type="button"
              >
                Sign In
              </button>
              <button
                className={`tab-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
                type="button"
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="field">
                  <label>Full Name</label>
                  <div className="input-wrap">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input type="text" placeholder="John Doe" required />
                  </div>
                </div>
              )}
              
              <div className="field">
                <label>Email Address</label>
                <div className="input-wrap">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="4" width="20" height="16" rx="3"/><path d="m2 7 10 7 10-7"/>
                  </svg>
                  <input type="email" placeholder="name@example.com" required />
                </div>
              </div>

              <div className="field">
                <label>Password</label>
                <div className="input-wrap">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input type="password" placeholder="••••••••" required />
                </div>
              </div>

              {isLogin && (
                <div className="forgot-row">
                  <a href="#forgot">Forgot password?</a>
                </div>
              )}

              <button type="submit" className="btn-primary">
                {isLogin ? 'Sign In' : 'Sign Up'} <span className="btn-arrow">→</span>
              </button>
            </form>

            <div className="divider">
              <span>Or continue with</span>
            </div>

            <div className="social-row">
              <button type="button" className="btn-social">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button type="button" className="btn-social">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                GitHub
              </button>
            </div>
          </div>

          <div className="card-footer">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <a href="#" className="auth-link" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }}>
              {isLogin ? 'Sign up' : 'Sign in'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
