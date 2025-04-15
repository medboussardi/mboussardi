import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X, Download } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle body scroll locking when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navItems = [
    { label: t("header.about"), href: "#about" },
    { label: t("header.skills"), href: "#skills" },
    { label: t("header.projects"), href: "#projects" },
    { label: t("header.testimonials"), href: "#testimonials" },
    { label: t("header.contact"), href: "#contact" },
  ];

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  const menuVariants = {
    closed: { 
      opacity: 0, 
      y: "-100%",
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      } 
    },
    open: { 
      opacity: 1, 
      y: "0%",
      transition: { 
        duration: 0.3, 
        ease: "easeInOut",
        staggerChildren: 0.07,
        delayChildren: 0.1
      } 
    }
  };

  const menuItemVariants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1 }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="text-xl font-bold gradient-heading">
          MB<span className="text-accent hidden md:inline">.dev</span>
        </a>

        {isMobile ? (
          <>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? <X /> : <Menu />}
              </Button>
            </div>
            
            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={menuVariants}
                  className="fixed inset-0 top-16 bg-background z-40 flex flex-col overflow-hidden"
                >
                  <nav className="flex flex-col gap-4 p-4 h-full">
                    {navItems.map((item) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        className="text-lg py-4 border-b border-border hover:text-primary transition-colors"
                        onClick={() => setMenuOpen(false)}
                        variants={menuItemVariants}
                      >
                        {item.label}
                      </motion.a>
                    ))}
                    <div className="mt-auto flex flex-col gap-4 py-4">
                      <motion.div variants={menuItemVariants}>
                        <Button className="w-full" asChild>
                          <a href="#contact" onClick={() => setMenuOpen(false)}>
                            {t("header.hireMe")}
                          </a>
                        </Button>
                      </motion.div>
                      <motion.div variants={menuItemVariants}>
                        <Button variant="outline" className="w-full" asChild>
                          <a href="/Mohammed_Boussardi_CV.pdf" download>
                            <Download className="mr-2 h-4 w-4" />
                            {t("hero.downloadResume")}
                          </a>
                        </Button>
                      </motion.div>
                    </div>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="flex items-center gap-6">
            <nav className="flex gap-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <LanguageSwitcher />
            <ThemeToggle />
            <Button asChild>
              <a href="#contact">{t("header.hireMe")}</a>
            </Button>
          </div>
        )}
      </div>
    </motion.header>
  );
}
