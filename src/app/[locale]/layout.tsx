import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { isRtl } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import type { Metadata } from 'next';
import HtmlLangSetter from '@/components/ui/HtmlLangSetter';
import { buildMetadata, BASE_URL } from '@/lib/seo';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata('home', locale);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = isRtl(locale as Locale) ? 'rtl' : 'ltr';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohammed Boussardi',
    alternateName: 'محمد بوصاردي',
    jobTitle: locale === 'fr' ? 'Consultant Applications d\'Entreprise & Oracle APEX' : locale === 'es' ? 'Consultor de Aplicaciones Empresariales & Oracle APEX' : locale === 'ar' ? 'مستشار تطبيقات المؤسسات و Oracle APEX' : 'Enterprise Applications & Oracle APEX Consultant',
    url: `${BASE_URL}/${locale}`,
    image: `${BASE_URL}/images/profile.jpg`,
    email: 'mail.mboussardi@gmail.com',
    telephone: '+212602665248',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mohammedia',
      addressRegion: 'Casablanca-Settat',
      addressCountry: 'MA',
    },
    sameAs: [
      'https://www.linkedin.com/in/mohammed-boussardi',
    ],
    knowsAbout: [
      'Oracle APEX',
      'PL/SQL',
      'Oracle EBS',
      'HRIS',
      'SIRH',
      'Chronotime',
      'Workforce Management',
      'Digital Transformation',
      'JavaScript',
      'Python',
      'SQL',
      'REST API',
      'Project Coordination',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Inetum',
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'ISGA School of Engineering',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'École Supérieure de Technologie de Safi',
      },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Oracle APEX Developer',
        credentialCategory: 'certification',
        recognizedBy: { '@type': 'Organization', name: 'Oracle' },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Oracle PL/SQL Developer Certified',
        credentialCategory: 'certification',
        recognizedBy: { '@type': 'Organization', name: 'Oracle' },
      },
    ],
  };

  return (
    <>
      <HtmlLangSetter locale={locale} dir={dir} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </>
  );
}
