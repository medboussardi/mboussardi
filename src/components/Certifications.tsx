
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Calendar } from "lucide-react";

export default function Certifications() {
  const { t } = useTranslation();

  // Sample certification data
  const certifications = [
    {
      title: "Oracle PL/SQL Developer Certified Professional",
      organization: "Oracle",
      date: "2023-05-15",
      image: "/public/lovable-uploads/6eeb3215-26fc-4e2e-98a3-ccca20a09fa1.png",
      link: "https://www.credly.com/badges/sample"
    },
    {
      title: "UiPath RPA Developer Advanced",
      organization: "UiPath",
      date: "2022-11-20",
      image: "/public/lovable-uploads/4dc3d97c-1185-4ae5-ac1c-adad46e74aa2.png",
      link: "https://www.credly.com/badges/sample"
    },
    {
      title: "Python for Data Science and Machine Learning",
      organization: "Coursera",
      date: "2023-02-08",
      image: "/public/lovable-uploads/2a423286-4ec4-4826-a6db-ca0faa5d54e8.png",
      link: "https://www.coursera.org/account/accomplishments/certificate/sample"
    },
    {
      title: "Full Stack Web Development",
      organization: "freeCodeCamp",
      date: "2022-08-30",
      image: "/public/lovable-uploads/212235c3-c160-4e12-ad2c-64a892f6c51c.png",
      link: "https://www.freecodecamp.org/certification/sample"
    }
  ];

  // Animation variants
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

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <section className="py-20 bg-secondary/20" id="certifications">
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
            {t("certifications.title", "Technical Certifications")}
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={item}
          >
            {t("certifications.subtitle", "Professional certifications and technical achievements")}
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {certifications.map((cert, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full flex flex-col bg-card">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-background/50 p-1 flex items-center justify-center">
                      <img 
                        src={cert.image} 
                        alt={cert.organization} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <CardTitle className="text-center text-lg">{cert.title}</CardTitle>
                  <Badge variant="outline" className="mt-2 mx-auto">
                    {cert.organization}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center flex-grow">
                  <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(cert.date)}
                  </div>
                </CardContent>
                <CardFooter className="justify-center pt-0">
                  <Button variant="outline" size="sm" asChild>
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                      {t("certifications.viewCertificate", "View Certificate")}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
