
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useContactForm } from "@/hooks/useContactForm";

export default function ContactForm() {
  const { 
    formData, 
    isSubmitting, 
    formStatus, 
    handleChange, 
    handleSubmit 
  } = useContactForm();
  const { t } = useTranslation();
  
  const formItemAnimation = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 70, damping: 10 }
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6" 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }}
    >
      {formStatus.type && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Alert variant={formStatus.type === "error" ? "destructive" : "default"} className={
            formStatus.type === "success" ? "border-green-500 bg-green-50 dark:bg-green-950/50 text-green-800 dark:text-green-300" : ""
          }>
            {formStatus.type === "success" ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription>{formStatus.message}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <motion.div variants={formItemAnimation}>
        <label htmlFor="full_name" className="block text-sm font-medium mb-2">
          {t("contact.name")}
        </label>
        <Input
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder={t("contact.name")}
          required
          disabled={isSubmitting}
        />
      </motion.div>
      
      <motion.div variants={formItemAnimation}>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          {t("contact.email")}
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("contact.email")}
          required
          disabled={isSubmitting}
        />
      </motion.div>
      
      <motion.div variants={formItemAnimation}>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {t("contact.message")}
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t("contact.message")}
          rows={5}
          required
          disabled={isSubmitting}
        />
      </motion.div>
      
      <motion.div className="flex space-x-4" variants={formItemAnimation}>
        <Button 
          type="submit" 
          className="flex-grow"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("contact.sending") : t("contact.send")}
        </Button>
        
        <Button variant="outline" className="flex-none" asChild>
          <a href="/public/Mohammed_Boussardi_CV.pdf" download>
            <Download className="mr-2 h-4 w-4" />
            {t("contact.downloadResume")}
          </a>
        </Button>
      </motion.div>
    </motion.form>
  );
}
