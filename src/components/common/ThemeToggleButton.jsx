import React, { useContext } from 'react';
import { Sun, Moon } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggleButton({ className }) {
  const { isLight, toggleTheme } = useTheme();
  const { t } = useContext(LanguageContext);

  return (
    <button
      type="button"
      className={className}
      onClick={toggleTheme}
      aria-label={isLight ? t('nav.switchToDark') : t('nav.switchToLight')}
    >
      {isLight ? (
        <Moon size={20} strokeWidth={2} aria-hidden />
      ) : (
        <Sun size={20} strokeWidth={2} aria-hidden />
      )}
    </button>
  );
}
