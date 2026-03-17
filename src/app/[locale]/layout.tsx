import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { isRtl } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { buildMetadata, BASE_URL } from '@/lib/seo';
import '@/app/globals.css';

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
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-slate-800 antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
