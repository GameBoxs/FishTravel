import React, { useEffect, useState } from 'react';
import LandingMain from '../layout/landing/LandingMain';

// import SingleDomestic from "../layout/single/SingleDomestic";

const LandingPage = () => {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <LandingMain />
    </>
  );
};

export default LandingPage;
