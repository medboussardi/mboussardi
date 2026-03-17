import type { Metadata } from 'next';

export const BASE_URL = 'https://mboussardi.ma';

type PageSeo = {
  title: string;
  description: string;
  keywords: string;
};

type PageKey = 'home' | 'experience' | 'skills' | 'certifications' | 'contact';

const pageSeo: Record<PageKey, Record<string, PageSeo>> = {
  home: {
    fr: {
      title: 'Mohammed Boussardi — Consultant Enterprise & Oracle APEX | SIRH & GTA au Maroc',
      description: 'Portfolio de Mohammed Boussardi, consultant Oracle APEX et SIRH basé au Maroc. Spécialiste Chronotime, Oracle EBS, gestion des temps et activités (GTA), et transformation digitale des processus métiers.',
      keywords: 'Mohammed Boussardi, Oracle APEX, consultant, SIRH, HRIS, GTA, Chronotime, Oracle EBS, Maroc, Casablanca, Mohammedia, transformation digitale, applications entreprise, PL/SQL, mboussardi.ma',
    },
    en: {
      title: 'Mohammed Boussardi — Enterprise & Oracle APEX Consultant | HRIS & WFM in Morocco',
      description: 'Portfolio of Mohammed Boussardi, Oracle APEX and HRIS consultant based in Morocco. Expert in Chronotime, Oracle EBS, workforce management (WFM), and enterprise digital transformation.',
      keywords: 'Mohammed Boussardi, Oracle APEX, consultant, HRIS, SIRH, WFM, Chronotime, Oracle EBS, Morocco, Casablanca, Mohammedia, digital transformation, enterprise applications, PL/SQL, mboussardi.ma',
    },
    es: {
      title: 'Mohammed Boussardi — Consultor Enterprise & Oracle APEX | SIRH & Gestión del Tiempo',
      description: 'Portafolio de Mohammed Boussardi, consultor Oracle APEX y SIRH en Marruecos. Especialista en Chronotime, Oracle EBS, gestión del tiempo y transformación digital empresarial.',
      keywords: 'Mohammed Boussardi, Oracle APEX, consultor, SIRH, GTA, Chronotime, Oracle EBS, Marruecos, Casablanca, transformación digital, aplicaciones empresariales, PL/SQL, mboussardi.ma',
    },
    ar: {
      title: 'محمد بوصاردي — مستشار تطبيقات المؤسسات و Oracle APEX | أنظمة الموارد البشرية وإدارة الوقت',
      description: 'الملف المهني لمحمد بوصاردي، مستشار Oracle APEX وأنظمة الموارد البشرية بالمغرب. متخصص في Chronotime و Oracle EBS وإدارة الوقت والأنشطة والتحول الرقمي المؤسسي.',
      keywords: 'محمد بوصاردي, Mohammed Boussardi, Oracle APEX, مستشار, أنظمة الموارد البشرية, SIRH, HRIS, إدارة الوقت, Chronotime, Oracle EBS, المغرب, الدار البيضاء, المحمدية, PL/SQL, mboussardi.ma',
    },
  },
  experience: {
    fr: {
      title: 'Parcours Professionnel — Mohammed Boussardi | Inetum, Popay, Bank Al-Maghrib',
      description: 'Expérience professionnelle de Mohammed Boussardi : consultant SIRH chez Inetum, développeur Oracle APEX chez Popay Maroc, mission Bank Al-Maghrib. Chronotime, Oracle EBS, PL/SQL.',
      keywords: 'Mohammed Boussardi, expérience, Inetum, Popay Maroc, Bank Al-Maghrib, Oracle APEX, SIRH, Chronotime, GTA, PL/SQL, Oracle EBS, consultant Maroc',
    },
    en: {
      title: 'Professional Experience — Mohammed Boussardi | Inetum, Popay, Bank Al-Maghrib',
      description: 'Career history of Mohammed Boussardi: HRIS consultant at Inetum, Oracle APEX developer at Popay Maroc, Bank Al-Maghrib mission. Chronotime configuration, Oracle EBS integration, PL/SQL development.',
      keywords: 'Mohammed Boussardi, experience, Inetum, Popay Maroc, Bank Al-Maghrib, Oracle APEX, HRIS, Chronotime, WFM, PL/SQL, Oracle EBS, consultant Morocco',
    },
    es: {
      title: 'Experiencia Profesional — Mohammed Boussardi | Inetum, Popay, Bank Al-Maghrib',
      description: 'Trayectoria profesional de Mohammed Boussardi: consultor SIRH en Inetum, desarrollador Oracle APEX en Popay Maroc, misión Bank Al-Maghrib. Chronotime, Oracle EBS, PL/SQL.',
      keywords: 'Mohammed Boussardi, experiencia, Inetum, Popay Maroc, Bank Al-Maghrib, Oracle APEX, SIRH, Chronotime, PL/SQL, Oracle EBS, consultor Marruecos',
    },
    ar: {
      title: 'المسار المهني — محمد بوصاردي | Inetum، Popay، بنك المغرب',
      description: 'المسار المهني لمحمد بوصاردي: مستشار أنظمة الموارد البشرية في Inetum، مطور Oracle APEX في Popay، مهمة بنك المغرب. Chronotime، Oracle EBS، PL/SQL.',
      keywords: 'محمد بوصاردي, Mohammed Boussardi, مسار مهني, Inetum, Popay, بنك المغرب, Oracle APEX, أنظمة الموارد البشرية, Chronotime, Oracle EBS',
    },
  },
  skills: {
    fr: {
      title: 'Compétences Techniques — Mohammed Boussardi | Oracle APEX, PL/SQL, SIRH, Chronotime',
      description: 'Stack technique de Mohammed Boussardi : Oracle APEX, PL/SQL, Oracle EBS, Chronotime, JavaScript, Python, REST API, CI/CD. Compétences fonctionnelles SIRH et gestion des temps.',
      keywords: 'Mohammed Boussardi, compétences, Oracle APEX, PL/SQL, SIRH, HRIS, Chronotime, Oracle EBS, JavaScript, Python, SQL, REST API, Agile, consultant technique Maroc',
    },
    en: {
      title: 'Technical Skills — Mohammed Boussardi | Oracle APEX, PL/SQL, HRIS, Chronotime',
      description: 'Technical stack of Mohammed Boussardi: Oracle APEX, PL/SQL, Oracle EBS, Chronotime, JavaScript, Python, REST API, CI/CD. Functional expertise in HRIS and workforce management.',
      keywords: 'Mohammed Boussardi, skills, Oracle APEX, PL/SQL, HRIS, SIRH, Chronotime, Oracle EBS, JavaScript, Python, SQL, REST API, Agile, technical consultant Morocco',
    },
    es: {
      title: 'Competencias Técnicas — Mohammed Boussardi | Oracle APEX, PL/SQL, SIRH, Chronotime',
      description: 'Stack técnico de Mohammed Boussardi: Oracle APEX, PL/SQL, Oracle EBS, Chronotime, JavaScript, Python, REST API, CI/CD. Competencias funcionales SIRH y gestión del tiempo.',
      keywords: 'Mohammed Boussardi, competencias, Oracle APEX, PL/SQL, SIRH, Chronotime, Oracle EBS, JavaScript, Python, SQL, REST API, Agile, consultor técnico Marruecos',
    },
    ar: {
      title: 'المهارات التقنية — محمد بوصاردي | Oracle APEX، PL/SQL، أنظمة الموارد البشرية',
      description: 'المنظومة التقنية لمحمد بوصاردي: Oracle APEX، PL/SQL، Oracle EBS، Chronotime، JavaScript، Python، REST API. كفاءات وظيفية في أنظمة الموارد البشرية وإدارة الوقت.',
      keywords: 'محمد بوصاردي, Mohammed Boussardi, مهارات, Oracle APEX, PL/SQL, أنظمة الموارد البشرية, Chronotime, Oracle EBS, JavaScript, Python',
    },
  },
  certifications: {
    fr: {
      title: 'Certifications — Mohammed Boussardi | Oracle APEX, PL/SQL, JavaScript, Python',
      description: 'Certifications professionnelles de Mohammed Boussardi : Oracle APEX Developer, Oracle PL/SQL Developer, JavaScript Algorithms (freeCodeCamp), Python for Data Science (IBM).',
      keywords: 'Mohammed Boussardi, certifications, Oracle APEX Developer, Oracle PL/SQL, JavaScript, Python, freeCodeCamp, IBM, consultant certifié',
    },
    en: {
      title: 'Certifications — Mohammed Boussardi | Oracle APEX, PL/SQL, JavaScript, Python',
      description: 'Professional certifications of Mohammed Boussardi: Oracle APEX Developer, Oracle PL/SQL Developer Certified, JavaScript Algorithms (freeCodeCamp), Python for Data Science (IBM).',
      keywords: 'Mohammed Boussardi, certifications, Oracle APEX Developer, Oracle PL/SQL, JavaScript, Python, freeCodeCamp, IBM, certified consultant',
    },
    es: {
      title: 'Certificaciones — Mohammed Boussardi | Oracle APEX, PL/SQL, JavaScript, Python',
      description: 'Certificaciones profesionales de Mohammed Boussardi: Oracle APEX Developer, Oracle PL/SQL Developer, JavaScript Algorithms (freeCodeCamp), Python for Data Science (IBM).',
      keywords: 'Mohammed Boussardi, certificaciones, Oracle APEX Developer, Oracle PL/SQL, JavaScript, Python, freeCodeCamp, IBM, consultor certificado',
    },
    ar: {
      title: 'الشهادات — محمد بوصاردي | Oracle APEX، PL/SQL، JavaScript، Python',
      description: 'الشهادات المهنية لمحمد بوصاردي: Oracle APEX Developer، Oracle PL/SQL Developer، JavaScript Algorithms (freeCodeCamp)، Python for Data Science (IBM).',
      keywords: 'محمد بوصاردي, Mohammed Boussardi, شهادات, Oracle APEX, Oracle PL/SQL, JavaScript, Python, freeCodeCamp, IBM',
    },
  },
  contact: {
    fr: {
      title: 'Contact — Mohammed Boussardi | Consultant Oracle APEX & SIRH au Maroc',
      description: 'Contactez Mohammed Boussardi pour vos projets Oracle APEX, SIRH, Chronotime et transformation digitale. Disponible pour missions de conseil et développement. Basé à Mohammedia, Maroc.',
      keywords: 'Mohammed Boussardi, contact, consultant Oracle APEX, SIRH, Chronotime, Mohammedia, Casablanca, Maroc, recrutement, freelance',
    },
    en: {
      title: 'Contact — Mohammed Boussardi | Oracle APEX & HRIS Consultant in Morocco',
      description: 'Contact Mohammed Boussardi for Oracle APEX, HRIS, Chronotime and digital transformation projects. Available for consulting and development engagements. Based in Mohammedia, Morocco.',
      keywords: 'Mohammed Boussardi, contact, Oracle APEX consultant, HRIS, Chronotime, Mohammedia, Casablanca, Morocco, hire, freelance',
    },
    es: {
      title: 'Contacto — Mohammed Boussardi | Consultor Oracle APEX & SIRH en Marruecos',
      description: 'Contacta con Mohammed Boussardi para proyectos Oracle APEX, SIRH, Chronotime y transformación digital. Disponible para consultoría y desarrollo. Basado en Mohammedia, Marruecos.',
      keywords: 'Mohammed Boussardi, contacto, consultor Oracle APEX, SIRH, Chronotime, Mohammedia, Casablanca, Marruecos, contratar, freelance',
    },
    ar: {
      title: 'التواصل — محمد بوصاردي | مستشار Oracle APEX وأنظمة الموارد البشرية بالمغرب',
      description: 'تواصل مع محمد بوصاردي لمشاريع Oracle APEX وأنظمة الموارد البشرية و Chronotime والتحول الرقمي. متاح لمهام الاستشارات والتطوير. مقيم بالمحمدية، المغرب.',
      keywords: 'محمد بوصاردي, Mohammed Boussardi, تواصل, مستشار Oracle APEX, أنظمة الموارد البشرية, Chronotime, المحمدية, الدار البيضاء, المغرب',
    },
  },
};

export function getPageSeo(page: PageKey, locale: string): PageSeo {
  return pageSeo[page]?.[locale] || pageSeo[page]?.fr || pageSeo.home.fr;
}

export function buildMetadata(page: PageKey, locale: string, path: string = ''): Metadata {
  const seo = getPageSeo(page, locale);
  const url = `${BASE_URL}/${locale}${path ? `/${path}` : ''}`;

  const alternates: Record<string, string> = {};
  for (const loc of ['fr', 'en', 'es', 'ar']) {
    alternates[loc] = `${BASE_URL}/${loc}${path ? `/${path}` : ''}`;
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
      googleBot: { index: true, follow: true },
    },
  };
}
