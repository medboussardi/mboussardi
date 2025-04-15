
import { motion } from "framer-motion";
import AboutContent from "@/components/about/AboutContent";
import AboutImage from "@/components/about/AboutImage";
import { containerAnimation } from "@/utils/animations";

export default function About() {
  return (
    <section className="py-20 bg-secondary/50 dark:bg-secondary/20" id="about">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row items-center gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerAnimation}
        >
          <AboutImage />
          <AboutContent />
        </motion.div>
      </div>
    </section>
  );
}
