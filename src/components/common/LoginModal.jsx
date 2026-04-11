import React, { useCallback, useContext } from 'react';
import { X, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import './LoginModal.css';

function LoginModal({ isOpen }) {
  const {
    showLoginModal,
    pendingRoute,
    setPendingRoute,
    loginError,
    password,
    setPassword,
    email,
    setEmail,
    login,
    closeModal,
  } = useAuth();

  const { lang, t } = useContext(LanguageContext);
  const isAr = lang === 'ar';

  const navigate = useNavigate();

  const isVisible = isOpen !== undefined ? isOpen : showLoginModal;

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const ok = login(password, email);
      if (ok && pendingRoute) {
        navigate(pendingRoute);
        setPendingRoute(null);
      }
    },
    [login, password, email, pendingRoute, navigate, setPendingRoute]
  );


  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) closeModal();
  }, [closeModal]);


  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') closeModal();
  }, [closeModal]);

  if (!isVisible) return null;

  return (
    <div
      className="auth-overlay"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label="Login required"
    >
      <div className={`auth-modal ${isAr ? 'rtl-active' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>

      
        <button
          id="auth-modal-close-btn"
          className="auth-modal-close"
          onClick={closeModal}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="auth-modal-icon">
          <Lock size={24} />
        </div>

      
        <h2>{t('auth.modalTitle')}</h2>
        <p className="auth-modal-notice">
          {t('auth.modalNotice')}
        </p>

    
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="auth-modal-group">
            <label htmlFor="auth-email-input">{t('auth.email')}</label>
            <input
              id="auth-email-input"
              type="email"
              className="auth-modal-input"
              placeholder={t('auth.emailPlaceholder')}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-modal-group">
            <label htmlFor="auth-password-input">{t('auth.password')}</label>
            <input
              id="auth-password-input"
              type="password"
              className="auth-modal-input"
              placeholder={t('auth.passwordPlaceholder')}
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
          </div>

          {loginError && (
            <p className="auth-modal-error">{t('auth.invalidPass')}</p>
          )}

          <button
            id="auth-login-submit-btn"
            type="submit"
            className="btn btn-primary auth-modal-btn"
          >
            {t('auth.login')}
          </button>
        </form>

        <div className="auth-modal-divider">
          <span>{isAr ? 'أو' : 'or'}</span>
        </div>

        <p className="auth-modal-hint">
          {t('auth.modalHint')}{' '}
          <Link to="/auth" state={{ mode: 'signup' }} onClick={closeModal}>
            {t('auth.modalCreate')}
          </Link>
        </p>

      </div>
    </div>
  );
}

export default LoginModal;
