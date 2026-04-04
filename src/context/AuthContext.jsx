import React, { createContext, useState, useContext, useCallback } from 'react';

export const AuthContext = createContext();

const CORRECT_PASSWORD = 'mariam123';
const STORAGE_KEY = 'isAuthenticated';

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(STORAGE_KEY) === 'true'
  );


  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingRoute, setPendingRoute]     = useState(null);
  const [loginError, setLoginError]         = useState('');
  const [password, setPassword]             = useState('');
  const [email, setEmail]                   = useState('maryamessam22@gmail.com');


  const openModalWithRoute = (route) => {
    setPendingRoute(route);
    setShowLoginModal(true);
    setLoginError('');
  };


  const requireAuth = useCallback(() => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      setLoginError('');
      setPassword('');
      // setEmail('maryamessam22@gmail.com'); // 
      return false; 
    }
    return true; 
  }, [isAuthenticated]);

 
  const login = useCallback((pwd, em, isPreValidated = false) => {
    if (isPreValidated || pwd === CORRECT_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      setShowLoginModal(false);
      setLoginError('');
      setPassword('');
      return true;
    } else {
      setLoginError('Invalid password. Please try again.');
      return false;
    }
  }, []);

  
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);


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


export const useAuth = () => useContext(AuthContext);
