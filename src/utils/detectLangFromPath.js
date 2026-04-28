import { arToEn, enToAr } from '../routeMap';

const arabicPaths = Object.keys(arToEn).filter((path) => path !== '/');
const englishPaths = Object.keys(enToAr).filter((path) => path !== '/');

const normalizePath = (path) => {
  if (!path || path === '/') return '/';
  return path.endsWith('/') ? path.slice(0, -1) : path;
};

const safeDecodePath = (path) => {
  try {
    return decodeURIComponent(path);
  } catch {
    try {
      return decodeURI(path);
    } catch {
      return path;
    }
  }
};

export function detectLangFromPath(pathname, fallbackLang = 'en') {
  if (typeof window !== 'undefined') {
    try {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get('lang');
      if (langParam === 'ar' || langParam === 'en') {
        return langParam;
      }
    } catch {
    }
  }

  const rawPath = pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  const decodedPath = normalizePath(safeDecodePath(rawPath));

  if (decodedPath === '/') {
    return fallbackLang;
  }

  const isArabic = arabicPaths.some(
    (path) => decodedPath === path || decodedPath.startsWith(`${path}/`)
  );
  if (isArabic) return 'ar';

  const isEnglish = englishPaths.some(
    (path) => decodedPath === path || decodedPath.startsWith(`${path}/`)
  );
  if (isEnglish) return 'en';

  return fallbackLang;
}
