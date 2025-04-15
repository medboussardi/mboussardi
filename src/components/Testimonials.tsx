
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

type Testimonial = {
  id: number;
  name: string;
  title: string;
  content: string;
  avatar?: string;
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();

  // This would be replaced with actual data from Supabase or another source
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Jane Smith",
      title: "CTO at FinTech Solutions",
      content: "Mohammed's expertise in Oracle APEX and financial systems was instrumental in our digital transformation. His solutions are both innovative and practical.",
    },
    {
      id: 2,
      name: "John Doe",
      title: "Student",
      content: "As my programming tutor, Mohammed made complex Python concepts easy to understand. His patience and clear explanations helped me advance my skills quickly.",
    },
    {
      id: 3,
      name: "Emma Wilson",
      title: "Project Manager",
      content: "Working with Mohammed on our automation project was a pleasure. His UiPath expertise significantly improved our business processes and reduced operational costs.",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

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

  const cardVariants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    if (newDirection > 0) {
      nextTestimonial();
    } else {
      prevTestimonial();
    }
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section className="py-20" id="testimonials">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold gradient-heading mb-4"
            variants={item}
          >
            {t("testimonials.title")}
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={item}
          >
            {t("testimonials.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
        >
          <div className="overflow-hidden relative">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="w-full"
              >
                <Card className="bg-card border border-border shadow-md">
                  <CardContent className="pt-10 pb-8">
                    <div className="absolute top-6 left-8 text-primary/40">
                      <Quote className="w-10 h-10" />
                    </div>
                    <blockquote className="text-lg italic mb-6">
                      "{testimonials[activeIndex].content}"
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {testimonials[activeIndex].avatar ? (
                          <img 
                            src={testimonials[activeIndex].avatar} 
                            alt={testimonials[activeIndex].name} 
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          testimonials[activeIndex].name.charAt(0)
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonials[activeIndex].name}</p>
                        <p className="text-sm text-muted-foreground">{testimonials[activeIndex].title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === activeIndex ? "bg-primary" : "bg-primary/20"
                  }`}
                  onClick={() => {
                    setPage([index, index > activeIndex ? 1 : -1]);
                    setActiveIndex(index);
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
