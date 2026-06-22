import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO component — renders per-page <head> tags via react-helmet-async.
 * Includes an extensive default keyword pool covering:
 *  - Brand name + typos: Outpera, Outpero, Outperra, OutperaAI, NomanAi
 *  - All primary service keywords: ai voice agent, ai automation, voice agent india …
 *  - Long-tail & typo-tolerant variants that users actually type
 */
export default function SEO({
  title,
  description,
  url = 'https://outperavercel.vercel.app',
  keywords = '',
  ogImage = 'https://outperavercel.vercel.app/og-image.png',
  schema = null,
}) {
  const defaultKeywords =
    // ── Brand + common misspellings ──
    'Outpera, Outpero, Outperra, Outpera AI, OutperaAi, NomanAi, Noman AI, ' +
    // ── Core services ──
    'ai voice agent india, ai voice agents india, ai voice agent, voice agent india, voice agents india, ' +
    'ai automation india, ai automation, ai automation agency india, ai automation company india, ' +
    'voice agent and ai automation, voice agent ai automation, ai and automation india, ' +
    // ── Telugu specific ──
    'Telugu AI voice agent, Telugu AI calling, Telugu voice agent, Telugu AI bot, Telugu AI call, ' +
    // ── Lead automation ──
    'automated lead follow-up india, lead automation india, lead calling AI, lead qualification AI, ' +
    'instant lead response AI, 3-second lead response, automated calling india, ' +
    // ── Industry ──
    'AI for real estate india, real estate AI calling, AI for education india, AI for FMCG india, ' +
    'AI for clinic india, AI for hospital india, ' +
    // ── Revenue & sales ──
    'AI revenue system india, revenue automation india, sales automation india, automated sales india, ' +
    // ── WhatsApp & CRM ──
    'WhatsApp automation india, WhatsApp business automation, WhatsApp CRM automation, ' +
    'CRM integration AI, automated CRM india, ' +
    // ── Location ──
    'business automation Hyderabad, AI agency Hyderabad, AI agency India, best AI agency India, ' +
    // ── Misc long-tail ──
    'inbound AI voice agent, outbound AI voice agent, AI phone calls india, AI chatbot india, ' +
    'appointment booking automation, follow-up automation, free automation audit india, ' +
    'Outpera';

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content="Outpera" />
      <link rel="canonical" href={url} />

      {/* ── Open Graph ── */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Outpera" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Outpera – AI Voice Agents & Revenue Systems for India" />
      <meta property="og:locale" content="en_IN" />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@outpera" />
      <meta name="twitter:creator" content="@outpera" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Outpera AI – Voice Agents & Revenue Systems" />

      {/* ── Structured Data (JSON-LD) ── */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
