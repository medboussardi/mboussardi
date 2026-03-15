'use client';

import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';

export default function SkillsPage() {
  const t = useTranslations('skills');
  const categories = t.raw('categories') as Array<{
    title: string;
    items: string[];
  }>;

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading label={t('sectionTitle')} title={t('title')} />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow duration-300 h-full">
                <h3 className="font-bold text-navy-900 mb-6 text-lg">{cat.title}</h3>
                <div className="space-y-3">
                  {cat.items.map((item, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-navy-200 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-gold-500 flex-shrink-0" />
                      <span className="text-sm text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
