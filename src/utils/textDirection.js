/**
 * Detect inline text direction so English copy inside an RTL page renders with correct punctuation.
 */
const ARABIC_SCRIPT =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\ufb50-\ufdff\ufe70-\ufefc]/;

export function getInlineTextDir(text) {
  if (text == null || text === '') return 'ltr';
  return ARABIC_SCRIPT.test(String(text)) ? 'rtl' : 'ltr';
}

export function getInlineLangAttr(text) {
  return getInlineTextDir(text) === 'rtl' ? 'ar' : 'en';
}
