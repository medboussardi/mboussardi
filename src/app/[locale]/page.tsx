import HeroSection from '@/components/sections/HeroSection';
import HighlightsStrip from '@/components/sections/HighlightsStrip';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ExpertiseSection from '@/components/sections/ExpertiseSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import PMOSection from '@/components/sections/PMOSection';
import EducationSection from '@/components/sections/EducationSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HighlightsStrip />
      <AboutSection />
      <ExperienceSection />
      <ExpertiseSection />
      <ProjectsSection />
      <SkillsSection />
      <CertificationsSection />
      <PMOSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}
