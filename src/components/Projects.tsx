import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ProjectModal, { ProjectType } from "./ProjectModal";

export default function Projects() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Enhanced project data with additional fields and updated image paths
  const projects: ProjectType[] = [
    {
      id: 1,
      title: "Banking Automation System",
      description: "Automated banking processes using UiPath and integrated with Oracle database for a major financial institution.",
      fullDescription: "Automated banking processes using UiPath and integrated with Oracle database for a major financial institution, resulting in 75% reduction in manual work.\n\nThe system automates several critical processes including account reconciliation, transaction verification, and customer onboarding. It integrates with multiple legacy systems and provides a unified interface for bank employees.\n\nKey achievements:\n- 75% reduction in manual processing time\n- 90% decrease in data entry errors\n- Implementation of real-time monitoring and alerts\n- Seamless integration with existing Oracle infrastructure",
      tags: ["UiPath", "Oracle", "PL/SQL", "Automation"],
      technologies: ["UiPath", "Oracle Database", "PL/SQL", "REST API", "Jenkins", "Git"],
      image_url: "/images/projects/project1.jpg",
      github_link: "https://github.com/medboussardi/banking-automation",
      completion_date: "2023-06-15"
    },
    {
      id: 2,
      title: "APEX Financial Dashboard",
      description: "Developed a comprehensive financial dashboard with Oracle APEX, providing real-time insights into financial metrics and KPIs.",
      fullDescription: "Developed a comprehensive financial dashboard with Oracle APEX, providing real-time insights into financial metrics and KPIs for management decision-making.\n\nThe dashboard features interactive charts, drill-down capabilities, and personalized views based on user roles. It connects to multiple data sources and presents unified analytics with export capabilities.\n\nKey features:\n- Interactive visualization of financial KPIs\n- Role-based access control and personalized views\n- Automated report generation and scheduling\n- Mobile-responsive design for on-the-go access",
      tags: ["Oracle APEX", "PL/SQL", "JavaScript", "Fintech"],
      technologies: ["Oracle APEX", "PL/SQL", "JavaScript", "RESTful APIs", "Oracle Database", "CSS"],
      image_url: "/images/projects/project2.jpg",
      github_link: "https://github.com/medboussardi/financial-dashboard",
      live_link: "https://example.com/financial-dashboard",
      completion_date: "2023-03-22"
    },
    {
      id: 3,
      title: "Payment Processing System",
      description: "Built a secure payment processing system integrating multiple payment gateways with robust error handling and monitoring.",
      fullDescription: "Built a secure payment processing system integrating multiple payment gateways, with robust error handling and transaction monitoring capabilities.\n\nThe system supports various payment methods including credit cards, bank transfers, and mobile payments. It features end-to-end encryption, fraud detection algorithms, and comprehensive reporting.\n\nKey technologies:\n- Java Spring Boot backend with microservices architecture\n- Integration with major payment gateways (Stripe, PayPal, local banks)\n- Real-time transaction monitoring and alerting\n- Comprehensive audit logging and reporting",
      tags: ["Java", "Python", "SQL", "API Integration"],
      technologies: ["Java Spring Boot", "Python", "PostgreSQL", "Docker", "Kubernetes", "Redis", "Stripe API", "PayPal API"],
      image_url: "/images/projects/project3.jpg",
      github_link: "https://github.com/medboussardi/payment-system",
      completion_date: "2022-11-10"
    }
  ];

  const openProjectModal = (project: ProjectType) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 70, damping: 10 }
    }
  };

  const cardHoverAnimation = {
    rest: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.3 } }
  };

  const imageHoverAnimation = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 bg-secondary/20 dark:bg-secondary/10" id="projects">
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
            {t("projects.title")}
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={item}
          >
            {t("projects.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              initial="rest"
              whileHover="hover"
              animate="rest"
              onClick={() => openProjectModal(project)}
              className="cursor-pointer"
            >
              <motion.div variants={cardHoverAnimation}>
                <Card className="h-full hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github_link, '_blank');
                        }}>
                          <Github className="h-5 w-5" />
                        </Button>
                        {project.live_link && (
                          <Button variant="ghost" size="icon" onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.live_link, '_blank');
                          }}>
                            <ExternalLink className="h-5 w-5" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="aspect-video mb-4 overflow-hidden rounded-md">
                      <motion.img 
                        src={project.image_url} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                        variants={imageHoverAnimation}
                      />
                    </div>
                    <CardDescription className="text-sm">{project.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      {t("projects.viewDetails", "View Details")}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeProjectModal}
      />
    </section>
  );
}
