
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink, Download } from "lucide-react";
import { containerAnimation, itemAnimation } from "@/utils/animations";

export default function HeroContent() {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="w-full space-y-6 text-center"
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
    >
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight"
        variants={itemAnimation}
      >
        {t("hero.title")} <span className="gradient-heading">{t("hero.subtitle")}</span>
      </motion.h1>
      
      <motion.h2 
        className="text-xl md:text-2xl text-muted-foreground"
        variants={itemAnimation}
      >
        {t("hero.subtitle")}
      </motion.h2>
      
      <motion.p 
        className="text-lg max-w-xl mx-auto"
        variants={itemAnimation}
      >
        {t("hero.description")}
      </motion.p>
      
      <motion.div 
        className="flex gap-4 justify-center"
        variants={itemAnimation}
      >
        <Button variant="outline" size="icon" asChild>
          <a href="https://github.com/medboussardi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a href="https://linkedin.com/in/mohammed-boussardi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a href="mailto:contact@boussardi.dev" aria-label="Email">
            <Mail className="h-5 w-5" />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a href="https://www.fiverr.com/s/akEDmPg" target="_blank" rel="noopener noreferrer" aria-label="Fiverr">
            <ExternalLink className="h-5 w-5" />
          </a>
        </Button>
      </motion.div>
      
      <CallToAction />
    </motion.div>
  );
}

function CallToAction() {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
      variants={itemAnimation}
    >
      <Button className="w-full sm:w-auto" asChild>
        <a href="#contact">{t("hero.hireMe")}</a>
      </Button>
      <Button variant="outline" className="w-full sm:w-auto" asChild>
        <a href="#projects">{t("hero.viewProjects")}</a>
      </Button>
      <Button variant="secondary" className="w-full sm:w-auto" asChild>
        <a href="/public/Mohammed_Boussardi_CV.pdf" download>
          <Download className="mr-2 h-4 w-4" />
          {t("hero.downloadResume")}
        </a>
      </Button>
    </motion.div>
  );
}
