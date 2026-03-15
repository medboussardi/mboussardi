'use client';

import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ProjectsSection() {
  const t = useTranslations('projects');
  const items = t.raw('items') as Array<{
    title: string;
    context: string;
    role: string;
    challenge: string;
    contribution: string;
    tools: string;
    impact: string;
  }>;

  return (
    <section id="projects" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading label={t('sectionTitle')} title={t('title')} />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-white rounded-xl border border-slate-100 p-8 hover:shadow-lg hover:shadow-navy-100/30 transition-all duration-300 h-full flex flex-col">
                <div className="mb-4">
                  <span className="text-xs font-semibold text-gold-600 uppercase tracking-wider">{item.context}</span>
                  <h3 className="text-xl font-bold text-navy-900 mt-2">{item.title}</h3>
                  <p className="text-sm text-navy-600 font-medium mt-1">{item.role}</p>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Challenge</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Contribution</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.contribution}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Impact</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{item.impact}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-2">
                    {item.tools.split(', ').map((tool, j) => (
                      <span key={j} className="text-xs px-2.5 py-1 bg-navy-50 text-navy-600 rounded-md font-medium">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
