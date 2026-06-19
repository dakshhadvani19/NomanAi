import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({
  title,
  description,
  url = 'https://nomanai.vercel.app',
  keywords = '',
  ogImage = 'https://nomanai.vercel.app/og-image.png',
  schema = null,
}) {
  const defaultKeywords =
    'AI voice agents, Telugu AI voice agent, AI automation India, lead automation, revenue systems, WhatsApp automation, AI for real estate, AI for education, AI for FMCG, Telugu AI calling, automated lead follow-up, CRM integration, business automation Hyderabad, Noman ai';

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Noman ai" />
      <link rel="canonical" href={url} />

      {/* ── Open Graph ── */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Noman ai" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nomanai" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* ── Structured Data (JSON-LD) ── */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
