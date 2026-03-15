'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';

const companyLogos: Record<string, string> = {
  'Inetum': '/images/logos/inetum.jpeg',
  'Popay Maroc': '/images/logos/popay.svg',
  'Popay': '/images/logos/popay.svg',
  'Mission — Bank Al-Maghrib': '/images/logos/bank-al-maghrib.png',
  'Misión — Bank Al-Maghrib': '/images/logos/bank-al-maghrib.png',
  'مهمة — بنك المغرب': '/images/logos/bank-al-maghrib.png',
  'Sonasid': '/images/logos/sonasid.png',
  'صوناسيد': '/images/logos/sonasid.png',
  'Classgap': '/images/logos/classgap.jpeg',
};

function getCompanyLogo(company: string): string | null {
  if (companyLogos[company]) return companyLogos[company];
  for (const key of Object.keys(companyLogos)) {
    if (company.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(company.toLowerCase())) {
      return companyLogos[key];
    }
  }
  return null;
}

export default function ExperienceSection() {
  const t = useTranslations('experience');
  const roles = t.raw('roles') as Array<{
    company: string;
    title: string;
    period: string;
    location: string;
    description: string;
    tags: string[];
  }>;

  return (
    <section id="experience" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading label={t('sectionTitle')} title={t('title')} />
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 start-[18px] md:start-1/2 w-px bg-navy-200 -translate-x-1/2" />

            {roles.map((role, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={`relative flex flex-col md:flex-row gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline dot */}
                  <div className="absolute start-[18px] md:start-1/2 w-3 h-3 bg-gold-500 rounded-full -translate-x-1/2 mt-2 ring-4 ring-white z-10" />

                  {/* Content card */}
                  <div className={`ms-12 md:ms-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:me-auto' : 'md:ms-auto'}`}>
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-navy-900 text-lg">{role.company}</h3>
                          <p className="text-navy-700 font-medium text-sm">{role.title}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 ms-3 overflow-hidden">
                          {getCompanyLogo(role.company) ? (
                            <img
                              src={getCompanyLogo(role.company)!}
                              alt={role.company}
                              className="w-full h-full object-contain p-1"
                            />
                          ) : (
                            <span className="text-xs font-bold text-navy-400">{role.company.charAt(0)}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                        <span>{role.period}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span>{role.location}</span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4">{role.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {role.tags.map((tag, j) => (
                          <span key={j} className="text-xs px-2.5 py-1 bg-navy-50 text-navy-600 rounded-md font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="text-center mt-8">
              <Link
                href="/experience"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-navy-900 border border-navy-200 rounded-lg hover:bg-navy-50 transition-colors"
              >
                {t('viewAll')}
                <svg className="w-4 h-4 ms-2 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
