'use client';

import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading label={t('sectionTitle')} title={t('title')} description={t('description')} />
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <AnimatedSection delay={0.1}>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact info */}
              <div className="space-y-6">
                <a href="mailto:mail.mboussardi@gmail.com" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-navy-200 hover:shadow-sm transition-all duration-200">
                  <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Email</p>
                    <p className="text-navy-900 font-medium text-sm">mail.mboussardi@gmail.com</p>
                  </div>
                </a>

                <a href="tel:+212602665248" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-navy-200 hover:shadow-sm transition-all duration-200">
                  <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Phone</p>
                    <p className="text-navy-900 font-medium text-sm">+212 602 665 248</p>
                  </div>
                </a>

                <a href="https://linkedin.com/in/mohammed-boussardi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-navy-200 hover:shadow-sm transition-all duration-200">
                  <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">LinkedIn</p>
                    <p className="text-navy-900 font-medium text-sm">{t('linkedin')}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Location</p>
                    <p className="text-navy-900 font-medium text-sm">Mohammedia, Casablanca, Morocco</p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-green-800 font-medium text-sm">{t('availability')}</p>
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <div className="bg-white p-8 rounded-xl border border-slate-100">
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{t('formName')}</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{t('formEmail')}</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{t('formSubject')}</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{t('formMessage')}</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400 transition-colors resize-none" />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3.5 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors duration-300"
                  >
                    {t('formSend')}
                  </button>
                </form>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
