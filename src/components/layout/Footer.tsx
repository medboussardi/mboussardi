'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/config';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;
  const isRtl = locale === 'ar';
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '/', label: tNav('home') },
    { href: '/experience', label: tNav('experience') },
    { href: '/skills', label: tNav('skills') },
    { href: '/certifications', label: tNav('certifications') },
    { href: '/contact', label: tNav('contact') },
  ] as const;

  return (
    <footer
      className="bg-navy-900 text-white"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Gold top border accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">

          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            {/* Logo mark */}
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white font-bold text-sm tracking-widest border border-white/10">
                MB
              </span>
              <span className="text-white font-semibold text-sm tracking-wider">
                {t('brand')}
              </span>
            </div>

            {/* Tagline */}
            <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
              {t('tagline')}
            </p>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-gold-400 text-xs font-medium tracking-wide">
                Available for engagements
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-3.5 h-px bg-slate-600 group-hover:bg-gold-500 group-hover:w-5 transition-all duration-200 shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              {t('connectTitle')}
            </h3>
            <ul className="space-y-3">
              {/* LinkedIn */}
              <li>
                <a
                  href="https://linkedin.com/in/mohammed-boussardi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors duration-200"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-md bg-white/5 border border-white/10 group-hover:bg-gold-500/20 group-hover:border-gold-500/40 transition-all duration-200 shrink-0">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                  </span>
                  <span>LinkedIn</span>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:mail.mboussardi@gmail.com"
                  className="group flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors duration-200"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-md bg-white/5 border border-white/10 group-hover:bg-gold-500/20 group-hover:border-gold-500/40 transition-all duration-200 shrink-0">
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                      <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M1.5 3.5L8 9l6.5-5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span>mail.mboussardi@gmail.com</span>
                </a>
              </li>

              {/* Phone */}
              <li>
                <a
                  href="tel:+212602665248"
                  className="group flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors duration-200"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-md bg-white/5 border border-white/10 group-hover:bg-gold-500/20 group-hover:border-gold-500/40 transition-all duration-200 shrink-0">
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </span>
                  <span>+212 602 665 248</span>
                </a>
              </li>

              {/* Location */}
              <li>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="flex items-center justify-center w-8 h-8 rounded-md bg-white/5 border border-white/10 shrink-0">
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                      <path d="M8 1.5a4.5 4.5 0 0 1 4.5 4.5c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5z" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </span>
                  <span>Mohammedia, Casablanca, Morocco</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 lg:mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            &copy; {currentYear} Mohammed Boussardi. {t('rights')}
          </p>
          <p className="text-slate-600 text-xs">
            Crafted with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
