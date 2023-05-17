import React, { useEffect, useState } from 'react';
import LandingMain from '../layout/landing/LandingMain';
import { useUserStore } from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
// import SingleDomestic from "../layout/single/SingleDomestic";

const LandingPage = () => {
  const [showMap, setShowMap] = useState(false);
  let isLogin = useUserStore((state) => state.isLogin);
  let setIsLogin = useUserStore((state) => state.setIsLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate('/mainlobby');
      console.log(isLogin);
    }
  }, [isLogin]);

  return (
    <>
      <LandingMain />
    </>
  );
};

export default LandingPage;
