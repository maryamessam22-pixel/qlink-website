import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { LanguageContext } from '../../context/LanguageContext';

export default function SEO({ title, description, slug, imageAlt }) {
  const { lang } = useContext(LanguageContext);
  const siteName = lang === 'ar' ? 'كيو لينك' : 'Q-Link';
  const url = `https://qlink.me/${slug || ''}`;
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  const defaultDesc = lang === 'ar' 
    ? "كيو لينك - سوار الطوارئ الذكي المتصل دائماً."
    : "Q-Link - The ultimate personal safety and health connectivity solution.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:site_name" content={siteName} />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
    </Helmet>
  );
}
