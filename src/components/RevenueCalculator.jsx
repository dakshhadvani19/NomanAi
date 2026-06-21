import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator, ChevronDown, Search, Check, X, Plus, Trash2,
  Download, ArrowRight, Info, Phone, MessageSquare, Mail,
  FileSpreadsheet, Calendar, CreditCard, Database, Zap,
  Globe, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── CONSTANTS ─── */
const VOICE_COSTS = {
  llm:        { label: 'LLM – Gemini 2.5 Flash',          usd: 0.0011 },
  stt:        { label: 'STT – Deepgram Nova-3',            usd: 0.0043 },
  tts_std:    { label: 'TTS – Google Cloud (Standard)',    usd: 0.016  },
  tts_prem:   { label: 'TTS – ElevenLabs Flash (Premium)', usd: 0.05   },
  twilio_out: { label: 'Telephony – Twilio Outbound',      usd: 0.0085 },
  twilio_in:  { label: 'Telephony – Twilio Inbound',       usd: 0.0045 },
  phone_flat: { label: 'Phone Number Rental (Twilio)',      usd: 2.0,  flat: true },
};

const BUSINESS_DURATIONS = {
  'Real Estate': 4.5, 'Clinic': 3.5, 'Coaching': 5.0,
  'D2C': 2.5, 'Legal': 5.5, 'SaaS': 4.0, 'E-commerce': 2.0, 'Other': 3.0,
};
const BUSINESS_TYPES = Object.keys(BUSINESS_DURATIONS);

const AUTOMATION_OPTIONS = [
  { id: 'whatsapp', label: 'WhatsApp Follow-up',        icon: MessageSquare,   usdPerMonth: 36,    note: 'Meta API + BSP (WATI/AiSensy)' },
  { id: 'email',    label: 'Email Automation',           icon: Mail,            usdPerMonth: 15,    note: 'SendGrid / Mailchimp integration' },
  { id: 'sheets',   label: 'Google Sheets / CRM Log',    icon: FileSpreadsheet, usdPerMonth: 10.59, note: 'Make.com Core plan' },
  { id: 'sms',      label: 'SMS Notifications',           icon: MessageSquare,   usdPerMonth: 6,     note: 'Twilio SMS India ~₹0.10/SMS, est. 500/mo' },
  { id: 'calendar', label: 'Calendar Booking',            icon: Calendar,        usdPerMonth: 12,    note: 'Calendly / Cal.com API' },
  { id: 'crm',      label: 'Full CRM Pipeline',           icon: Database,        usdPerMonth: 18.82, note: 'Make.com Pro + HubSpot/Zoho' },
  { id: 'payment',  label: 'Payment Collection Links',    icon: CreditCard,      usdPerMonth: 0,     note: 'Razorpay – 2% per txn, no monthly fee' },
  { id: 'n8n',      label: 'n8n Cloud Automation',        icon: Zap,             usdPerMonth: 20,    note: 'n8n Starter – unlimited workflows' },
];

const KNOWN_AUTOMATIONS = [
  { name: 'Salesforce CRM', usdPerMonth: 25 },
  { name: 'HubSpot Starter', usdPerMonth: 20 },
  { name: 'Zoho CRM', usdPerMonth: 14 },
  { name: 'Intercom', usdPerMonth: 39 },
  { name: 'Slack Notifications', usdPerMonth: 8 },
  { name: 'Notion Sync', usdPerMonth: 10 },
  { name: 'Airtable Base', usdPerMonth: 20 },
  { name: 'Pabbly Connect', usdPerMonth: 19 },
  { name: 'Zapier Automation', usdPerMonth: 20 },
  { name: 'Make.com Teams', usdPerMonth: 34 },
  { name: 'Google Calendar Sync', usdPerMonth: 0 },
  { name: 'Stripe Payments', usdPerMonth: 0 },
  { name: 'Razorpay (2% per txn)', usdPerMonth: 0 },
  { name: 'Freshdesk Helpdesk', usdPerMonth: 15 },
  { name: 'Pipedrive CRM', usdPerMonth: 14.9 },
  { name: 'Monday.com', usdPerMonth: 24 },
  { name: 'ClickUp', usdPerMonth: 12 },
  { name: 'Typeform Lead Forms', usdPerMonth: 29 },
  { name: 'Twilio SMS Bulk', usdPerMonth: 15 },
  { name: 'SendGrid Email', usdPerMonth: 20 },
];

const CURRENCIES = [
  { code: 'INR', name: 'Indian Rupee',        country: 'India',           flag: '🇮🇳', sym: '₹',   rate: 83.5  },
  { code: 'USD', name: 'US Dollar',            country: 'United States',   flag: '🇺🇸', sym: '$',   rate: 1.0   },
  { code: 'EUR', name: 'Euro',                 country: 'European Union',  flag: '🇪🇺', sym: '€',   rate: 0.92  },
  { code: 'GBP', name: 'British Pound',        country: 'United Kingdom',  flag: '🇬🇧', sym: '£',   rate: 0.79  },
  { code: 'AED', name: 'UAE Dirham',           country: 'UAE',             flag: '🇦🇪', sym: 'د.إ', rate: 3.67  },
  { code: 'SGD', name: 'Singapore Dollar',     country: 'Singapore',       flag: '🇸🇬', sym: 'S$',  rate: 1.35  },
  { code: 'AUD', name: 'Australian Dollar',    country: 'Australia',       flag: '🇦🇺', sym: 'A$',  rate: 1.53  },
  { code: 'CAD', name: 'Canadian Dollar',      country: 'Canada',          flag: '🇨🇦', sym: 'C$',  rate: 1.36  },
  { code: 'JPY', name: 'Japanese Yen',         country: 'Japan',           flag: '🇯🇵', sym: '¥',   rate: 149.5 },
  { code: 'CNY', name: 'Chinese Yuan',         country: 'China',           flag: '🇨🇳', sym: '¥',   rate: 7.24  },
  { code: 'BRL', name: 'Brazilian Real',       country: 'Brazil',          flag: '🇧🇷', sym: 'R$',  rate: 4.97  },
  { code: 'ZAR', name: 'South African Rand',   country: 'South Africa',    flag: '🇿🇦', sym: 'R',   rate: 18.63 },
  { code: 'MYR', name: 'Malaysian Ringgit',    country: 'Malaysia',        flag: '🇲🇾', sym: 'RM',  rate: 4.71  },
  { code: 'IDR', name: 'Indonesian Rupiah',    country: 'Indonesia',       flag: '🇮🇩', sym: 'Rp',  rate: 15875 },
  { code: 'THB', name: 'Thai Baht',            country: 'Thailand',        flag: '🇹🇭', sym: '฿',   rate: 35.1  },
  { code: 'PHP', name: 'Philippine Peso',      country: 'Philippines',     flag: '🇵🇭', sym: '₱',   rate: 56.5  },
  { code: 'SAR', name: 'Saudi Riyal',          country: 'Saudi Arabia',    flag: '🇸🇦', sym: 'SAR', rate: 3.75  },
  { code: 'KWD', name: 'Kuwaiti Dinar',        country: 'Kuwait',          flag: '🇰🇼', sym: 'KD',  rate: 0.31  },
  { code: 'QAR', name: 'Qatari Riyal',         country: 'Qatar',           flag: '🇶🇦', sym: 'QR',  rate: 3.64  },
  { code: 'NGN', name: 'Nigerian Naira',       country: 'Nigeria',         flag: '🇳🇬', sym: '₦',   rate: 1550  },
  { code: 'PKR', name: 'Pakistani Rupee',      country: 'Pakistan',        flag: '🇵🇰', sym: '₨',   rate: 278   },
  { code: 'BDT', name: 'Bangladeshi Taka',     country: 'Bangladesh',      flag: '🇧🇩', sym: '৳',   rate: 110   },
  { code: 'LKR', name: 'Sri Lankan Rupee',     country: 'Sri Lanka',       flag: '🇱🇰', sym: '₨',   rate: 320   },
  { code: 'NPR', name: 'Nepali Rupee',         country: 'Nepal',           flag: '🇳🇵', sym: '₨',   rate: 133   },
  { code: 'CHF', name: 'Swiss Franc',          country: 'Switzerland',     flag: '🇨🇭', sym: 'CHF', rate: 0.90  },
  { code: 'SEK', name: 'Swedish Krona',        country: 'Sweden',          flag: '🇸🇪', sym: 'kr',  rate: 10.4  },
  { code: 'NOK', name: 'Norwegian Krone',      country: 'Norway',          flag: '🇳🇴', sym: 'kr',  rate: 10.6  },
  { code: 'MXN', name: 'Mexican Peso',         country: 'Mexico',          flag: '🇲🇽', sym: '$',   rate: 17.2  },
  { code: 'NZD', name: 'New Zealand Dollar',   country: 'New Zealand',     flag: '🇳🇿', sym: 'NZ$', rate: 1.63  },
  { code: 'KES', name: 'Kenyan Shilling',      country: 'Kenya',           flag: '🇰🇪', sym: 'KSh', rate: 129   },
];

/* ─── HELPERS ─── */
function useFmt(currCode) {
  const curr = CURRENCIES.find(c => c.code === currCode) || CURRENCIES[0];
  return (usd) => {
    const val = usd * curr.rate;
    const isLarge = ['IDR', 'NGN', 'INR', 'JPY', 'PKR'].includes(curr.code);
    const decimals = isLarge ? 0 : val < 10 ? 2 : (val < 1000 ? 1 : 0);
    return `${curr.sym}${val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${!['₹','$','€','£','¥','₦','₱','฿','R$','৳'].includes(curr.sym) ? ` ${curr.code}` : ''}`;
  };
}

/* ─── CURRENCY DROPDOWN ─── */
function CurrencyDropdown({ selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);
  const curr = CURRENCIES.find(c => c.code === selected) || CURRENCIES[0];

  const filtered = CURRENCIES.filter(c =>
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.country.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);

  return (
    <div style={{ position: 'relative', zIndex: 200 }}>
      {open && <div style={{ position: 'fixed', inset: 0, zIndex: 199 }} onClick={() => { setOpen(false); setSearch(''); }} />}
      <motion.div
        onClick={() => setOpen(!open)}
        whileHover={{ borderColor: 'rgba(6,182,212,0.5)', background: 'rgba(6,182,212,0.1)' }}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: open ? 'rgba(6,182,212,0.12)' : 'rgba(6,182,212,0.06)',
          border: `1px solid ${open ? 'rgba(6,182,212,0.6)' : 'rgba(6,182,212,0.2)'}`,
          borderRadius: '10px', padding: '8px 14px', cursor: 'pointer',
          minWidth: '140px', userSelect: 'none', transition: 'all 0.15s',
        }}
      >
        <Globe size={14} color="rgba(6,182,212,0.7)" />
        <span style={{ fontSize: '0.9rem' }}>{curr.flag}</span>
        <span style={{ fontWeight: 700, color: '#22d3ee', fontSize: '0.88rem' }}>{curr.code}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          <ChevronDown size={13} color="rgba(255,255,255,0.4)" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.14 }}
            style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0, minWidth: '270px',
              background: '#080f1f', border: '1px solid rgba(6,182,212,0.25)',
              borderRadius: '16px', padding: '10px', zIndex: 200,
              boxShadow: '0 25px 60px -10px rgba(0,0,0,0.9), 0 0 30px rgba(6,182,212,0.08)',
              maxHeight: '340px', display: 'flex', flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '8px 12px', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Search size={13} color="rgba(255,255,255,0.35)" />
              <input
                ref={inputRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search currency or country..."
                style={{ background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: '0.82rem', width: '100%', fontFamily: 'inherit' }}
              />
              {search && <X size={12} color="rgba(255,255,255,0.35)" style={{ cursor: 'pointer' }} onClick={() => setSearch('')} />}
            </div>
            <div style={{ overflowY: 'auto', flex: 1, scrollbarWidth: 'thin', scrollbarColor: 'rgba(6,182,212,0.3) transparent' }}>
              {filtered.length === 0
                ? <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem', textAlign: 'center', padding: '16px' }}>No results</div>
                : filtered.map(c => (
                  <div
                    key={c.code}
                    onClick={() => { onSelect(c.code); setOpen(false); setSearch(''); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', borderRadius: '9px', cursor: 'pointer', background: c.code === selected ? 'rgba(6,182,212,0.12)' : 'transparent', transition: 'background 0.08s' }}
                    onMouseEnter={e => { if (c.code !== selected) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = c.code === selected ? 'rgba(6,182,212,0.12)' : 'transparent'; }}
                  >
                    <span style={{ fontSize: '1.05rem', width: '22px', textAlign: 'center' }}>{c.flag}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: c.code === selected ? '#22d3ee' : '#e2e8f0', fontSize: '0.82rem' }}>{c.code} <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.5)' }}>– {c.name}</span></div>
                      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>{c.country}</div>
                    </div>
                    {c.code === selected && <Check size={13} color="#22d3ee" />}
                  </div>
                ))
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── SMOOTH SLIDER ─── */
function SmoothSlider({ min, max, step = 1, value, onChange, label, format }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</span>
        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#22d3ee' }}>{format ? format(value) : value}</span>
      </div>
      <div style={{ position: 'relative', height: '40px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, height: '5px', borderRadius: '999px', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', left: 0, width: `${pct}%`, height: '5px', borderRadius: '999px', background: 'linear-gradient(90deg, #0ea5e9, #6366f1)' }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ position: 'absolute', left: 0, right: 0, width: '100%', height: '40px', opacity: 0, cursor: 'pointer', margin: 0, zIndex: 2 }}
        />
        <div style={{
          position: 'absolute', left: `calc(${pct}% - 11px)`, pointerEvents: 'none',
          width: '22px', height: '22px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
          boxShadow: '0 0 14px rgba(6,182,212,0.8)', border: '2.5px solid #090e1c',
          zIndex: 1,
        }} />
      </div>
    </div>
  );
}

/* ─── CUSTOM AUTOMATION ADDER ─── */
function CustomAutomationAdder({ onAdd }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSug, setShowSug] = useState(false);

  useEffect(() => {
    if (!query.trim()) { setSuggestions([]); setShowSug(false); return; }
    const f = KNOWN_AUTOMATIONS.filter(a => a.name.toLowerCase().includes(query.toLowerCase())).slice(0, 7);
    setSuggestions(f); setShowSug(f.length > 0);
  }, [query]);

  const handleAdd = (name, usdPerMonth) => {
    onAdd({ id: `custom-${Date.now()}`, label: name, usdPerMonth });
    setQuery(''); setShowSug(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      {showSug && <div style={{ position: 'fixed', inset: 0, zIndex: 9 }} onClick={() => setShowSug(false)} />}
      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '0 12px' }}>
          <Search size={13} color="rgba(255,255,255,0.3)" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && query.trim()) handleAdd(query.trim(), 0); }}
            placeholder="Search any automation..."
            style={{ background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: '0.85rem', padding: '10px 0', width: '100%', fontFamily: 'inherit' }}
          />
        </div>
        <motion.button
          onClick={() => { if (query.trim()) handleAdd(query.trim(), 0); }}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          style={{ padding: '10px 16px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '10px', color: '#22d3ee', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'inherit', whiteSpace: 'nowrap' }}
        >
          <Plus size={14} /> Add
        </motion.button>
      </div>
      <AnimatePresence>
        {showSug && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.1 }}
            style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, background: '#080f1f', border: '1px solid rgba(6,182,212,0.2)', borderRadius: '12px', padding: '6px', zIndex: 10, boxShadow: '0 16px 40px rgba(0,0,0,0.7)' }}
          >
            {suggestions.map(s => (
              <div
                key={s.name}
                onClick={() => handleAdd(s.name, s.usdPerMonth)}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(6,182,212,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.08s' }}
              >
                <span style={{ color: '#e2e8f0', fontSize: '0.87rem' }}>{s.name}</span>
                <span style={{ color: '#22d3ee', fontWeight: 700, fontSize: '0.78rem', marginLeft: '12px', flexShrink: 0 }}>
                  {s.usdPerMonth === 0 ? 'Free / % based' : `$${s.usdPerMonth}/mo`}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── ANIMATED NUMBER ─── */
function AnimNum({ value }) {
  const [disp, setDisp] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const start = prev.current; const end = value;
    const dur = 350; const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - t, 3);
      setDisp(start + (end - start) * e);
      if (t < 1) requestAnimationFrame(tick); else prev.current = end;
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <>{disp}</>;
}

/* ─── MAIN EXPORT ─── */
export default function RevenueCalculator() {
  const [bizType, setBizType] = useState('Real Estate');
  const [calls, setCalls] = useState(300);
  const [dur, setDur] = useState(BUSINESS_DURATIONS['Real Estate']);
  const [callDir, setCallDir] = useState('outbound');
  const [ttsQ, setTtsQ] = useState('prem');
  const [addons, setAddons] = useState(['whatsapp', 'sheets']);
  const [customAddons, setCustomAddons] = useState([]);
  const [currency, setCurrency] = useState('INR');
  const [bizOpen, setBizOpen] = useState(false);

  useEffect(() => { setDur(BUSINESS_DURATIONS[bizType] || 3); }, [bizType]);

  const fmt = useFmt(currency);
  const curr = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];

  // Calculations
  const mins = calls * dur;
  const ttsKey = ttsQ === 'std' ? 'tts_std' : 'tts_prem';
  const telKey = callDir === 'outbound' ? 'twilio_out' : 'twilio_in';
  const perMin = VOICE_COSTS.llm.usd + VOICE_COSTS.stt.usd + VOICE_COSTS[ttsKey].usd + VOICE_COSTS[telKey].usd;
  const voiceVar = perMin * mins;
  const flat = VOICE_COSTS.phone_flat.usd;
  const voiceTotal = voiceVar + flat;
  const addonTotal = AUTOMATION_OPTIONS.filter(a => addons.includes(a.id)).reduce((s, a) => s + a.usdPerMonth, 0)
    + customAddons.reduce((s, a) => s + (a.usdPerMonth || 0), 0);
  const grandTotal = voiceTotal + addonTotal;
  const perCall = calls > 0 ? grandTotal / calls : 0;

  const toggleAddon = id => setAddons(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const fmtDisp = (usd) => {
    const val = usd * curr.rate;
    const big = ['IDR','NGN','INR','JPY','PKR','BDT','LKR','NPR'].includes(curr.code);
    return `${curr.sym}${val.toLocaleString(undefined, { maximumFractionDigits: big ? 0 : val < 10 ? 2 : 1 })}`;
  };

  /* PDF */
  const downloadPDF = useCallback(async () => {
    try {
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const W = 210; const pad = 18; const cW = W - pad * 2;

      // BG
      doc.setFillColor(8, 15, 31); doc.rect(0, 0, W, 297, 'F');
      doc.setFillColor(6, 182, 212); doc.rect(0, 0, W, 1.5, 'F');

      // Header
      doc.setFont('helvetica', 'bold'); doc.setFontSize(22); doc.setTextColor(34, 211, 238);
      doc.text('NOMAN AI', pad, 22);
      doc.setFontSize(8); doc.setTextColor(100, 130, 160); doc.setFont('helvetica', 'normal');
      doc.text('AI Voice Agents & Revenue Systems  ·  nomanaivercel.vercel.app', pad, 28);

      doc.setFont('helvetica', 'bold'); doc.setFontSize(15); doc.setTextColor(255, 255, 255);
      doc.text('Cost Estimate Quotation', W / 2, 20, { align: 'center' });
      doc.setFontSize(8); doc.setTextColor(120, 140, 160); doc.setFont('helvetica', 'normal');
      doc.text(`Generated: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}`, W / 2, 27, { align: 'center' });

      doc.setDrawColor(6, 182, 212, 0.4); doc.setLineWidth(0.25); doc.line(pad, 33, W - pad, 33);

      let y = 40;
      // Config box
      doc.setFillColor(15, 23, 42); doc.roundedRect(pad, y, cW, 25, 3, 3, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5); doc.setTextColor(34, 211, 238);
      doc.text('CONFIGURATION', pad + 6, y + 7);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(190, 210, 225);
      const cfg = [`Business: ${bizType}`, `Calls/Month: ${calls.toLocaleString()}`, `Avg Duration: ${dur} min`,
        `Call Type: ${callDir}`, `Voice: ${ttsQ === 'prem' ? 'ElevenLabs Premium' : 'Google Standard'}`, `Total Minutes: ${mins.toLocaleString()}`];
      cfg.forEach((c, i) => doc.text(c, pad + 6 + (i % 3) * (cW / 3), y + 14 + Math.floor(i / 3) * 8));
      y += 32;

      const sec = (t) => {
        doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(34, 211, 238);
        doc.text(t, pad, y); y += 5;
        doc.setDrawColor(34, 211, 238); doc.setLineWidth(0.15); doc.line(pad, y, W - pad, y); y += 5;
      };
      const row = (l, v, bold = false) => {
        doc.setFont('helvetica', bold ? 'bold' : 'normal'); doc.setFontSize(8.5);
        doc.setTextColor(bold ? 220 : 175, bold ? 230 : 195, bold ? 240 : 215);
        doc.text(l, pad + 4, y);
        doc.setTextColor(bold ? 34 : 140, bold ? 211 : 190, bold ? 238 : 215);
        doc.text(v, W - pad - 4, y, { align: 'right' }); y += 7;
      };

      sec('📞 AI Voice Agent Stack');
      row(`LLM – Gemini 2.5 Flash  ($${VOICE_COSTS.llm.usd}/min × ${mins.toLocaleString()} min)`, fmt(VOICE_COSTS.llm.usd * mins));
      row(`STT – Deepgram Nova-3  ($${VOICE_COSTS.stt.usd}/min × ${mins.toLocaleString()} min)`, fmt(VOICE_COSTS.stt.usd * mins));
      row(`TTS – ${ttsQ === 'prem' ? 'ElevenLabs Flash' : 'Google Cloud'}  ($${VOICE_COSTS[ttsKey].usd}/min × ${mins.toLocaleString()} min)`, fmt(VOICE_COSTS[ttsKey].usd * mins));
      row(`Telephony – Twilio ${callDir}  ($${VOICE_COSTS[telKey].usd}/min × ${mins.toLocaleString()} min)`, fmt(VOICE_COSTS[telKey].usd * mins));
      row('Phone Number Rental (flat)', fmt(flat));
      doc.setDrawColor(50, 70, 100); doc.setLineWidth(0.1); doc.line(pad, y, W - pad, y); y += 4;
      row('Voice Subtotal', fmt(voiceTotal), true); y += 3;

      if (addonTotal > 0) {
        sec('🤖 Automation Add-ons');
        AUTOMATION_OPTIONS.filter(a => addons.includes(a.id)).forEach(a => row(a.label, a.usdPerMonth === 0 ? '% per txn' : fmt(a.usdPerMonth)));
        customAddons.forEach(a => row(`${a.label} (Custom)`, a.usdPerMonth === 0 ? 'Variable' : fmt(a.usdPerMonth)));
        doc.setDrawColor(50, 70, 100); doc.setLineWidth(0.1); doc.line(pad, y, W - pad, y); y += 4;
        row('Automation Subtotal', fmt(addonTotal), true); y += 3;
      }

      // Total box
      doc.setFillColor(6, 182, 212, 0.1); doc.roundedRect(pad, y, cW, 18, 3, 3, 'F');
      doc.setDrawColor(6, 182, 212); doc.setLineWidth(0.4); doc.roundedRect(pad, y, cW, 18, 3, 3, 'S');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(255, 255, 255);
      doc.text('TOTAL MONTHLY INFRASTRUCTURE COST', pad + 7, y + 11);
      doc.setTextColor(34, 211, 238); doc.setFontSize(13);
      doc.text(fmt(grandTotal), W - pad - 7, y + 11, { align: 'right' });
      y += 25;

      doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(100, 130, 160);
      doc.text(`Cost per call: ${fmt(perCall)}  ·  Cost per minute: ${fmt(perMin)}  ·  Total minutes: ${mins.toLocaleString()}`, pad, y); y += 14;

      // Disclaimer
      doc.setFillColor(99, 102, 241, 0.07); doc.roundedRect(pad, y, cW, 24, 2, 2, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.setTextColor(160, 140, 240);
      doc.text('IMPORTANT DISCLAIMER — PLEASE READ', pad + 6, y + 7);
      doc.setFont('helvetica', 'normal'); doc.setTextColor(145, 140, 200);
      doc.text('This estimate reflects raw infrastructure & API costs only. It does NOT include any Noman ai setup fees,\nagency margin, or ongoing management charges. Actual costs may vary based on real usage.', pad + 6, y + 13, { maxWidth: cW - 12 });
      y += 30;

      doc.setDrawColor(30, 50, 80); doc.setLineWidth(0.2); doc.line(pad, 280, W - pad, 280);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5); doc.setTextColor(60, 80, 110);
      doc.text('nomanaivercel.vercel.app  ·  Noman ai — AI Voice Agents & Revenue Systems  ·  Confidential Cost Estimate', pad, 286);
      doc.text('1 / 1', W - pad, 286, { align: 'right' });

      doc.save(`NomanAI-Estimate-${bizType.replace(/ /g, '')}-${calls}calls.pdf`);
    } catch (e) {
      console.error(e);
      alert('PDF export failed. Please try again.');
    }
  }, [bizType, calls, dur, callDir, ttsQ, addons, customAddons, currency, fmt, grandTotal, voiceTotal, addonTotal, mins, perMin, perCall, flat, ttsKey, telKey]);

  /* ─── RENDER ─── */
  return (
    <section style={{ padding: '6rem 1.5rem 5rem', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '999px', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.22)', color: '#22d3ee', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            <Calculator size={12} /> Real-World AI Cost Calculator
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '1rem', lineHeight: 1.1 }}>
            Know Your Exact{' '}
            <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Monthly Infra Cost</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75 }}>
            Every number below uses verified, live API pricing. Adjust your inputs and watch the cost update instantly.
          </p>
        </motion.div>

        {/* 3-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(295px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>

          {/* ── COL 1: INPUTS ── */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '1.75rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#22d3ee', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Step 1 — Configure</p>

            {/* Business type */}
            <div style={{ marginBottom: '1.4rem' }}>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>Business Type</p>
              <div style={{ position: 'relative' }}>
                {bizOpen && <div style={{ position: 'fixed', inset: 0, zIndex: 49 }} onClick={() => setBizOpen(false)} />}
                <div onClick={() => setBizOpen(!bizOpen)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 14px', borderRadius: '10px', border: `1px solid ${bizOpen ? 'rgba(6,182,212,0.5)' : 'rgba(255,255,255,0.08)'}`, background: bizOpen ? 'rgba(6,182,212,0.07)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'all 0.15s' }}>
                  <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.9rem' }}>{bizType}</span>
                  <motion.div animate={{ rotate: bizOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transformOrigin: 'center' }}>
                    <ChevronDown size={15} color="rgba(255,255,255,0.35)" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {bizOpen && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.13 }}
                      style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, background: '#080f1f', border: '1px solid rgba(6,182,212,0.22)', borderRadius: '12px', padding: '6px', zIndex: 50, boxShadow: '0 16px 40px rgba(0,0,0,0.8)' }}>
                      {BUSINESS_TYPES.map(t => (
                        <div key={t} onClick={() => { setBizType(t); setBizOpen(false); }}
                          onMouseEnter={e => { if (t !== bizType) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = t === bizType ? 'rgba(6,182,212,0.1)' : 'transparent'; }}
                          style={{ padding: '9px 14px', borderRadius: '8px', cursor: 'pointer', color: t === bizType ? '#22d3ee' : '#e2e8f0', fontWeight: t === bizType ? 700 : 400, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: t === bizType ? 'rgba(6,182,212,0.1)' : 'transparent', transition: 'background 0.08s', fontSize: '0.88rem' }}>
                          {t}
                          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>{BUSINESS_DURATIONS[t]} min avg</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div style={{ marginBottom: '1.4rem' }}>
              <SmoothSlider min={50} max={5000} step={50} value={calls} onChange={setCalls} label="Calls per Month" format={v => v.toLocaleString()} />
            </div>
            <div style={{ marginBottom: '1.4rem' }}>
              <SmoothSlider min={1} max={10} step={0.5} value={dur} onChange={setDur} label="Avg Call Duration" format={v => `${v} min`} />
            </div>

            {/* Call direction */}
            <div style={{ marginBottom: '1.4rem' }}>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>Call Direction</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[['outbound', 'Outbound', 'Agent calls leads', `$${VOICE_COSTS.twilio_out.usd}/min`],
                  ['inbound',  'Inbound',  'Leads call you',   `$${VOICE_COSTS.twilio_in.usd}/min (cheaper)`]].map(([val, label, desc, cost]) => (
                  <div key={val} onClick={() => setCallDir(val)}
                    style={{ padding: '10px 12px', borderRadius: '10px', border: `1px solid ${callDir === val ? 'rgba(6,182,212,0.45)' : 'rgba(255,255,255,0.07)'}`, background: callDir === val ? 'rgba(6,182,212,0.08)' : 'rgba(255,255,255,0.01)', cursor: 'pointer', transition: 'all 0.15s' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.83rem', color: callDir === val ? '#22d3ee' : '#c9d4e0' }}>{label}</div>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>{desc}</div>
                    <div style={{ fontSize: '0.68rem', color: callDir === val ? 'rgba(6,182,212,0.7)' : 'rgba(255,255,255,0.2)', marginTop: '2px', fontWeight: 600 }}>{cost}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* TTS quality */}
            <div>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>Voice Quality</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[['std', 'Standard', 'Google TTS', `$${VOICE_COSTS.tts_std.usd}/min`, '~₹1.3/min'],
                  ['prem','Premium',  'ElevenLabs', `$${VOICE_COSTS.tts_prem.usd}/min`, '~₹4.2/min – Best quality']].map(([val, label, prov, cost, note]) => (
                  <div key={val} onClick={() => setTtsQ(val)}
                    style={{ padding: '10px 12px', borderRadius: '10px', border: `1px solid ${ttsQ === val ? 'rgba(99,102,241,0.45)' : 'rgba(255,255,255,0.07)'}`, background: ttsQ === val ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.01)', cursor: 'pointer', transition: 'all 0.15s' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.83rem', color: ttsQ === val ? '#a78bfa' : '#c9d4e0' }}>{label}</div>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>{prov}</div>
                    <div style={{ fontSize: '0.68rem', color: ttsQ === val ? 'rgba(167,139,250,0.8)' : 'rgba(255,255,255,0.2)', marginTop: '2px', fontWeight: 600 }}>{note}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── COL 2: ADD-ONS ── */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '1.75rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#22d3ee', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Step 2 — Automation Add-ons</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '1.4rem' }}>
              {AUTOMATION_OPTIONS.map(opt => {
                const on = addons.includes(opt.id);
                const Icon = opt.icon;
                return (
                  <motion.div key={opt.id} onClick={() => toggleAddon(opt.id)} whileTap={{ scale: 0.98 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 12px', borderRadius: '11px', border: `1px solid ${on ? 'rgba(6,182,212,0.35)' : 'rgba(255,255,255,0.06)'}`, background: on ? 'rgba(6,182,212,0.07)' : 'rgba(255,255,255,0.015)', cursor: 'pointer', transition: 'all 0.13s' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: on ? 'rgba(6,182,212,0.18)' : 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.13s' }}>
                      <Icon size={14} color={on ? '#22d3ee' : 'rgba(255,255,255,0.3)'} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.83rem', color: on ? '#e2e8f0' : 'rgba(255,255,255,0.5)', transition: 'color 0.13s' }}>{opt.label}</div>
                      <div style={{ fontSize: '0.67rem', color: 'rgba(255,255,255,0.28)', marginTop: '1px' }}>{opt.note}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: on ? '#22d3ee' : 'rgba(255,255,255,0.3)' }}>
                        {opt.usdPerMonth === 0 ? '% fee' : `$${opt.usdPerMonth}/mo`}
                      </span>
                      <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: `1.5px solid ${on ? '#22d3ee' : 'rgba(255,255,255,0.18)'}`, background: on ? '#22d3ee' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.13s' }}>
                        {on && <Check size={10} color="#000" strokeWidth={3} />}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Custom add-ons */}
            {customAddons.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: '8px' }}>Custom Automations</p>
                {customAddons.map(a => (
                  <div key={a.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '9px', background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.18)', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.83rem', color: '#e2e8f0' }}>{a.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#a78bfa' }}>{a.usdPerMonth === 0 ? 'Variable' : `$${a.usdPerMonth}/mo`}</span>
                      <div onClick={() => setCustomAddons(p => p.filter(x => x.id !== a.id))} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Trash2 size={13} color="#f87171" /></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div>
              <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: '8px' }}>Add Your Own Automation</p>
              <CustomAutomationAdder onAdd={a => setCustomAddons(p => [...p, a])} />
            </div>
          </motion.div>

          {/* ── COL 3: RESULTS ── */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#22d3ee', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Step 3 — Estimate</p>
              <CurrencyDropdown selected={currency} onSelect={setCurrency} />
            </div>

            {/* Breakdown card */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '1.75rem', marginBottom: '1rem' }}>
              {/* Badges */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <span style={{ padding: '3px 10px', borderRadius: '999px', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.18)', fontSize: '0.7rem', color: '#22d3ee', fontWeight: 700 }}>{fmtDisp(perMin)}/min</span>
                <span style={{ padding: '3px 10px', borderRadius: '999px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.18)', fontSize: '0.7rem', color: '#a78bfa', fontWeight: 700 }}>{mins.toLocaleString()} min total</span>
              </div>

              {/* Voice rows */}
              <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={11} /> Voice Stack
              </p>
              {[
                ['LLM – Gemini 2.5 Flash', VOICE_COSTS.llm.usd * mins],
                ['STT – Deepgram Nova-3',   VOICE_COSTS.stt.usd * mins],
                [`TTS – ${ttsQ === 'prem' ? 'ElevenLabs' : 'Google'}`, VOICE_COSTS[ttsKey].usd * mins],
                [`Twilio – ${callDir}`,     VOICE_COSTS[telKey].usd * mins],
                ['Phone Number (flat)',      flat],
              ].map(([l, u]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{l}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d4e0ee' }}>{fmtDisp(u)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0 0' }}>
                <span style={{ fontSize: '0.83rem', fontWeight: 700, color: '#22d3ee' }}>Voice Subtotal</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#22d3ee' }}>{fmtDisp(voiceTotal)}</span>
              </div>

              {/* Automation rows */}
              {addonTotal > 0 && (
                <div style={{ marginTop: '1.25rem' }}>
                  <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Zap size={11} /> Automation Add-ons
                  </p>
                  {AUTOMATION_OPTIONS.filter(a => addons.includes(a.id)).map(a => (
                    <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{a.label}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d4e0ee' }}>{a.usdPerMonth === 0 ? '% fee' : fmtDisp(a.usdPerMonth)}</span>
                    </div>
                  ))}
                  {customAddons.map(a => (
                    <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{a.label}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d4e0ee' }}>{a.usdPerMonth === 0 ? 'Variable' : fmtDisp(a.usdPerMonth)}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0 0' }}>
                    <span style={{ fontSize: '0.83rem', fontWeight: 700, color: '#a78bfa' }}>Automation Subtotal</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#a78bfa' }}>{fmtDisp(addonTotal)}</span>
                  </div>
                </div>
              )}

              {/* Grand total */}
              <div style={{ marginTop: '1.25rem', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(99,102,241,0.07))', border: '1px solid rgba(6,182,212,0.18)', padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>Total Monthly Infra Cost</span>
                  <span style={{ fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', fontWeight: 900, color: '#22d3ee', letterSpacing: '-0.02em' }}>
                    {fmtDisp(grandTotal)}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.38)' }}>Per call: <b style={{ color: 'rgba(255,255,255,0.6)' }}>{fmtDisp(perCall)}</b></span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.38)' }}>Per min: <b style={{ color: 'rgba(255,255,255,0.6)' }}>{fmtDisp(perMin)}</b></span>
                </div>
              </div>

              {/* Disclaimer card */}
              <div style={{ marginTop: '1rem', borderRadius: '12px', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.18)', padding: '0.9rem', display: 'flex', gap: '10px' }}>
                <Info size={15} color="#a78bfa" style={{ flexShrink: 0, marginTop: '1px' }} />
                <div>
                  <p style={{ fontSize: '0.73rem', fontWeight: 700, color: '#a78bfa', marginBottom: '3px' }}>Infrastructure Cost Only</p>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, margin: 0 }}>
                    This estimate covers only raw API costs. It does <strong style={{ color: 'rgba(255,255,255,0.55)' }}>not</strong> include Noman ai's setup fee, agency margin, or management. We discuss those clearly in your audit call.
                  </p>
                </div>
              </div>
            </div>

            {/* Download PDF */}
            <motion.button
              onClick={downloadPDF}
              whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.06)' }}
              whileTap={{ scale: 0.98 }}
              style={{ width: '100%', padding: '0.85rem', marginBottom: '0.75rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', color: '#d4e0ee', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'inherit', transition: 'all 0.15s' }}
            >
              <Download size={15} /> Download PDF Quotation
            </motion.button>

            {/* CTA */}
            <Link to="/audit" style={{ textDecoration: 'none', display: 'block' }}>
              <motion.div
                whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(6,182,212,0.4)' }}
                whileTap={{ scale: 0.98 }}
                style={{ padding: '1.1rem', borderRadius: '14px', background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)', cursor: 'pointer', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 0 30px rgba(6,182,212,0.2)' }}
              >
                <motion.div
                  animate={{ x: ['110%', '-120%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', pointerEvents: 'none' }}
                />
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <TrendingUp size={18} /> Get Your Free Build Plan
                  <ArrowRight size={18} />
                </div>
                <p style={{ fontSize: '0.73rem', color: 'rgba(255,255,255,0.72)', marginTop: '4px', margin: '4px 0 0' }}>
                  Book 30-min audit · We'll confirm your exact infra cost
                </p>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Custom slider thumb styles */}
      <style>{`
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg, #0ea5e9, #6366f1); box-shadow: 0 0 14px rgba(6,182,212,0.75); cursor: pointer; border: 2.5px solid #090e1c; }
        input[type=range]::-moz-range-thumb { width: 22px; height: 22px; border: 2.5px solid #090e1c; border-radius: 50%; background: linear-gradient(135deg, #0ea5e9, #6366f1); cursor: pointer; }
        input[type=range]:focus { outline: none; }
      `}</style>
    </section>
  );
}
