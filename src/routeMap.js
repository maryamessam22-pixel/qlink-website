// Bidirectional route map: English path → Arabic path
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

// Reverse map: Arabic path → English path
export const arToEn = Object.fromEntries(
  Object.entries(enToAr).map(([en, ar]) => [ar, en])
);

/**
 * Given the current pathname and target language, return the equivalent path.
 */
export function switchLangPath(currentPath, targetLang) {
  if (targetLang === 'ar') {
    return enToAr[currentPath] ?? currentPath;
  } else {
    return arToEn[currentPath] ?? currentPath;
  }
}
