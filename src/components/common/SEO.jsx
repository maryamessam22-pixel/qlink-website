import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, slug, imageAlt }) {
  const siteName = "Q-Link";
  const url = `https://q-link.com/${slug || ''}`;
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || "Q-Link - The ultimate personal safety and health connectivity solution."} />
      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
    </Helmet>
  );
}
