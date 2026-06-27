import React from 'react';
import SEO from '../components/SEO';
import HeroPentagon from '../components/HeroPentagon';
import ProblemCards from '../components/ProblemCards';
import Systems from '../components/Systems';
import Process from '../components/Process';

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://outperavercel.vercel.app/#service',
  name: 'AI Voice Agents & Revenue Automation',
  alternateName: ['Outpero AI Service', 'NomanAi Services', 'AI Voice Agent India'],
  provider: {
    '@type': 'Organization',
    name: 'Outpera',
    alternateName: ['Outpero', 'Outperra', 'NomanAi'],
    url: 'https://outperavercel.vercel.app',
  },
  serviceType: ['AI Automation', 'AI Voice Agent', 'Revenue Automation', 'Lead Automation', 'WhatsApp Automation'],
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'State', name: 'Telangana' },
  ],
  description:
    'Outpera (also known as Outpero or NomanAi) deploys Telugu-first AI Voice Agents and fully automated Revenue Systems that call leads in seconds, handle objections, qualify intent and close deals — 24/7, without a human team.',
  offers: {
    '@type': 'Offer',
    price: '75000',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    seller: { '@type': 'Organization', name: 'Outpera' },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '38',
    bestRating: '5',
  },
};

export default function HomePage() {
  return (
    <main style={{ position: 'relative', zIndex: 10 }}>
      <SEO
        title="Outpera | #1 AI Voice Agents & Revenue Automation for Indian Businesses"
        description="Outpera (also searched as Outpero, Outperra, NomanAi) — Telugu-first AI Voice Agents that call leads in 3 seconds, qualify intent & close 24/7. Full revenue automation: WhatsApp, AI calls, CRM & more. Hyderabad, India."
        url="https://outperavercel.vercel.app/"
        keywords="Outpera, Outpero, Outperra, NomanAi, Noman AI, ai voice agent india, ai voice agents india, voice agent india, ai automation india, ai automation agency india, voice agent and ai automation, Telugu AI voice agent, Telugu AI calling, automated lead follow-up india, AI revenue system india, WhatsApp automation india, business automation Hyderabad, lead conversion AI, AI for real estate India, AI calling software, sales automation india, ai agency india, best ai agency india"
        schema={homeSchema}
      />
      <HeroPentagon />
      <ProblemCards />
      <Systems />
      <Process />
    </main>
  );
}
