
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Calendar, X } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export type ProjectType = {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  tags: string[];
  technologies: string[];
  image_url: string;
  github_link: string;
  live_link?: string;
  completion_date?: string;
};

interface ProjectModalProps {
  project: ProjectType | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ 
  project, 
  isOpen, 
  onClose 
}: ProjectModalProps) {
  const { t } = useTranslation();
  
  if (!project) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long'
    }).format(date);
  };

  const paragraphs = project.fullDescription 
    ? project.fullDescription.split('\n').filter(p => p.trim() !== '') 
    : [project.description];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl w-[90vw] max-h-[90vh] overflow-y-auto p-0">
        {/* Fixed close button in the top-right corner with increased tap target */}
        <Button 
          onClick={onClose} 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 z-50 rounded-full bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background/90"
          aria-label={t("common.close", "Close")}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Project Image Section - Full width at the top */}
        <div className="w-full">
          <AspectRatio ratio={16 / 9}>
            <img 
              src={project.image_url} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
        
        {/* Project Content Section - Clearly separated from the image */}
        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
            <div className="flex flex-wrap gap-2 my-2">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            {project.completion_date && (
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(project.completion_date)}
              </div>
            )}
          </DialogHeader>
          
          <DialogDescription className="text-foreground space-y-4">
            {paragraphs.map((paragraph, idx) => (
              <p key={idx} className="text-base">{paragraph}</p>
            ))}
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">{t("projects.technologies", "Technologies Used")}:</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </DialogDescription>
          
          <div className="flex flex-wrap gap-4 mt-6 justify-end">
            <Button variant="outline" size="sm" asChild>
              <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
            {project.live_link && (
              <Button size="sm" asChild>
                <a href={project.live_link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t("projects.viewLive", "View Live")}
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
