'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';

export default function SkillsSection() {
  const t = useTranslations('skills');
  const categories = t.raw('categories') as Array<{
    title: string;
    items: string[];
  }>;

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading label={t('sectionTitle')} title={t('title')} />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="p-6 rounded-xl border border-slate-100 bg-white hover:border-navy-200 transition-colors duration-300">
                <h3 className="font-bold text-navy-900 mb-4 text-sm uppercase tracking-wider">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, j) => (
                    <span
                      key={j}
                      className="text-sm px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg border border-slate-100 hover:border-navy-200 hover:text-navy-700 transition-colors duration-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="text-center mt-12">
            <Link
              href="/skills"
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
