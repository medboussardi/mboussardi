'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MinimalPage() {
  const [flipped, setFlipped] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 -z-10" />
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#0f1724 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      {/* Content wrapper */}
      <div className="flex flex-col items-center px-6 py-16">

        {/* Flip card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-10"
        >
          <div
            className="relative cursor-pointer"
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
              {/* Front — profile photo */}
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img
                  src="/images/profile.jpg"
                  alt="Mohammed Boussardi"
                  className="w-full h-full object-cover"
                />
                {/* Gold bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b49a3e] to-[#c4ad5c]" />
              </div>

              {/* Back — ? card */}
              <div
                className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center shadow-2xl"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'linear-gradient(135deg, #0f1724 0%, #1e2a40 100%)',
                }}
              >
                <span
                  className="font-black leading-none mb-3 select-none"
                  style={{ fontSize: '6rem', color: '#b49a3e', textShadow: '0 0 40px rgba(180,154,62,0.4)' }}
                >
                  ?
                </span>
                <p className="text-white text-center text-xs font-medium leading-relaxed px-5 opacity-90 tracking-wide">
                  Your expert is<br />ready in your hands
                </p>
              </div>
            </motion.div>

            {/* Hover hint ring */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              animate={{ boxShadow: flipped ? '0 0 0 3px rgba(180,154,62,0.6)' : '0 0 0 0px rgba(180,154,62,0)' }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Name & title */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-center mb-1"
        >
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#0f1724' }}>
            Mohammed Boussardi
          </h1>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mt-2" style={{ color: '#b49a3e' }}>
            Enterprise Applications Consultant
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="w-14 h-[2px] my-7 rounded-full"
          style={{ backgroundColor: '#b49a3e', opacity: 0.5 }}
        />

        {/* Phone */}
        <motion.a
          href="tel:+212602665248"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="group flex items-center gap-3 mb-8"
        >
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors duration-300 group-hover:bg-[#b49a3e] shadow-md"
            style={{ backgroundColor: '#0f1724' }}
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

        {/* CV download buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <a
            href="/Mohammed_Boussardi_CV_EN.pdf"
            download
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
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
