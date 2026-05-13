'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function ProfessionalAvatar() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a2840" />
          <stop offset="100%" stopColor="#0c1420" />
        </linearGradient>
        <linearGradient id="figGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c4060" />
          <stop offset="100%" stopColor="#1a2c45" />
        </linearGradient>
        <radialGradient id="headGrad" cx="42%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#3a526e" />
          <stop offset="100%" stopColor="#1e3050" />
        </radialGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="circleClip">
          <circle cx="100" cy="100" r="95" />
        </clipPath>
      </defs>

      {/* Background */}
      <circle cx="100" cy="100" r="100" fill="url(#bgGrad)" />

      {/* Subtle dot grid */}
      <g opacity="0.07">
        {[40, 70, 100, 130, 160].map(x =>
          [40, 70, 100, 130, 160].map(y => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1" fill="#b49a3e" />
          ))
        )}
      </g>

      {/* Figure — clipped inside circle */}
      <g clipPath="url(#circleClip)">
        {/* Head */}
        <circle cx="100" cy="76" r="27" fill="url(#headGrad)" />

        {/* Neck */}
        <rect x="91" y="100" width="18" height="14" rx="5" fill="#243548" />

        {/* Suit body / shoulders */}
        <path
          d="M 0 230 L 0 158 Q 22 130 58 120 L 72 114 L 100 130 L 128 114 L 142 120 Q 178 130 200 158 L 200 230 Z"
          fill="url(#figGrad)"
        />

        {/* Shirt / chest highlight */}
        <path
          d="M 72 114 Q 86 122 100 130 Q 114 122 128 114 Q 120 132 100 136 Q 80 132 72 114 Z"
          fill="#f0f4f8"
          opacity="0.06"
        />

        {/* Lapels */}
        <path
          d="M 72 114 L 91 117 L 100 130 M 128 114 L 109 117 L 100 130"
          stroke="#b49a3e"
          strokeWidth="1.2"
          fill="none"
          opacity="0.5"
          strokeLinecap="round"
          filter="url(#softGlow)"
        />

        {/* Tie */}
        <path
          d="M 97 117 L 100 220 L 103 117 Q 100 123 97 117 Z"
          fill="#b49a3e"
          opacity="0.3"
        />

        {/* Tie knot */}
        <path
          d="M 97 117 Q 100 121 103 117 Q 103 114 100 113 Q 97 114 97 117 Z"
          fill="#b49a3e"
          opacity="0.55"
        />
      </g>

      {/* Outer decorative rings */}
      <circle cx="100" cy="100" r="96" fill="none" stroke="#b49a3e" strokeWidth="1.5" opacity="0.3" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#b49a3e" strokeWidth="0.5" opacity="0.12" />

      {/* Four corner dots */}
      <circle cx="100" cy="4"   r="2" fill="#b49a3e" opacity="0.4" />
      <circle cx="100" cy="196" r="2" fill="#b49a3e" opacity="0.4" />
      <circle cx="4"   cy="100" r="2" fill="#b49a3e" opacity="0.4" />
      <circle cx="196" cy="100" r="2" fill="#b49a3e" opacity="0.4" />
    </svg>
  );
}

function TypingHandle() {
  const handle = 'mboussardi';
  const [chars, setChars] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (chars < handle.length) {
      const t = setTimeout(() => setChars(c => c + 1), 95);
      return () => clearTimeout(t);
    }
  }, [chars]);

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 520);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="font-mono tracking-tight">
      <span style={{ color: '#b49a3e' }}>{'> '}</span>
      <span style={{ color: '#0f1724' }}>{handle.slice(0, chars)}</span>
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1.1em',
          backgroundColor: '#b49a3e',
          marginLeft: '1px',
          verticalAlign: 'text-bottom',
          opacity: blink ? 1 : 0,
          transition: 'opacity 0.1s',
        }}
      />
    </span>
  );
}

export default function MinimalPage() {
  const [flipped, setFlipped] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, #f0f4ff 0%, #ffffff 55%, #faf8f2 100%)',
        }}
      />

      <div className="flex flex-col items-center px-6 py-16">

        {/* Flip card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="mb-10"
        >
          <div
            className="relative cursor-pointer select-none"
            style={{ perspective: '1000px', width: '200px', height: '200px' }}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
          >
            <motion.div
              className="relative w-full h-full"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Front — SVG avatar */}
              <div
                className="absolute inset-0 rounded-full overflow-hidden shadow-2xl"
                style={{
                  backfaceVisibility: 'hidden',
                  boxShadow: '0 20px 60px rgba(15,23,36,0.18), 0 0 0 3px rgba(180,154,62,0.25)',
                }}
              >
                <ProfessionalAvatar />
              </div>

              {/* Back — mystery card */}
              <div
                className="absolute inset-0 rounded-full flex flex-col items-center justify-center shadow-2xl"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'linear-gradient(135deg, #0f1724 0%, #1e2a40 100%)',
                  boxShadow: '0 20px 60px rgba(15,23,36,0.25), 0 0 0 3px rgba(180,154,62,0.35)',
                }}
              >
                <span
                  className="font-black leading-none mb-3 select-none"
                  style={{
                    fontSize: '5.5rem',
                    color: '#b49a3e',
                    textShadow: '0 0 30px rgba(180,154,62,0.5)',
                  }}
                >
                  ?
                </span>
                <p className="text-white text-center text-xs font-medium leading-relaxed px-6 opacity-80 tracking-wide">
                  Your expert is<br />ready in your hands
                </p>
              </div>
            </motion.div>

            {/* Hover glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              animate={{
                boxShadow: flipped
                  ? '0 0 0 3px rgba(180,154,62,0.55), 0 0 24px rgba(180,154,62,0.2)'
                  : '0 0 0 0px rgba(180,154,62,0)',
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Handle / name */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-1"
        >
          <h1 className="text-2xl font-semibold tracking-tight mb-1">
            <TypingHandle />
          </h1>
          <p
            className="text-xs font-semibold tracking-[0.22em] uppercase mt-2"
            style={{ color: '#b49a3e' }}
          >
            Enterprise Applications Consultant
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-12 h-[1.5px] my-7 rounded-full"
          style={{ backgroundColor: '#b49a3e', opacity: 0.45 }}
        />

        {/* Phone */}
        <motion.a
          href="tel:+212602665248"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="group flex items-center gap-3 mb-8"
        >
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: '#0f1724' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b49a3e')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0f1724')}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </span>
          <span
            className="text-lg font-semibold transition-colors duration-300 group-hover:text-[#b49a3e]"
            style={{ color: '#0f1724' }}
          >
            +212 602 665 248
          </span>
        </motion.a>

        {/* CV buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <a
            href="/Mohammed_Boussardi_CV_EN.pdf"
            download
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            style={{ backgroundColor: '#0f1724' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1e2a40')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0f1724')}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
            Resume — EN
          </a>
          <a
            href="/Mohammed_Boussardi_CV_FR.pdf"
            download
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{ border: '2px solid #0f1724', color: '#0f1724', backgroundColor: 'transparent' }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#0f1724';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#0f1724';
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
            CV — FR
          </a>
        </motion.div>

      </div>
    </main>
  );
}
