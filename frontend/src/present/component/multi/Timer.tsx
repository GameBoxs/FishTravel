// @flow 
import { useState, useEffect } from 'react';
import styled from 'styled-components';
type Props = {
  isDomestic: boolean
};
export const Timer = ({ isDomestic }: Props) => {
  const [time, setTime] = useState(100);
  useEffect(() => { 
    const timer = setInterval(() => {
      setTime((prev) => {
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [])
  return (
    <StyleTimer isDomestic={isDomestic}>
      { Math.floor(time/60) + " : "  + time%60 }
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