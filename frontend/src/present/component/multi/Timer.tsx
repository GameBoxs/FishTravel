// @flow 
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGameSettingStore } from '../../pages/MultiGamePage';
import { motion } from "framer-motion";
type Props = {
  isDomestic: boolean
};
export const Timer = ({ isDomestic }: Props) => {
  const [time, setTime] = useState(100);
  const { setGameStage } = useGameSettingStore();
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
      setGameStage(3);
    }
  }, [time])

  return (
    <StyleTimer isDomestic={isDomestic}>
      {Math.floor(time / 60) + " : " + time % 60}
      <CircleStyle animate={{ rotate: 360 }} transition={{repeat: Infinity, duration: 1, ease: "linear"}} />
    </StyleTimer>
  );
};

const StyleTimer = styled.div<{isDomestic: boolean}>`
  position: absolute;
  top: 1vh;
  left: 50%;
  width: 25vw;
  height: 10vh;
  transform: ${(props)=>props.isDomestic ? "translateX(-50%) translate3d(0, 0, 0)" : "translateX(-50%)"};
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10rem;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
`

const CircleStyle = styled(motion.span)`
  width: 3rem;
  height: 3rem;
  border: 0.5rem solid black;
  border-top: 0.5rem solid white;
  border-radius: 50%;
  stroke-dashoffset: 20rem;
`