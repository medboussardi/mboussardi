
export const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const itemAnimation = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 70, damping: 10 }
  }
};

export const floatingAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut"
  }
};

export const imageAnimation = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 50, 
      damping: 10,
      delay: 0.5
    }
  }
};

export const profileAnimation = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100, 
      damping: 10,
      delay: 0.2
    }
  }
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [0.7, 0.9, 0.7],
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: "loop" as const,
    ease: "easeInOut"
  }
};
