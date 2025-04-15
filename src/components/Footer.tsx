
import { ThemeToggle } from "@/components/ThemeToggle";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 70, damping: 10 }
    }
  };

  return (
    <motion.footer 
      className="py-10 bg-card border-t border-border"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      <div className="container px-4 mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-6"
          variants={container}
        >
          <motion.div 
            className="text-center md:text-left"
            variants={item}
          >
            <p className="text-lg font-bold gradient-heading mb-2">Mohamme​d Boussardi</p>
            <p className="text-muted-foreground text-sm max-w-md">
              {t("footer.quote")} <span className="text-xs italic">{t("footer.author")}</span>
            </p>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4"
            variants={item}
          >
            <a 
              href="https://github.com/medboussardi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com/in/mohammed-boussardi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="mailto:contact@boussardi.dev"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a 
              href="https://www.fiverr.com/s/akEDmPg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fiverr"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
            <ThemeToggle />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground"
          variants={item}
        >
          <p>&copy; {currentYear} Mohamme​d Boussardi. {t("footer.rights")}</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
