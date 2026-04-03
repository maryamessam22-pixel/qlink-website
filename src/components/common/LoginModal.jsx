import React, { useCallback } from 'react';
import { X, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginModal.css';

function LoginModal() {
  const {
    showLoginModal,
    loginError,
    password,
    setPassword,
    email,
    setEmail,
    login,
    closeModal,
  } = useAuth();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    login(password, email);
  }, [login, password, email]);

  // Close on overlay click (not on modal click)
  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) closeModal();
  }, [closeModal]);

  // Close on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') closeModal();
  }, [closeModal]);

  if (!showLoginModal) return null;

  return (
    <div
      className="auth-overlay"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label="Login required"
    >
      <div className="auth-modal">

        {/* Close */}
        <button
          id="auth-modal-close-btn"
          className="auth-modal-close"
          onClick={closeModal}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="auth-modal-icon">
          <Lock size={24} />
        </div>

        {/* Heading */}
        <h2>Login Required</h2>
        <p className="auth-modal-notice">
          You must log in or create an account first to access this page.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="auth-modal-group">
            <label htmlFor="auth-email-input">Email</label>
            <input
              id="auth-email-input"
              type="email"
              className="auth-modal-input"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-modal-group">
            <label htmlFor="auth-password-input">Password</label>
            <input
              id="auth-password-input"
              type="password"
              className="auth-modal-input"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
          </div>

          {loginError && (
            <p className="auth-modal-error">{loginError}</p>
          )}

          <button
            id="auth-login-submit-btn"
            type="submit"
            className="btn btn-primary auth-modal-btn"
          >
            Log In
          </button>
        </form>

        <div className="auth-modal-divider">
          <span>or</span>
        </div>

        <p className="auth-modal-hint">
          Don't have an account?{' '}
          <Link to="/auth" onClick={closeModal}>
            Create one
          </Link>
        </p>

      </div>
    </div>
  );
}

export default LoginModal;
