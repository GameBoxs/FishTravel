import React, { useEffect, useState } from 'react';
import LoginBtn from '../../component/landing/LoginBtn';
import RuleCarosel from '../../component/landing/RuleCarousel';
import * as Style from './LandingMain.Styled';

const LandingMain = () => {
  const naver = window.naver;
  const [currentStage, setCurrentStage] = useState(1);

  useEffect(() => {}, []);

  return (
    <Style.LandindWrapper>
      <RuleCarosel />
      <LoginBtn />
    </Style.LandindWrapper>
  );
};

export default LandingMain;
