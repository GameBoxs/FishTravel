// @flow 
import { useState, useEffect } from 'react';
import styled from 'styled-components';
type Props = {
  
};
export const Timer = (props: Props) => {
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
    <StyleTimer>
      { Math.floor(time/60) + " : "  + time%60 }
    </StyleTimer>
  );
};

const StyleTimer = styled.div`
  position: absolute;
  top: 1vh;
  left: 50%;
  width: 25vw;
  height: 10vh;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10rem;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
`