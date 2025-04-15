import { motion } from "framer-motion";
import { profileAnimation, pulseAnimation } from "@/utils/animations";

export default function ProfileImage() {
  return (
    <motion.div 
      className="relative mb-10"
      initial="hidden"
      animate="visible"
      variants={profileAnimation}
    >
      <motion.div 
        className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/30 to-primary/60 blur-md z-0"
        animate={pulseAnimation}
      />
      <div className="relative w-40 h-40 md:w-48 md:h-48 bg-gradient-to-r from-primary to-blue-400 rounded-full p-1 z-10">
        <div className="w-full h-full rounded-full overflow-hidden">
          <img 
            src="/lovable-uploads/Mohammed_Boussardi.png" 
            alt="Mohammed Boussardi" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}
