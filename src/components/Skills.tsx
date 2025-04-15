
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
  Database,
  Code,
  Braces,
  Terminal,
  GitBranch,
  Server,
  Share2,
  Workflow,
  Cloud,
  BrainCircuit,
  FileCode,
  CreditCard,
  Cpu,
  GraduationCap,
  PenTool
} from "lucide-react";

export default function Skills() {
  const { t } = useTranslation();

  const skillsCategories = [
    {
      title: t("skills.categories.programming"),
      icon: <Code className="h-6 w-6 text-blue-500" />,
      skills: [
        { name: "Python", icon: <FileCode className="w-4 h-4" />, class: "bg-blue-100 text-blue-700 dark:bg-blue-800/40 dark:text-blue-300" },
        { name: "Java", icon: <Cpu className="w-4 h-4" />, class: "bg-amber-100 text-amber-700 dark:bg-amber-800/40 dark:text-amber-300" },
        { name: "C++", icon: <Braces className="w-4 h-4" />, class: "bg-indigo-100 text-indigo-700 dark:bg-indigo-800/40 dark:text-indigo-300" },
        { name: "JavaScript", icon: <Code className="w-4 h-4" />, class: "bg-yellow-100 text-yellow-700 dark:bg-yellow-800/40 dark:text-yellow-300" },
        { name: "PL/SQL", icon: <Terminal className="w-4 h-4" />, class: "bg-emerald-100 text-emerald-700 dark:bg-emerald-800/40 dark:text-emerald-300" },
      ],
    },
    {
      title: t("skills.categories.database"),
      icon: <Database className="h-6 w-6 text-purple-500" />,
      skills: [
        { name: "Oracle", icon: <Database className="w-4 h-4" />, class: "bg-red-100 text-red-700 dark:bg-red-800/40 dark:text-red-300" },
        { name: "APEX", icon: <Server className="w-4 h-4" />, class: "bg-orange-100 text-orange-700 dark:bg-orange-800/40 dark:text-orange-300" },
        { name: "SQL", icon: <Database className="w-4 h-4" />, class: "bg-teal-100 text-teal-700 dark:bg-teal-800/40 dark:text-teal-300" },
        { name: "Database Design", icon: <PenTool className="w-4 h-4" />, class: "bg-cyan-100 text-cyan-700 dark:bg-cyan-800/40 dark:text-cyan-300" },
        { name: "Query Optimization", icon: <Workflow className="w-4 h-4" />, class: "bg-slate-100 text-slate-700 dark:bg-slate-800/40 dark:text-slate-300" },
      ],
    },
    {
      title: t("skills.categories.automation"),
      icon: <Workflow className="h-6 w-6 text-green-500" />,
      skills: [
        { name: "UiPath", icon: <Terminal className="w-4 h-4" />, class: "bg-purple-100 text-purple-700 dark:bg-purple-800/40 dark:text-purple-300" },
        { name: "DevOps", icon: <Cloud className="w-4 h-4" />, class: "bg-sky-100 text-sky-700 dark:bg-sky-800/40 dark:text-sky-300" },
        { name: "CI/CD", icon: <Workflow className="w-4 h-4" />, class: "bg-cyan-100 text-cyan-700 dark:bg-cyan-800/40 dark:text-cyan-300" },
        { name: "Git", icon: <GitBranch className="w-4 h-4" />, class: "bg-orange-100 text-orange-700 dark:bg-orange-800/40 dark:text-orange-300" },
        { name: "REST API", icon: <Share2 className="w-4 h-4" />, class: "bg-violet-100 text-violet-700 dark:bg-violet-800/40 dark:text-violet-300" },
      ],
    },
    {
      title: t("skills.categories.domain"),
      icon: <BrainCircuit className="h-6 w-6 text-rose-500" />,
      skills: [
        { name: "Fintech", icon: <CreditCard className="w-4 h-4" />, class: "bg-lime-100 text-lime-700 dark:bg-lime-800/40 dark:text-lime-300" },
        { name: "Banking Systems", icon: <Database className="w-4 h-4" />, class: "bg-emerald-100 text-emerald-700 dark:bg-emerald-800/40 dark:text-emerald-300" },
        { name: "Payment Processing", icon: <Cloud className="w-4 h-4" />, class: "bg-blue-100 text-blue-700 dark:bg-blue-800/40 dark:text-blue-300" },
        { name: "Teaching", icon: <GraduationCap className="w-4 h-4" />, class: "bg-amber-100 text-amber-700 dark:bg-amber-800/40 dark:text-amber-300" },
        { name: "System Integration", icon: <Share2 className="w-4 h-4" />, class: "bg-indigo-100 text-indigo-700 dark:bg-indigo-800/40 dark:text-indigo-300" },
      ],
    },
  ];

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

  const skillTagAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  return (
    <section className="py-20" id="skills">
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
            {t("skills.title")}
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={item}
          >
            {t("skills.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {skillsCategories.map((category, index) => (
            <motion.div 
              key={index} 
              className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-border"
              variants={item}
            >
              <div className="flex items-center gap-3 mb-5">
                {category.icon}
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span 
                    key={skillIndex} 
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${skill.class}`}
                    variants={skillTagAnimation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill.icon}
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
