import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, LogOut, Phone, Clock, TrendingUp,
  Play, Pause, ChevronDown, ChevronUp,
  AlertCircle, ChevronLeft, ChevronRight, Mic,
} from 'lucide-react';
import { auth, db } from '../firebase';
import {
  GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,
} from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import SEO from './SEO';

// ─── Constants ────────────────────────────────────────────────────────────────

const googleProvider = new GoogleAuthProvider();
const PAGE_SIZE = 30;

const STATUS_STYLES = {
  completed:  { bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.35)',  color: '#4ade80' },
  failed:     { bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.35)',   color: '#f87171' },
  busy:       { bg: 'rgba(234,179,8,0.12)',   border: 'rgba(234,179,8,0.35)',   color: '#facc15' },
  'no-answer':{ bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.35)', color: '#94a3b8' },
};

const SENTIMENT_STYLES = {
  Positive: { bg: 'rgba(34,197,94,0.1)',   color: '#4ade80' },
  Negative: { bg: 'rgba(239,68,68,0.1)',   color: '#f87171' },
  Neutral:  { bg: 'rgba(148,163,184,0.1)', color: '#94a3b8' },
};

const STATUS_FILTERS = [
  { key: 'all',       label: 'All Calls'  },
  { key: 'completed', label: 'Completed'  },
  { key: 'failed',    label: 'Failed'     },
  { key: 'no-answer', label: 'No Answer'  },
  { key: 'busy',      label: 'Busy'       },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDuration(secs) {
  if (secs == null || secs === false) return '—';
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function formatDateTime(timeStr) {
  if (!timeStr) return '—';
  try {
    const [datePart, timePart] = timeStr.split(' ');
    const [mm, dd, yyyy] = datePart.split('/');
    return new Date(`${yyyy}-${mm}-${dd}T${timePart}`).toLocaleString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch { return timeStr; }
}

function avgDurationFromCalls(calls) {
  const valid = calls.filter(c => c.call_duration_in_seconds > 0);
  if (!valid.length) return '—';
  const avg = Math.round(
    valid.reduce((sum, c) => sum + c.call_duration_in_seconds, 0) / valid.length
  );
  return formatDuration(avg);
}

async function apiFetch(action, agentId, extra = {}) {
  const params = new URLSearchParams({ action, agentId, ...extra });
  const res = await fetch(`/api/omnidimension?${params}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `API error ${res.status}`);
  }
  return res.json();
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner({ size = 24, color = '#06b6d4' }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
      style={{
        width: size, height: size, borderRadius: '50%',
        border: `2px solid rgba(255,255,255,0.1)`,
        borderTopColor: color,
        flexShrink: 0,
      }}
    />
  );
}

// ─── AudioPlayer ──────────────────────────────────────────────────────────────

function AudioPlayer({ url }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onended = () => setPlaying(false);
    return () => { audio.pause(); audio.src = ''; };
  }, [url]);

  const toggle = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  return (
    <button
      onClick={toggle}
      title={playing ? 'Pause recording' : 'Play recording'}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '5px 11px', borderRadius: 20, cursor: 'pointer',
        fontFamily: 'inherit', fontSize: '0.72rem', fontWeight: 600,
        border: '1px solid rgba(6,182,212,0.3)',
        background: playing ? 'rgba(6,182,212,0.2)' : 'rgba(6,182,212,0.08)',
        color: '#06b6d4', transition: 'background 0.15s', whiteSpace: 'nowrap',
      }}
    >
      {playing ? <Pause size={11} /> : <Play size={11} />}
      {playing ? 'Pause' : 'Play'}
    </button>
  );
}

// ─── TranscriptText ───────────────────────────────────────────────────────────

function TranscriptText({ text }) {
  if (!text) {
    return (
      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', fontStyle: 'italic' }}>
        No transcript available
      </span>
    );
  }

  const lines = text
    .split(/<br\s*\/?>/gi)
    .map(l => l.replace(/<[^>]+>/g, '').trim())
    .filter(Boolean);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 320, overflowY: 'auto' }}>
      {lines.map((line, i) => {
        const userMatch  = line.match(/^[Uu]ser\s*:\s*(.*)/);
        const agentMatch = line.match(/^(?:LLM|Agent|Bot|Assistant)\s*:\s*(.*)/i);

        if (userMatch) {
          return (
            <div key={i} style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', minWidth: 40, paddingTop: 2, textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0 }}>
                You
              </span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                {userMatch[1]}
              </span>
            </div>
          );
        }
        if (agentMatch) {
          return (
            <div key={i} style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#06b6d4', minWidth: 40, paddingTop: 2, textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0 }}>
                Bot
              </span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                {agentMatch[1]}
              </span>
            </div>
          );
        }
        return (
          <span key={i} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
            {line}
          </span>
        );
      })}
    </div>
  );
}

// ─── CallRow ──────────────────────────────────────────────────────────────────

function CallRow({ call }) {
  const [expanded, setExpanded] = useState(false);

  const statusStyle   = STATUS_STYLES[call.call_status]    || STATUS_STYLES['no-answer'];
  const sentimentStyle = SENTIMENT_STYLES[call.sentiment_score];
  const hasRecording  = call.recording_url && call.recording_url !== false;
  const hasTranscript = !!call.call_conversation;

  return (
    <>
      <tr
        onClick={() => hasTranscript && setExpanded(v => !v)}
        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: hasTranscript ? 'pointer' : 'default', transition: 'background 0.12s' }}
        onMouseEnter={e => { if (hasTranscript) e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; }}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <td style={{ padding: '12px 16px', fontSize: '0.77rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>
          {formatDateTime(call.time_of_call)}
        </td>
        <td style={{ padding: '12px 16px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.78)', fontFamily: 'monospace' }}>
          {call.from_number || '—'}
        </td>
        <td style={{ padding: '12px 16px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.78)', fontFamily: 'monospace' }}>
          {call.to_number || '—'}
        </td>
        <td style={{ padding: '12px 16px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', whiteSpace: 'nowrap' }}>
          {formatDuration(call.call_duration_in_seconds)}
        </td>
        <td style={{ padding: '12px 16px' }}>
          <span style={{
            display: 'inline-block', padding: '3px 10px', borderRadius: 20,
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.03em', textTransform: 'capitalize',
            background: statusStyle.bg, border: `1px solid ${statusStyle.border}`, color: statusStyle.color,
          }}>
            {call.call_status}
          </span>
        </td>
        <td style={{ padding: '12px 16px' }}>
          {sentimentStyle && (
            <span style={{
              display: 'inline-block', padding: '3px 10px', borderRadius: 20,
              fontSize: '0.7rem', fontWeight: 600,
              background: sentimentStyle.bg, color: sentimentStyle.color,
            }}>
              {call.sentiment_score}
            </span>
          )}
        </td>
        <td style={{ padding: '12px 16px' }}>
          {hasRecording && <AudioPlayer url={call.recording_url} />}
        </td>
        <td style={{ padding: '12px 16px', textAlign: 'center', width: 32 }}>
          {hasTranscript && (
            expanded
              ? <ChevronUp size={14} color="rgba(6,182,212,0.7)" />
              : <ChevronDown size={14} color="rgba(255,255,255,0.25)" />
          )}
        </td>
      </tr>

      {expanded && hasTranscript && (
        <tr>
          <td colSpan={8} style={{
            padding: '16px 24px 20px',
            background: 'rgba(6,182,212,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#06b6d4', marginBottom: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Transcript
            </div>
            <TranscriptText text={call.call_conversation} />
          </td>
        </tr>
      )}
    </>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, delay, accentColor = '#06b6d4' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        flex: 1, minWidth: 110,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16, padding: '1.2rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
        <span style={{ color: accentColor }}>{icon}</span>
        {label}
      </div>
      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
        {value}
      </div>
    </motion.div>
  );
}

// ─── SignInScreen ─────────────────────────────────────────────────────────────

function SignInScreen({ onSignIn, loading, error }) {
  const [isHoveringGoogle, setIsHoveringGoogle] = useState(false);

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1.5rem',
      position: 'relative',
      fontFamily: 'sans-serif',
      color: 'black',
      overflow: 'hidden'
    }}>
      {/* Animated Background Shapes */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {/* Blue Square */}
        <motion.div
          animate={{
            y: [0, 80, -40, 0],
            x: [0, 50, -30, 0],
            rotate: [0, 90, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute', top: '10%', left: '5%',
            width: 'clamp(8rem, 15vw, 14rem)', height: 'clamp(8rem, 15vw, 14rem)',
            backgroundColor: '#00d3ff',
            border: '3px solid black',
            boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
            opacity: 0.8
          }}
        />
        
        {/* Green Circle */}
        <motion.div
          animate={{
            y: [0, -60, 40, 0],
            x: [0, -40, 60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute', top: '60%', left: '15%',
            width: 'clamp(10rem, 20vw, 16rem)', height: 'clamp(10rem, 20vw, 16rem)',
            backgroundColor: '#53e17c',
            borderRadius: '50%',
            border: '3px solid black',
            boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
            opacity: 0.8
          }}
        />

        {/* Yellow Pill */}
        <motion.div
          animate={{
            y: [0, 50, -50, 0],
            x: [0, 60, -40, 0],
            rotate: [0, -45, -90, -180, -360]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute', top: '15%', right: '5%',
            width: 'clamp(12rem, 25vw, 18rem)', height: 'clamp(5rem, 10vw, 7rem)',
            backgroundColor: '#ffc82e',
            borderRadius: '9999px',
            border: '3px solid black',
            boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
            opacity: 0.8
          }}
        />

        {/* Orange Rectangle with rounded corners */}
        <motion.div
          animate={{
            y: [0, -70, 30, 0],
            x: [0, -50, 20, 0],
            rotate: [0, 20, 90, 180, 360]
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute', bottom: '10%', right: '10%',
            width: 'clamp(12rem, 25vw, 18rem)', height: 'clamp(6rem, 12vw, 8rem)',
            backgroundColor: '#ff7139',
            border: '3px solid black',
            boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
            borderRadius: '1.5rem',
            opacity: 0.8
          }}
        />
      </div>

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%', maxWidth: '28rem',
          backgroundColor: 'white',
          border: '3px solid black',
          padding: 'clamp(2rem, 5vw, 3rem)',
          boxShadow: '12px 12px 0px 0px rgba(0,0,0,1)',
          zIndex: 10,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Top decorative bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '0.5rem',
          backgroundColor: '#ff7139',
          borderBottom: '2px solid black'
        }} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.25rem, 5vw, 3rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.05em',
            marginBottom: '1rem',
            color: 'black'
          }}>
            Admin Panel
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#4b5563', fontWeight: 500 }}>
            Sign in with your registered Google account to access your voice agent dashboard.
          </p>
        </div>

        {error && (
          <div style={{
            padding: '12px 16px', borderRadius: '8px', marginBottom: '1.5rem',
            backgroundColor: '#fee2e2', border: '2px solid #ef4444',
            color: '#b91c1c', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <button
            onClick={onSignIn}
            disabled={loading}
            onMouseEnter={() => !loading && setIsHoveringGoogle(true)}
            onMouseLeave={() => setIsHoveringGoogle(false)}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f9fafb',
              padding: '1rem 1.5rem',
              borderRadius: '0.75rem',
              fontWeight: 700,
              fontSize: '1.125rem',
              color: 'black',
              overflow: 'hidden',
              cursor: loading ? 'not-allowed' : 'pointer',
              border: '2px solid black',
              boxShadow: isHoveringGoogle ? '6px 6px 0px 0px rgba(0,0,0,1)' : '4px 4px 0px 0px rgba(0,0,0,1)',
              transform: loading ? 'none' : (isHoveringGoogle ? 'scale(1.02)' : 'scale(1)'),
              transition: 'transform 0.15s, box-shadow 0.15s',
              width: '100%'
            }}
          >
            {/* Animated 4-color Background Hover State */}
            <div style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              opacity: isHoveringGoogle ? 1 : 0,
              transition: 'opacity 0.5s',
              overflow: 'hidden', zIndex: 0, borderRadius: '0.75rem'
            }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{
                  width: '200%', height: '200%',
                  position: 'absolute', top: '-50%', left: '-50%',
                  background: 'conic-gradient(from 0deg, #EA4335, #FBBC05, #34A853, #4285F4, #EA4335)'
                }}
              />
              <div style={{ position: 'absolute', inset: '4px', backgroundColor: 'white', borderRadius: '0.5rem', zIndex: 0 }} />
            </div>

            <span style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {loading ? (
                <Spinner size={24} color="#000" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '1.5rem', height: '1.5rem' }}>
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.9c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
              )}
              {loading ? 'Signing in…' : 'Sign in with Google'}
            </span>
          </button>
        </div>
      </motion.div>
    </main>
  );
}

// ─── UnauthorizedScreen ───────────────────────────────────────────────────────

function UnauthorizedScreen({ user, onSignOut }) {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{
          background: 'rgba(12, 17, 35, 0.75)',
          border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: 24, padding: '3rem',
          maxWidth: 420, width: '100%',
          textAlign: 'center',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <div style={{
          width: 64, height: 64, borderRadius: 18, margin: '0 auto 1.5rem',
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <AlertCircle size={28} color="#ef4444" />
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.7rem' }}>
          Access Denied
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: '0.5rem' }}>
          The account{' '}
          <span style={{ color: '#f87171', fontWeight: 600 }}>{user?.email}</span>
          {' '}is not registered for any agent.
        </p>
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', marginBottom: '2rem' }}>
          Contact the Outpera team to get access, or try a different Google account.
        </p>

        <button
          onClick={onSignOut}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            width: '100%', padding: 13, borderRadius: 12,
            border: '1px solid rgba(239,68,68,0.25)', cursor: 'pointer',
            background: 'rgba(239,68,68,0.07)', color: '#f87171',
            fontSize: '0.87rem', fontWeight: 600, fontFamily: 'inherit',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.13)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.07)'}
        >
          <LogOut size={15} /> Sign out &amp; try another account
        </button>
      </motion.div>
    </div>
  );
}

// ─── ClientPortal (main) ──────────────────────────────────────────────────────

export default function ClientPortal() {
  const [pageState, setPageState] = useState('initializing');
  // 'initializing' | 'unauthenticated' | 'authenticating'
  // 'checking_access' | 'unauthorized' | 'ready'

  const [authError, setAuthError]     = useState('');
  const [user, setUser]               = useState(null);
  const [clientRecord, setClientRecord] = useState(null); // Firestore doc

  const [agentDetails, setAgentDetails] = useState(null); // Omnidim agent obj
  const [statsTotal, setStatsTotal]     = useState(null); // { all, completed }
  const [calls, setCalls]               = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage]   = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loadingCalls, setLoadingCalls] = useState(false);
  const [callsError, setCallsError]     = useState(null);

  // ── Auth listener ──────────────────────────────────────────────────────────

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setUser(fbUser);
        setPageState('checking_access');
        try {
          const q = query(
            collection(db, 'agents'),
            where('allowedEmails', 'array-contains', fbUser.email)
          );
          const snap = await getDocs(q);
          if (snap.empty) {
            setPageState('unauthorized');
          } else {
            setClientRecord(snap.docs[0].data());
            setPageState('ready');
          }
        } catch (err) {
          console.error('[Portal] Firestore access check failed:', err);
          setPageState('unauthorized');
        }
      } else {
        setUser(null);
        setClientRecord(null);
        setPageState('unauthenticated');
      }
    });
    return unsub;
  }, []);

  // ── Initial data load when portal becomes ready ────────────────────────────

  useEffect(() => {
    if (pageState !== 'ready' || !clientRecord?.agentId) return;
    const id = clientRecord.agentId;

    // Agent details (fire-and-forget, failure is non-critical)
    apiFetch('agent', id)
      .then(data => setAgentDetails(data))
      .catch(() => {});

    // Stats: total and completed counts (using pagesize=1 trick)
    Promise.all([
      apiFetch('calls', id, { pagesize: '1' }),
      apiFetch('calls', id, { pagesize: '1', call_status: 'completed' }),
    ])
      .then(([all, comp]) => setStatsTotal({
        all:       all.total_records  ?? 0,
        completed: comp.total_records ?? 0,
      }))
      .catch(() => {});
  }, [pageState, clientRecord?.agentId]);

  // ── Reload calls when page or filter changes ───────────────────────────────

  useEffect(() => {
    if (pageState !== 'ready' || !clientRecord?.agentId) return;
    const id = clientRecord.agentId;

    setLoadingCalls(true);
    setCallsError(null);

    const extra = { pageno: String(currentPage), pagesize: String(PAGE_SIZE) };
    if (statusFilter !== 'all') extra.call_status = statusFilter;

    apiFetch('calls', id, extra)
      .then(data => {
        setCalls(data.call_log_data || []);
        setTotalRecords(data.total_records || 0);
      })
      .catch(err => {
        setCallsError(err.message);
        setCalls([]);
        setTotalRecords(0);
      })
      .finally(() => setLoadingCalls(false));
  }, [pageState, clientRecord?.agentId, currentPage, statusFilter]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleSignIn = async () => {
    setAuthError('');
    setPageState('authenticating');
    try {
      await signInWithPopup(auth, googleProvider);
      // onAuthStateChanged will fire automatically and handle the rest
    } catch (err) {
      console.error('[Portal] Sign-in error:', err.code, err.message);
      const cancelled = err.code === 'auth/popup-closed-by-user'
        || err.code === 'auth/cancelled-popup-request';
      setAuthError(cancelled ? '' : 'Sign-in failed. Please try again.');
      setPageState('unauthenticated');
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setClientRecord(null);
    setAgentDetails(null);
    setStatsTotal(null);
    setCalls([]);
    setTotalRecords(0);
    setCurrentPage(1);
    setStatusFilter('all');
  };

  const handleFilterChange = (key) => {
    setStatusFilter(key);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalRecords / PAGE_SIZE);

  // ── Loading / Auth screens ─────────────────────────────────────────────────

  if (pageState === 'initializing' || pageState === 'checking_access') {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <Spinner size={32} />
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.88rem' }}>
          {pageState === 'checking_access' ? 'Verifying access…' : 'Loading…'}
        </p>
      </div>
    );
  }

  if (pageState === 'unauthenticated' || pageState === 'authenticating') {
    return (
      <>
        <SEO title="Admin Panel — Outpera" url="https://outperavercel.vercel.app/client-portal" />
        <SignInScreen
          onSignIn={handleSignIn}
          loading={pageState === 'authenticating'}
          error={authError}
        />
      </>
    );
  }

  if (pageState === 'unauthorized') {
    return (
      <>
        <SEO title="Admin Panel — Outpera" url="https://outperavercel.vercel.app/client-portal" />
        <UnauthorizedScreen user={user} onSignOut={handleSignOut} />
      </>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────

  return (
    <>
      <SEO title="Admin Panel — Outpera" url="https://outperavercel.vercel.app/client-portal" />

      <div style={{ paddingTop: '6.5rem', paddingBottom: '4rem', minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: 1160 }}>

          {/* ── Page Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', flexWrap: 'wrap',
              gap: '1rem', marginBottom: '1.75rem',
            }}
          >
            <div>
              <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>
                Admin Panel
              </h1>
              <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.38)' }}>
                {user?.email}{clientRecord?.clientName ? ` · ${clientRecord.clientName}` : ''}
              </p>
            </div>

            <button
              onClick={handleSignOut}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 16px', borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.09)',
                background: 'rgba(255,255,255,0.04)', cursor: 'pointer',
                color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', fontWeight: 600,
                fontFamily: 'inherit', transition: 'all 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
            >
              <LogOut size={14} /> Sign out
            </button>
          </motion.div>

          {/* ── Agent Info Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            style={{
              background: 'rgba(6,182,212,0.04)',
              border: '1px solid rgba(6,182,212,0.14)',
              borderRadius: 20, padding: '1.4rem 1.6rem',
              display: 'flex', alignItems: 'center',
              flexWrap: 'wrap', gap: '1.25rem',
              marginBottom: '1.25rem',
            }}
          >
            <div style={{
              width: 50, height: 50, borderRadius: 13, flexShrink: 0,
              background: 'rgba(6,182,212,0.14)', border: '1px solid rgba(6,182,212,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Mic size={22} color="#06b6d4" />
            </div>

            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 5 }}>
                {agentDetails?.name || clientRecord?.agentName || 'Voice Agent'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                {agentDetails?.bot_call_type && (
                  <Chip label={`Type: ${agentDetails.bot_call_type}`} />
                )}
                {agentDetails?.llm_service && (
                  <Chip label={`LLM: ${agentDetails.llm_service}`} />
                )}
                {agentDetails?.voice_name && (
                  <Chip label={`Voice: ${agentDetails.voice_name}`} />
                )}
                {agentDetails?.status_of_building_flow && (
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 700, padding: '2px 9px', borderRadius: 20,
                    background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)',
                  }}>
                    {agentDetails.status_of_building_flow}
                  </span>
                )}
              </div>
            </div>

            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.28)', fontFamily: 'monospace' }}>
              ID: {clientRecord?.agentId}
            </span>
          </motion.div>

          {/* ── Stats Row ── */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <StatCard
              icon={<Phone size={13} />} label="Total Calls"
              value={statsTotal ? statsTotal.all : '—'}
              delay={0.12}
            />
            <StatCard
              icon={<TrendingUp size={13} />} label="Completed"
              value={statsTotal ? statsTotal.completed : '—'}
              delay={0.17} accentColor="#4ade80"
            />
            <StatCard
              icon={<Clock size={13} />} label="Avg Duration (this page)"
              value={calls.length ? avgDurationFromCalls(calls) : '—'}
              delay={0.22} accentColor="#a78bfa"
            />
          </div>

          {/* ── Call Logs Panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20, overflow: 'hidden',
            }}
          >
            {/* Panel header */}
            <div style={{
              padding: '1.1rem 1.4rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center',
              flexWrap: 'wrap', gap: '0.75rem',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: '0.93rem' }}>
                <Phone size={15} color="#06b6d4" />
                Call Logs
                {totalRecords > 0 && (
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
                    ({totalRecords.toLocaleString()} total)
                  </span>
                )}
              </div>

              {/* Status filters */}
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {STATUS_FILTERS.map(f => (
                  <button
                    key={f.key}
                    onClick={() => handleFilterChange(f.key)}
                    style={{
                      padding: '5px 12px', borderRadius: 20,
                      border: statusFilter === f.key ? '1px solid rgba(6,182,212,0.35)' : '1px solid transparent',
                      cursor: 'pointer', fontSize: '0.71rem', fontWeight: 600, fontFamily: 'inherit',
                      background: statusFilter === f.key ? 'rgba(6,182,212,0.18)' : 'rgba(255,255,255,0.05)',
                      color: statusFilter === f.key ? '#06b6d4' : 'rgba(255,255,255,0.45)',
                      transition: 'all 0.15s',
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Table or states */}
            <div style={{ overflowX: 'auto' }}>
              {loadingCalls && (
                <div style={{ padding: '3.5rem', display: 'flex', justifyContent: 'center' }}>
                  <Spinner size={30} />
                </div>
              )}

              {!loadingCalls && callsError && (
                <div style={{ padding: '3rem', textAlign: 'center' }}>
                  <AlertCircle size={22} color="#f87171" style={{ marginBottom: 10 }} />
                  <p style={{ color: '#f87171', fontSize: '0.88rem' }}>{callsError}</p>
                </div>
              )}

              {!loadingCalls && !callsError && calls.length === 0 && (
                <div style={{ padding: '3.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.28)', fontSize: '0.88rem' }}>
                  No calls found{statusFilter !== 'all' ? ` with status "${statusFilter}"` : ''}.
                </div>
              )}

              {!loadingCalls && !callsError && calls.length > 0 && (
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                      {['Date & Time', 'From', 'To', 'Duration', 'Status', 'Sentiment', 'Recording', ''].map((h, i) => (
                        <th key={i} style={{
                          padding: '9px 16px', textAlign: 'left',
                          fontSize: '0.67rem', fontWeight: 700, textTransform: 'uppercase',
                          letterSpacing: '0.07em', color: 'rgba(255,255,255,0.32)',
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {calls.map(call => (
                      <CallRow key={call.id} call={call} />
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && !loadingCalls && (
              <div style={{
                padding: '0.9rem 1.4rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', gap: '1rem',
              }}>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>
                  Page {currentPage} of {totalPages}
                </span>
                <div style={{ display: 'flex', gap: '0.45rem' }}>
                  {[
                    { label: <><ChevronLeft size={13} /> Prev</>, page: currentPage - 1, disabled: currentPage === 1 },
                    { label: <>Next <ChevronRight size={13} /></>, page: currentPage + 1, disabled: currentPage === totalPages },
                  ].map(({ label, page, disabled }) => (
                    <button
                      key={page}
                      onClick={() => !disabled && setCurrentPage(page)}
                      disabled={disabled}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        padding: '7px 13px', borderRadius: 10,
                        border: '1px solid rgba(255,255,255,0.09)',
                        background: 'rgba(255,255,255,0.04)',
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        color: disabled ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.65)',
                        fontSize: '0.78rem', fontWeight: 600, fontFamily: 'inherit',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </>
  );
}

// Small text chip helper (used in agent info card)
function Chip({ label }) {
  return (
    <span style={{ fontSize: '0.73rem', color: 'rgba(255,255,255,0.45)' }}>
      {label}
    </span>
  );
}
