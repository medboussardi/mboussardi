'use client';

import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading label={t('sectionTitle')} title={t('title')} />
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <AnimatedSection delay={0.1}>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <p className="text-slate-600 text-lg leading-relaxed">{t('paragraph1')}</p>
                <p className="text-slate-600 text-lg leading-relaxed">{t('paragraph2')}</p>
                <p className="text-slate-600 text-lg leading-relaxed">{t('paragraph3')}</p>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-3xl font-bold text-navy-900 mb-1">4+</div>
                  <div className="text-sm text-slate-500">Years of professional experience</div>
                </div>
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-3xl font-bold text-navy-900 mb-1">10+</div>
                  <div className="text-sm text-slate-500">Enterprise projects delivered</div>
                </div>
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-3xl font-bold text-navy-900 mb-1">4</div>
                  <div className="text-sm text-slate-500">Languages spoken</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
