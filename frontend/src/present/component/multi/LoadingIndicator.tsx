import { motion } from "framer-motion";
type Props = {
  
};

const LoadingDot = {
  display: "block",
  width: "2rem",
  height: "2rem",
  backgroundColor: "black",
  borderRadius: "50%"
};

const LoadingContainer = {
  width: "10rem",
  height: "5rem",
  display: "flex",
  justifyContent: "space-around",
  justifySelf: "center"
};

const ContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2
    }
  },
  end: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const DotVariants = {
  start: {
    y: "0%"
  },
  end: {
    y: "100%"
  }
};

const DotTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse" as const,
  ease: "easeInOut"
};

export const LoadingIndicator = (props: Props) => {
  return (
    <motion.div
    style={LoadingContainer}
    variants={ContainerVariants}
    initial="start"
    animate="end"
    >
    <motion.span
      style={LoadingDot}
      variants={DotVariants}
      transition={DotTransition}
    />
    <motion.span
      style={LoadingDot}
      variants={DotVariants}
      transition={DotTransition}
    />
    <motion.span
      style={LoadingDot}
      variants={DotVariants}
      transition={DotTransition}
    />
  </motion.div>
  );
};