
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import "../i18n"; // Initialize i18n

const Index = () => {
  const { t, i18n } = useTranslation();

  // Update document title and meta tags when language changes
  useEffect(() => {
    // Set document title
    document.title = t("meta.title");

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("meta.description"));
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", t("meta.keywords"));
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", t("meta.title"));
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", t("meta.description"));
    }

    // Update HTML lang attribute
    document.documentElement.setAttribute("lang", i18n.language);
  }, [t, i18n.language]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Index;
