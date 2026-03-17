import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { isRtl } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/app/globals.css';

const BASE_URL = 'https://mboussardi.ma';

const seoData: Record<string, { title: string; description: string; keywords: string }> = {
  fr: {
    title: 'Mohammed Boussardi — Consultant Enterprise & Oracle APEX',
    description: 'Portfolio de Mohammed Boussardi. Consultant Oracle APEX, SIRH, GTA et transformation digitale basé au Maroc. Spécialiste Chronotime, Oracle EBS et applications d\'entreprise.',
    keywords: 'Mohammed Boussardi, Oracle APEX, consultant, SIRH, GTA, Chronotime, Oracle EBS, Maroc, Casablanca, Mohammedia, transformation digitale, applications entreprise, mboussardi.ma',
  },
  en: {
    title: 'Mohammed Boussardi — Enterprise & Oracle APEX Consultant',
    description: 'Portfolio of Mohammed Boussardi. Oracle APEX, HRIS, Workforce Management consultant and digital transformation specialist based in Morocco. Expert in Chronotime, Oracle EBS and enterprise applications.',
    keywords: 'Mohammed Boussardi, Oracle APEX, consultant, HRIS, WFM, Chronotime, Oracle EBS, Morocco, Casablanca, digital transformation, enterprise applications, mboussardi.ma',
  },
  es: {
    title: 'Mohammed Boussardi — Consultor Enterprise & Oracle APEX',
    description: 'Portafolio de Mohammed Boussardi. Consultor Oracle APEX, SIRH, gestión del tiempo y transformación digital en Marruecos. Especialista en Chronotime, Oracle EBS y aplicaciones empresariales.',
    keywords: 'Mohammed Boussardi, Oracle APEX, consultor, SIRH, GTA, Chronotime, Oracle EBS, Marruecos, Casablanca, transformación digital, aplicaciones empresariales, mboussardi.ma',
  },
  ar: {
    title: 'محمد بوصاردي — مستشار تطبيقات المؤسسات و Oracle APEX',
    description: 'الملف المهني لمحمد بوصاردي. مستشار Oracle APEX، أنظمة الموارد البشرية، إدارة الوقت والرقمنة المؤسسية. مقيم بالمغرب. متخصص في Chronotime و Oracle EBS وتطبيقات المؤسسات.',
    keywords: 'محمد بوصاردي, Mohammed Boussardi, Oracle APEX, مستشار, أنظمة الموارد البشرية, إدارة الوقت, Chronotime, Oracle EBS, المغرب, الدار البيضاء, المحمدية, mboussardi.ma',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const seo = seoData[locale] || seoData.fr;
  const url = `${BASE_URL}/${locale}`;

  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    alternates[loc] = `${BASE_URL}/${loc}`;
  }

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'Mohammed Boussardi', url: BASE_URL }],
    creator: 'Mohammed Boussardi',
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages: alternates,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_MA' : locale === 'fr' ? 'fr_MA' : locale === 'es' ? 'es_ES' : 'en_US',
      url,
      title: seo.title,
      description: seo.description,
      siteName: 'Mohammed Boussardi — Portfolio',
      images: [
        {
          url: `${BASE_URL}/images/profile.jpg`,
          width: 600,
          height: 600,
          alt: 'Mohammed Boussardi',
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: seo.title,
      description: seo.description,
      images: [`${BASE_URL}/images/profile.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
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
    jobTitle: locale === 'fr' ? 'Consultant Applications d\'Entreprise' : locale === 'es' ? 'Consultor de Aplicaciones Empresariales' : locale === 'ar' ? 'مستشار تطبيقات المؤسسات' : 'Enterprise Applications Consultant',
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
      'https://www.linkedin.com/in/mboussardi',
    ],
    knowsAbout: ['Oracle APEX', 'PL/SQL', 'HRIS', 'Chronotime', 'Oracle EBS', 'Digital Transformation', 'Workforce Management'],
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
