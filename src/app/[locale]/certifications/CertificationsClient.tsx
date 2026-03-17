'use client';

import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';

export default function CertificationsClient() {
  const t = useTranslations('certifications');
  const items = t.raw('items') as Array<{
    name: string;
    issuer: string;
    status: string;
  }>;

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading label={t('sectionTitle')} title={t('title')} />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <article className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-gold-300 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-navy-50 to-navy-100 flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-10 h-10 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>

                <div className="text-center flex-1">
                  <h3 className="font-bold text-navy-900 text-lg mb-2">{item.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{item.issuer}</p>
                </div>

                <div className="text-center">
                  <span className="inline-flex text-sm px-4 py-1.5 bg-green-50 text-green-700 rounded-full font-medium">
                    {item.status}
                  </span>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
