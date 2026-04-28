import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

const STORAGE_KEY = 'qlink-theme';

const ThemeContext = createContext(null);

function readInitialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch (_) {
  }
  return 'dark';
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readInitialTheme);

  const setTheme = useCallback((next) => {
    if (next !== 'light' && next !== 'dark') return;
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (_) {
      }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (_) {
          }
      return next;
    });
  }, []);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme =
      theme === 'light' ? 'light' : 'dark';
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      isLight: theme === 'light',
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
