import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { imageAnimation } from "@/utils/animations";

export default function AboutImage() {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className="w-full md:w-1/2 flex justify-center"
      variants={imageAnimation}
    >
      <img 
        src="/lovable-uploads/Mohammed_Boussardi.png" 
        alt="Mohammed Boussardi" 
        className="w-64 h-64 md:hidden object-cover rounded-full profile-img border-4 border-primary/30"
      />
      <img 
        src="/lovable-uploads/Mohammed_Boussardi.png" 
        alt="Mohammed Boussardi" 
        className="w-full max-w-md hidden md:block rounded-lg shadow-xl"
      />
    </motion.div>
  );
}
