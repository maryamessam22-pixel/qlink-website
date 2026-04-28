import React, { useContext, useState } from 'react';
import { Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { switchLangPath } from '../../routeMap';
import './FloatingSidebar.css';

export default function FloatingSidebar() {
  const { lang, toggleLanguage } = useContext(LanguageContext);
  const { isLight, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLangSwitch = () => {
    const targetLang = lang === 'en' ? 'ar' : 'en';
    toggleLanguage();
    const newPath = switchLangPath(pathname, targetLang);
    if (newPath !== pathname) navigate(newPath);
  };

  return (
    <div className={`floating-sidebar ${open ? 'fsb-open' : 'fsb-closed'}`}>
      {/* Toggle tab — always visible */}
      <button className="fsb-tab" onClick={() => setOpen(o => !o)} aria-label="Toggle sidebar">
        {open
          ? <ChevronRight size={14} strokeWidth={2.5} />
          : <ChevronLeft size={14} strokeWidth={2.5} />
        }
      </button>

      {/* Buttons — slide in/out */}
      <div className="fsb-body">
        <button className="fsb-btn fsb-lang" onClick={handleLangSwitch} aria-label="Toggle language">
          {lang === 'en' ? 'AR' : 'EN'}
        </button>
        <button className="fsb-btn fsb-theme" onClick={toggleTheme} aria-label="Toggle theme">
          {isLight ? <Moon size={18} strokeWidth={2} /> : <Sun size={18} strokeWidth={2} />}
        </button>
      </div>
    </div>
  );
}
