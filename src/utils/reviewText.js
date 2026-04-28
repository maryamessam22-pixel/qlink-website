/**
 * Normalize review_body from DB: may include HTML wrappers or "--- email@" footer from submissions.
 */

const EMAIL_TAIL = /\s*[—–-]\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\s*$/;

/**
 * Removes common HTML wrappers (e.g. <p>...</p>) for plain-text display.
 */
export function stripHtml(html) {
  if (html == null) return '';
  let s = String(html);
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<\/(p|div|h[1-6])\s*>/gi, '\n\n');
  s = s.replace(/<li[^>]*>/gi, '• ');
  s = s.replace(/<\/li>/gi, '\n');
  s = s.replace(/<[^>]+>/g, '');
  s = s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  return s.replace(/\n{3,}/g, '\n\n').trim();
}

/** Plain body shown on listing cards / hero quote: strip markup and optional email appendix. */
export function publicReviewBody(text) {
  if (!text || typeof text !== 'string') return '';
  let t = stripHtml(text);
  const marker = '\n\n— ';
  const i = t.lastIndexOf(marker);
  if (i !== -1) {
    t = t.slice(0, i).trim();
  }
  t = t.replace(EMAIL_TAIL, '').trim();
  return t;
}

/** Normalize long-form CMS fields from `reviews` (may contain HTML fragments). */
export function normalizeStoryField(raw) {
  if (raw == null) return '';
  return stripHtml(raw);
}

function rawTitle(row, which) {
  if (!row) return null;
  if (which === 'en') return row.title_en ?? row['title _en'];
  return row.title_ar ?? row['title _ar'];
}

function rawDescription(row, which) {
  if (!row) return null;
  if (which === 'en') {
    return row.description_en ?? row['description _en'];
  }
  return row.description_ar ?? row['description _ar'];
}

export function pickReviewTitle(row, lang) {
  if (!row) return '';
  const preferred = lang === 'ar' ? rawTitle(row, 'ar') : rawTitle(row, 'en');
  const fallback = lang === 'ar' ? rawTitle(row, 'en') : rawTitle(row, 'ar');
  const pick = preferred != null && String(preferred).trim() !== ''
    ? preferred
    : fallback != null && String(fallback).trim() !== ''
      ? fallback
      : '';
  const cleaned = normalizeStoryField(pick);
  return cleaned;
}

export function pickReviewDescription(row, lang) {
  if (!row) return '';
  const preferred =
    lang === 'ar' ? rawDescription(row, 'ar') : rawDescription(row, 'en');
  const fallback =
    lang === 'ar' ? rawDescription(row, 'en') : rawDescription(row, 'ar');
  const pick =
    preferred != null && String(preferred).trim() !== ''
      ? preferred
      : fallback != null && String(fallback).trim() !== ''
        ? fallback
        : '';
  return normalizeStoryField(pick);
}

/**
 * When `lang === 'ar'`, use Arabic DB value when non-empty; otherwise English.
 */
export function pickLocalizedField(arVal, enVal, lang) {
  if (lang === 'ar') {
    if (arVal != null && String(arVal).trim() !== '') return String(arVal);
  }
  return enVal != null ? String(enVal) : '';
}

/** Short quote + subtitle fields for cards / detail hero. */
export function pickReviewSnippetRaw(row, lang) {
  if (!row) return '';
  return pickLocalizedField(row.review_text_ar, row.review_text, lang);
}

export function pickCustomerName(row, lang) {
  if (!row) return '';
  return pickLocalizedField(row.customer_name_ar, row.customer_name, lang);
}

export function pickCustomerSubtitle(row, lang) {
  if (!row) return '';
  return pickLocalizedField(
    row.customer_subtitle_ar,
    row.customer_subtitle,
    lang
  );
}

/** Split long review text into blocks (double newlines first, else single newlines). */
export function splitReviewParagraphs(text) {
  if (!text || !String(text).trim()) return [];
  const t = String(text).trim();
  const blocks = t.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  if (blocks.length > 1) return blocks;
  return t.split(/\n+/).map((p) => p.trim()).filter(Boolean);
}
