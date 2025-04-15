import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ContactForm from "@/components/contact/ContactForm";
import SocialLinks from "@/components/contact/SocialLinks";
import { containerAnimation, itemAnimation, imageAnimation, floatingAnimation } from "@/utils/animations";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-secondary/50 dark:bg-secondary/20" id="contact">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerAnimation}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold gradient-heading mb-4"
            variants={itemAnimation}
          >
            {t("contact.title")}
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={itemAnimation}
          >
            {t("contact.subtitle")}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerAnimation}
          >
            <ContactForm />
            <SocialLinks />
          </motion.div>
          
          <motion.div 
            className="flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageAnimation}
          >
            <motion.div className="relative -mt-12">
              <img 
                src="/lovable-uploads/39ff2eef-2f88-437f-9979-4a66dc11f78d.png" 
                alt="Contact illustration" 
                className="w-full max-w-lg rounded-3xl shadow-lg"
                style={{ borderRadius: "24px" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
