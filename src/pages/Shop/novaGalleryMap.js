export const NOVA_STRAP_GALLERY_INDEX = {
  black: { solid: 0, woven: 1 },
  grey: { solid: 2, woven: 3 },
  red: { solid: 4, woven: 5 },
  blue: { solid: 6, woven: 7 },
};

export const NOVA_LOCAL_BLACK_SOLID = `${process.env.PUBLIC_URL || ''}/images/nova/black-solid.png`;
export const NOVA_LOCAL_BLACK_WOVEN = `${process.env.PUBLIC_URL || ''}/images/nova/black-woven.png`;

export const parseProductGallery = (product) => {
  if (!product) return [];
  const images = product['gallery-images'] || product.gallery_images;
  if (!images) return [];
  try {
    return typeof images === 'string' ? JSON.parse(images) : images;
  } catch {
    return [];
  }
};

export const mergeNovaGallerySlots = (rawGallery) => {
  const out = Array.isArray(rawGallery)
    ? rawGallery.map((x) => (x == null ? '' : String(x)))
    : [];
  while (out.length < 8) out.push('');
  const g = out.slice(0, 8);
  if (!novaGallerySlotFilled(g[0])) g[0] = NOVA_LOCAL_BLACK_SOLID;
  if (!novaGallerySlotFilled(g[1])) g[1] = NOVA_LOCAL_BLACK_WOVEN;
  return g;
};

export const getMergedNovaGallery = (product) =>
  mergeNovaGallerySlots(parseProductGallery(product));

export const novaGallerySlotFilled = (v) => v != null && String(v).trim() !== '';

const firstPresentUrl = (galleryList) => {
  if (!galleryList?.length) return '';
  for (let i = 0; i < galleryList.length; i++) {
    if (novaGallerySlotFilled(galleryList[i])) return galleryList[i];
  }
  return '';
};

export const resolveNovaGalleryUrl = (galleryList, colorId, strap) => {
  if (!galleryList?.length) return '';
  const cfg = NOVA_STRAP_GALLERY_INDEX[colorId];
  if (!cfg) return firstPresentUrl(galleryList);
  const preferIdx = strap === 'woven' ? cfg.woven : cfg.solid;
  const fallbackIdx = strap === 'woven' ? cfg.solid : cfg.woven;
  if (novaGallerySlotFilled(galleryList[preferIdx])) return galleryList[preferIdx];
  if (novaGallerySlotFilled(galleryList[fallbackIdx])) return galleryList[fallbackIdx];
  return firstPresentUrl(galleryList);
};

export const inferNovaSelectionFromGalleryIndex = (idx) => {
  if (idx === 0 || idx === 1) return { color: 'black', strap: idx === 1 ? 'woven' : 'solid' };
  if (idx === 2 || idx === 3) return { color: 'grey', strap: idx === 3 ? 'woven' : 'solid' };
  if (idx === 4 || idx === 5) return { color: 'red', strap: idx === 5 ? 'woven' : 'solid' };
  if (idx === 6 || idx === 7) return { color: 'blue', strap: idx === 7 ? 'woven' : 'solid' };
  return null;
};

export const formatNovaCartColorName = (activeColor, colors, strapType, isAr) => {
  const base = colors.find((c) => c.id === activeColor)?.name || activeColor;
  const st =
    strapType === 'solid' ? (isAr ? 'ناعم' : 'Solid') : (isAr ? 'منسوج' : 'Woven');
  return `${base} (${st})`;
};
