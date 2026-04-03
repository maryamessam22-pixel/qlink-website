import React, { createContext, useState, useContext, useCallback } from 'react';

export const AuthContext = createContext();

const CORRECT_PASSWORD = 'mariam123';
const STORAGE_KEY = 'isAuthenticated';

export const AuthProvider = ({ children }) => {
  // ── Persist auth state across page refreshes ──────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(STORAGE_KEY) === 'true'
  );

  // ── Login modal visibility + state ───────────────────────────────────────
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingRoute, setPendingRoute]     = useState(null);
  const [loginError, setLoginError]         = useState('');
  const [password, setPassword]             = useState('');
  const [email, setEmail]                   = useState('maryamessam22@gmail.com');

  // New helper to open modal with a "save for later" route
  const openModalWithRoute = (route) => {
    setPendingRoute(route);
    setShowLoginModal(true);
    setLoginError('');
  };

  // ── Open modal (called when unauthenticated user tries to navigate) ───────
  const requireAuth = useCallback(() => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      setLoginError('');
      setPassword('');
      // setEmail('maryamessam22@gmail.com'); // reset if desired
      return false; // blocked
    }
    return true; // allowed
  }, [isAuthenticated]);

  // ── Submit login ──────────────────────────────────────────────────────────
  const login = useCallback((pwd, em) => {
    if (pwd === CORRECT_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      setShowLoginModal(false);
      setLoginError('');
      setPassword('');
    } else {
      setLoginError('Invalid password. Please try again.');
    }
  }, []);

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);

  // ── Close modal without logging in ───────────────────────────────────────
  const closeModal = useCallback(() => {
    setShowLoginModal(false);
    setLoginError('');
    setPassword('');
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      showLoginModal,
      setShowLoginModal,
      pendingRoute,
      setPendingRoute,
      openModalWithRoute,
      loginError,
      password,
      setPassword,
      email,
      setEmail,
      requireAuth,
      login,
      logout,
      closeModal,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Convenience hook
export const useAuth = () => useContext(AuthContext);
