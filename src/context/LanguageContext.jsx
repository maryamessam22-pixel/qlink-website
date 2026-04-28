import React, { createContext, useState, useEffect } from 'react';

import en from '../locales/en';
import ar from '../locales/ar';
import { detectLangFromPath } from '../utils/detectLangFromPath';

export const LanguageContext = createContext();
const LANG_STORAGE_KEY = 'appLang';

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => detectLangFromPath(undefined, 'en'));

  
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    if (lang === 'ar') {
      document.body.classList.add('rtl-active');
    } else {
      document.body.classList.remove('rtl-active');
    }

    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
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
      if (result[k] === undefined) return key; 
      result = result[k];
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
