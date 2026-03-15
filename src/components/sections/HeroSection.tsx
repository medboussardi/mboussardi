'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-navy-50" />
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full border border-navy-200" />
        <div className="absolute top-40 right-40 w-64 h-64 rounded-full border border-navy-200" />
        <div className="absolute top-60 right-10 w-80 h-80 rounded-full border border-gold-200" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Profile image - mobile (shown above text on small screens) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex lg:hidden justify-center"
          >
            <div className="relative">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-navy-200 via-navy-100 to-gold-100 p-[3px] shadow-xl shadow-navy-200/30">
                <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-white">
                  <img
                    src="/images/profile.jpg"
                    alt="Mohammed Boussardi"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 bg-gold-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-start"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-sm font-semibold tracking-widest text-gold-600 uppercase mb-4"
            >
              {t('subtitle')}
            </motion.span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight mb-6">
              {t('greeting')}
            </h1>

            <h2 className="text-xl md:text-2xl font-medium text-navy-700 mb-6">
              {t('title')}
            </h2>

            <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-xl">
              {t('description')}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/experience"
                className="inline-flex items-center px-7 py-3.5 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors duration-300"
              >
                {t('cta_parcours')}
                <svg className="w-4 h-4 ms-2 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-7 py-3.5 border border-navy-200 text-navy-900 text-sm font-medium rounded-lg hover:bg-navy-50 transition-colors duration-300"
              >
                {t('cta_contact')}
              </Link>
              <a
                href="/Mohammed_Boussardi_CV.pdf"
                download
                className="inline-flex items-center px-7 py-3.5 text-gold-700 text-sm font-medium hover:text-gold-800 transition-colors duration-300"
              >
                <svg className="w-4 h-4 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                {t('cta_cv')}
              </a>
            </div>
          </motion.div>

          {/* Profile image - desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center overflow-hidden shadow-2xl shadow-navy-200/50">
                <img
                  src="/images/profile.jpg"
                  alt="Mohammed Boussardi"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gold-300 rounded-2xl opacity-40" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-navy-200 rounded-2xl opacity-30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
