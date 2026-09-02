import React from 'react';
import { SITE_CONFIG } from '../config/site';

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

/**
 * Reusable SEO Head component to render essential social meta tags.
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title = SITE_CONFIG.name,
  description = SITE_CONFIG.description,
  ogImage = SITE_CONFIG.ogImage,
  canonicalUrl = SITE_CONFIG.url,
}) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={SITE_CONFIG.author.name} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
};
