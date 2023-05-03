import React, { useEffect, useState } from 'react';
import RuleCarosel from '../../component/landing/RuleCarousel';
import imgLink from '../../../assets/login/kakao_button.png';

const LandingMain = () => {
  const naver = window.naver;
  const [currentStage, setCurrentStage] = useState(1);
  const kakaoLoginUrl = `http://localhost:8080/oauth2/authorization/kakao`;

  useEffect(() => {}, []);

  return (
    <>
      <div className="landing-container" style={{ height: '50%', width: '50%', margin: '0 auto' }}>
        <RuleCarosel />
        <a href={kakaoLoginUrl}>
          <img src={imgLink} />
        </a>
      </div>
    </>
  );
};

export default LandingMain;
