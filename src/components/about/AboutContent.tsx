
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { containerAnimation, itemAnimation } from "@/utils/animations";

export default function AboutContent() {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="w-full md:w-1/2 space-y-6 text-center md:text-left"
      variants={containerAnimation}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-bold gradient-heading"
        variants={itemAnimation}
      >
        {t("about.title")}
      </motion.h2>
      
      <motion.p 
        className="text-lg"
        variants={itemAnimation}
      >
        {t("about.paragraph1")}
      </motion.p>
      
      <motion.p 
        className="text-lg"
        variants={itemAnimation}
      >
        {t("about.paragraph2")}
      </motion.p>
      
      <motion.p 
        className="text-lg"
        variants={itemAnimation}
      >
        {t("about.paragraph3")}
      </motion.p>
    </motion.div>
  );
}
