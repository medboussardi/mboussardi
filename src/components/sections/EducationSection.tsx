'use client';

import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';

const schoolLogos: Record<string, string> = {
  'ISGA School of Engineering': '/images/logos/isga.png',
  'ISGA': '/images/logos/isga.png',
  'École Supérieure de Technologie de Safi': '/images/logos/ests.png',
  'المدرسة العليا للتكنولوجيا بآسفي': '/images/logos/ests.png',
};

function getSchoolLogo(school: string): string | null {
  if (schoolLogos[school]) return schoolLogos[school];
  for (const key of Object.keys(schoolLogos)) {
    if (
      school.toLowerCase().includes(key.toLowerCase()) ||
      key.toLowerCase().includes(school.toLowerCase())
    ) {
      return schoolLogos[key];
    }
  }
  return null;
}

export default function EducationSection() {
  const t = useTranslations('education');
  const items = t.raw('items') as Array<{
    degree: string;
    school: string;
    location: string;
    period: string;
    status?: string;
    description: string;
  }>;

  return (
    <section id="education" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading label={t('sectionTitle')} title={t('title')} />
        </AnimatedSection>

        <div className="max-w-3xl mx-auto space-y-6">
          {items.map((item, i) => {
            const logo = getSchoolLogo(item.school);
            return (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="flex gap-6 p-6 rounded-xl border border-slate-100 bg-white hover:shadow-md transition-shadow duration-300">
                  {/* Logo or fallback icon */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-navy-50 to-navy-100 flex items-center justify-center overflow-hidden">
                    {logo ? (
                      <img
                        src={logo}
                        alt={item.school}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <svg className="w-6 h-6 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                      <h3 className="font-bold text-navy-900 text-lg leading-snug">{item.degree}</h3>
                      {item.status && (
                        <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium whitespace-nowrap flex-shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          {item.status}
                        </span>
                      )}
                    </div>
                    <p className="text-navy-600 font-medium text-sm">{item.school}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 mb-3">
                      <span>{item.period}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span>{item.location}</span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
