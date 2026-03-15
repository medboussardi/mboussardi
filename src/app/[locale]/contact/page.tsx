'use client';

import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading label={t('sectionTitle')} title={t('title')} description={t('description')} />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid md:grid-cols-5 gap-8">
            {/* Contact details */}
            <div className="md:col-span-2 space-y-6">
              <a href="mailto:mail.mboussardi@gmail.com" className="flex items-center gap-4 p-5 bg-white rounded-xl border border-slate-100 hover:border-navy-200 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-0.5">Email</p>
                  <p className="text-navy-900 font-medium">{t('email')}</p>
                </div>
              </a>

              <a href="tel:+212602665248" className="flex items-center gap-4 p-5 bg-white rounded-xl border border-slate-100 hover:border-navy-200 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-0.5">Phone</p>
                  <p className="text-navy-900 font-medium">{t('phone')}</p>
                </div>
              </a>

              <a href="https://linkedin.com/in/mohammed-boussardi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 bg-white rounded-xl border border-slate-100 hover:border-navy-200 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-0.5">LinkedIn</p>
                  <p className="text-navy-900 font-medium">{t('linkedin')}</p>
                </div>
              </a>

              <div className="p-5 bg-green-50 rounded-xl border border-green-100">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-green-800 font-medium">{t('availability')}</p>
                </div>
              </div>

              <a
                href="/Mohammed_Boussardi_CV.pdf"
                download
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 border border-navy-200 text-navy-900 text-sm font-medium rounded-lg hover:bg-navy-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                {t('downloadCV')}
              </a>
            </div>

            {/* Contact form */}
            <div className="md:col-span-3 bg-white p-8 rounded-2xl border border-slate-100">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{t('formName')}</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{t('formEmail')}</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{t('formSubject')}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{t('formMessage')}</label>
                  <textarea rows={6} className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400 transition-colors resize-none" />
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
  );
}
