
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContactFormData {
  full_name: string;
  email: string;
  message: string;
}

interface ContactFormState {
  type: "success" | "error" | null;
  message: string | null;
}

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    full_name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<ContactFormState>({ 
    type: null, 
    message: null 
  });
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ full_name: "", email: "", message: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: null });
    
    try {
      // Validate form data
      if (!formData.full_name || !formData.email || !formData.message) {
        throw new Error(t("contact.validation.allFieldsRequired"));
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error(t("contact.validation.invalidEmail"));
      }

      // Submit data to Supabase
      const { error } = await supabase
        .from('messages')
        .insert([formData]);

      if (error) throw error;

      // Success handling
      setFormStatus({ 
        type: "success", 
        message: t("contact.success") 
      });
      
      toast({
        title: t("contact.success"),
        description: t("contact.successMessage"),
      });
      
      // Reset form
      resetForm();
      
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Error handling
      let errorMessage = t("contact.error");
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setFormStatus({ 
        type: "error", 
        message: errorMessage 
      });
      
      toast({
        variant: "destructive",
        title: t("contact.error"),
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    formStatus,
    handleChange,
    handleSubmit,
    resetForm
  };
}
