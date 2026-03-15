'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';

export default function CertificationsSection() {
  const t = useTranslations('certifications');
  const items = t.raw('items') as Array<{
    name: string;
    issuer: string;
    status: string;
  }>;

  return (
    <section id="certifications" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading label={t('sectionTitle')} title={t('title')} />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {items.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="bg-white p-6 rounded-xl border border-slate-100 hover:border-gold-300 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                {/* Badge placeholder */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-navy-50 to-navy-100 flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="font-bold text-navy-900 text-sm mb-2 flex-1">{item.name}</h3>
                <p className="text-xs text-slate-400 mb-3">{item.issuer}</p>
                <span className="inline-flex self-start text-xs px-2.5 py-1 bg-green-50 text-green-700 rounded-full font-medium">
                  {item.status}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="text-center mt-12">
            <Link
              href="/certifications"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-navy-900 border border-navy-200 rounded-lg hover:bg-navy-50 transition-colors"
            >
              {t('viewAll')}
              <svg className="w-4 h-4 ms-2 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
