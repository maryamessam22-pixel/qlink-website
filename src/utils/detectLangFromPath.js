import { arToEn } from '../routeMap';

const arabicPaths = Object.keys(arToEn).filter((path) => path !== '/');

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
  const rawPath =
    pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  const normalizedRawPath = normalizePath(rawPath);
  const defaultLang = fallbackLang === 'ar' ? 'ar' : 'en';

  if (normalizedRawPath === '/') {
    return defaultLang;
  }

  const decodedPath = normalizePath(safeDecodePath(normalizedRawPath));

  const matchesArabicRoute = arabicPaths.some(
    (path) => decodedPath === path || decodedPath.startsWith(`${path}/`)
  );
  const isArabic = matchesArabicRoute;

  return isArabic ? 'ar' : 'en';
}
