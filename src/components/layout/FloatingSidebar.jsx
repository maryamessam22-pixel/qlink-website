import React, { useContext, useState } from 'react';
import { Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import './FloatingSidebar.css';

export default function FloatingSidebar() {
  const { lang, toggleLanguage } = useContext(LanguageContext);
  const { isLight, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

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
        <button className="fsb-btn fsb-lang" onClick={toggleLanguage} aria-label="Toggle language">
          {lang === 'en' ? 'AR' : 'EN'}
        </button>
        <button className="fsb-btn fsb-theme" onClick={toggleTheme} aria-label="Toggle theme">
          {isLight ? <Moon size={18} strokeWidth={2} /> : <Sun size={18} strokeWidth={2} />}
        </button>
      </div>
    </div>
  );
}
