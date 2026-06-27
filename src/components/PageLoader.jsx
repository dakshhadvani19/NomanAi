import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PageLoader — Full-screen loading overlay.
 * Designed for the future white neo-brutalist theme.
 *
 * TWO USAGE MODES:
 *
 * 1. Controlled mode (initial app load):
 *    <PageLoader isLoading={bool} />
 *    Pass isLoading={true/false} to control when it shows/hides.
 *
 * 2. Suspense fallback mode (route lazy-loading):
 *    <PageLoader />   ← no props needed
 *    Suspense itself unmounts it when the page is ready.
 *    Wrap in <SuspenseLoader> for the exit animation.
 */
export function LoaderContent() {
  return (
    <div className="outpera-loader-root">
      {/* Floating background shapes */}
      <motion.div
        className="outpera-loader-shape outpera-loader-shape--square"
        animate={{ y: [0, -20, 10, 0], x: [0, 15, -10, 0], rotate: [0, 90, 180, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="outpera-loader-shape outpera-loader-shape--circle"
        animate={{ y: [0, 25, -15, 0], x: [0, -20, 15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="outpera-loader-shape outpera-loader-shape--pill"
        animate={{ y: [0, -18, 12, 0], x: [0, 20, -12, 0], rotate: [0, -90, -180, -360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="outpera-loader-shape outpera-loader-shape--rectangle"
        animate={{ y: [0, -70, 30, 0], x: [0, -50, 20, 0], rotate: [0, 20, 90, 180, 360] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Hidden SVG for the liquid/gooey effect */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* The UIverse dot-ring spinner with liquid filter applied */}
      <div className="outpera-pl" style={{ filter: 'url(#goo)' }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="outpera-pl__dot" />
        ))}
        <div className="outpera-pl__text" style={{ filter: 'none' }}>Loading…</div>
      </div>

      {/* Brand label */}
      <motion.p
        className="outpera-loader-brand"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Outpera
      </motion.p>
    </div>
  );
}

/**
 * Controlled loader — for the initial page load.
 * Shows while isLoading=true, fades out when isLoading=false.
 */
export default function PageLoader({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
        >
          <LoaderContent />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * SuspenseLoader — wraps a lazy-loaded route.
 * Renders a full-screen loader while the chunk is loading,
 * with a smooth fade-out once the page is ready.
 * Use this as the Suspense fallback in App.jsx.
 */
export function SuspenseLoader() {
  return (
    <motion.div
      key="suspense-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
    >
      <LoaderContent />
    </motion.div>
  );
}
