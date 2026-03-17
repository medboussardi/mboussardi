'use client';

import { useTranslations } from 'next-intl';
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

export default function ExperienceClient() {
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
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading label={t('sectionTitle')} title={t('title')} />
        </AnimatedSection>

        <div className="space-y-8">
          {roles.map((role, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <article className="bg-white rounded-2xl border border-slate-100 p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-navy-50 to-navy-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {getCompanyLogo(role.company) ? (
                      <img src={getCompanyLogo(role.company)!} alt={role.company} className="w-full h-full object-contain p-2" />
                    ) : (
                      <span className="text-xl font-bold text-navy-600">{role.company.charAt(0)}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h2 className="text-xl font-bold text-navy-900">{role.company}</h2>
                        <p className="text-navy-700 font-medium">{role.title}</p>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-400 mt-2 md:mt-0">
                        <time>{role.period}</time>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span>{role.location}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed mb-6">{role.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {role.tags.map((tag, j) => (
                        <span key={j} className="text-xs px-3 py-1.5 bg-navy-50 text-navy-600 rounded-md font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
