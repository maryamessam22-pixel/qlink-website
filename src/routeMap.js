export const enToAr = {
  '/': '/',
  '/how-it-works/qlink': '/كيف-يعمل/كيو-لينك',
  '/how-it-works/emergency': '/كيف-يعمل/الطوارئ',
  '/shop/bracelet': '/تسوق/السوار',
  '/shop/compare': '/تسوق/مقارنة',
  '/shop/reviews': '/تسوق/التقييمات',
  '/for-caregivers': '/لمقدمي-الرعاية',
  '/about/our-story': '/عن/قصتنا',
  '/about/privacy': '/عن/الخصوصية',
  '/support/help-center': '/الدعم/مركز-المساعدة',
  '/support/faqs': '/الدعم/الأسئلة-الشائعة',
  '/support/contact': '/الدعم/اتصل-بنا',
  '/support/download': '/الدعم/تنزيل-التطبيق',
  '/cart': '/عربة-التسوق',
  '/checkout': '/الدفع',
  '/complete-purchase': '/اكتمال-الشراء',
};

export const arToEn = Object.fromEntries(
  Object.entries(enToAr).map(([en, ar]) => [ar, en])
);

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

export function switchLangPath(currentPath, targetLang) {
  const normalizedPath = normalizePath(currentPath);
  const decodedPath = normalizePath(safeDecodePath(normalizedPath));

  if (targetLang === 'ar') {
    return enToAr[decodedPath] ?? enToAr[normalizedPath] ?? decodedPath;
  } else {
    return arToEn[decodedPath] ?? arToEn[normalizedPath] ?? decodedPath;
  }
}
