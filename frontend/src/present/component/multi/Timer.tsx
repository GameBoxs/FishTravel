// @flow 
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";
type Props = {
  initialTime: number;
};
export const Timer = ({ initialTime }: Props) => {
  const [time, setTime] = useState(initialTime);
  useEffect(() => { 
    const timer = setInterval(() => {
      setTime((prev) => {
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [])
  return (
    <LoadingContainer>
      <LoadingContent>
        <LoadingSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <TimeCircle cx="50" cy="50" r="48" time={initialTime}></TimeCircle>
        </LoadingSVG>
        <TimeText>{time}</TimeText>
      </LoadingContent>
    </LoadingContainer>
  );
};

const StyleTimer = styled.div<{isDomestic: boolean}>`
  position: absolute;
  top: 1vh;
  left: 50%;
  width: 25vw;
  height: 10vh;
  transform: ${(props)=>props.isDomestic ? "translateX(-50%) translate3d(0, 0, 0)" : "translateX(-50%)"};
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
`

const LoadingContainer = styled.div`
  position: absolute;
  top: 1vh;
  left: 50%;
  width: 10vh;
  height: 10vh;
  transform: translateX(-50%) translate3d(0, 0, 0);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10rem;
  padding: 8px;
`
const LoadingContent = styled.div`
  position: relative;
  font-size: xx-large;
`

const LoadingSVG = styled.svg`
  width: 100%;
  height: 100%;
`
const TimeText = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const TimeCircle = styled.circle<{time: number}>`
  fill: none;
  stroke: #f00;
  stroke-width: 4;
  stroke-dasharray: ${ 2 * Math.PI * 47};
  stroke-dashoffset: 0;
  animation: ${(props)=>`timer-animation ${props.time}s linear infinite` };
  transform-origin: center;
  transform: rotate(-90deg);

  @keyframes timer-animation {
    0% {
      stroke-dashoffset: ${ 2 * Math.PI * 47};
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
`