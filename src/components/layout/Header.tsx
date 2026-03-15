'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/routing';
import { localeNames, type Locale } from '@/i18n/config';

const locales: Locale[] = ['fr', 'en', 'es', 'ar'];

const localeCodes: Record<Locale, string> = {
  fr: 'FR',
  en: 'EN',
  es: 'ES',
  ar: 'AR',
};

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLocaleChange = (newLocale: Locale) => {
    setLangOpen(false);
    setMobileOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/experience', label: t('experience') },
    { href: '/skills', label: t('skills') },
    { href: '/certifications', label: t('certifications') },
    { href: '/contact', label: t('contact') },
  ] as const;

  const isRtl = locale === 'ar';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group shrink-0"
              onClick={() => setMobileOpen(false)}
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-navy-900 text-white font-bold text-sm tracking-widest group-hover:bg-gold-500 transition-colors duration-300">
                MB
              </span>
              <span className="hidden sm:block text-navy-900 font-semibold text-sm tracking-wider group-hover:text-gold-500 transition-colors duration-300">
                Boussardi
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-navy-900 transition-colors duration-200 group"
                >
                  {label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gold-500 group-hover:w-3/4 transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">

              {/* Language Switcher — Desktop */}
              <div ref={langRef} className="relative hidden sm:block">
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  aria-expanded={langOpen}
                  aria-haspopup="listbox"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold text-navy-900 border border-slate-200 hover:border-gold-500 hover:text-gold-600 transition-all duration-200 bg-white"
                >
                  <span className="w-4 h-4 text-slate-400">
                    <svg viewBox="0 0 16 16" fill="none" className="w-full h-full" aria-hidden="true">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M8 1C8 1 5.5 4 5.5 8s2.5 7 2.5 7M8 1c0 0 2.5 3 2.5 7S8 15 8 15M1.5 8h13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span>{localeCodes[locale]}</span>
                  <svg
                    className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {langOpen && (
                  <div
                    className="absolute top-full mt-1.5 right-0 w-40 bg-white border border-slate-100 rounded-lg shadow-lg overflow-hidden z-50"
                    role="listbox"
                    aria-label="Select language"
                  >
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        role="option"
                        aria-selected={loc === locale}
                        onClick={() => handleLocaleChange(loc)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors duration-150 ${
                          loc === locale
                            ? 'bg-navy-50 text-navy-900 font-semibold'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-navy-900'
                        }`}
                      >
                        <span>{localeNames[loc]}</span>
                        <span className="text-xs font-mono text-slate-400">{localeCodes[loc]}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA — Desktop */}
              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-semibold bg-navy-900 text-white hover:bg-gold-500 hover:text-navy-900 transition-all duration-200"
              >
                {t('contact')}
              </Link>

              {/* Hamburger — Mobile */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                className="lg:hidden flex flex-col items-center justify-center w-9 h-9 gap-1.5 rounded-md hover:bg-slate-100 transition-colors duration-200"
              >
                <span
                  className={`block w-5 h-px bg-navy-900 transition-all duration-300 ${
                    mobileOpen ? 'rotate-45 translate-y-[7px]' : ''
                  }`}
                />
                <span
                  className={`block w-5 h-px bg-navy-900 transition-all duration-300 ${
                    mobileOpen ? 'opacity-0 scale-x-0' : ''
                  }`}
                />
                <span
                  className={`block w-5 h-px bg-navy-900 transition-all duration-300 ${
                    mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-navy-950/40 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Slide-in Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-slate-100">
            <span className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-md bg-navy-900 text-white font-bold text-xs tracking-widest">
                MB
              </span>
              <span className="text-navy-900 font-semibold text-sm tracking-wider">Boussardi</span>
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-500 transition-colors duration-200"
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-navy-50 hover:text-navy-900 font-medium text-sm transition-colors duration-200"
              >
                <span className="w-1 h-1 rounded-full bg-gold-500 shrink-0" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile Language Switcher */}
          <div className="px-4 pb-4 border-t border-slate-100 pt-4">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Language</p>
            <div className="grid grid-cols-2 gap-2">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium border transition-all duration-150 ${
                    loc === locale
                      ? 'bg-navy-900 text-white border-navy-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-navy-300 hover:text-navy-900'
                  }`}
                >
                  <span className="font-mono text-xs">{localeCodes[loc]}</span>
                  <span className="truncate text-xs">{localeNames[loc]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="px-4 pb-6">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full py-3 rounded-lg bg-navy-900 text-white font-semibold text-sm hover:bg-gold-500 hover:text-navy-900 transition-all duration-200"
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
