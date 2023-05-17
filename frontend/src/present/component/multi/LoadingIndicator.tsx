import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGameSettingStore } from "../../pages/MultiGamePage";
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
  const { setGameStage } = useGameSettingStore();
  const [time, setTime] = useState(20);
  useEffect(() => { 
    const timer = setInterval(() => {
      setTime((prev) => {
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [])
  useEffect(() => { 
    if (time == 0) {
      setGameStage(1);
    }
  }, [time])
  return (
    <motion.div
    style={LoadingContainer}
    variants={ContainerVariants}
    initial="start"
    animate="end"
    >
      { time }
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