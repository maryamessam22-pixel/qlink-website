import React, { createContext, useState, useEffect } from 'react';


import en from '../locales/en';
import ar from '../locales/ar';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  // Set the direction and font based on language
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Add a class for global CSS overrides if needed
    if (lang === 'ar') {
      document.body.classList.add('rtl-active');
    } else {
      document.body.classList.remove('rtl-active');
    }
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prevLang => (prevLang === 'en' ? 'ar' : 'en'));
  };

  const t = (key) => {
    const dictionary = lang === 'ar' ? ar : en;
    const keys = key.split('.');
    
    let result = dictionary;
    for (let k of keys) {
      if (result[k] === undefined) return key; // fallback to key
      result = result[k];
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
