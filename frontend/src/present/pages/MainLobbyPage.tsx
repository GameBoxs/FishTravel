import React, { useEffect, useState } from 'react';
import SelectSection from '../layout/mainlobby/SelectSection';
import TitleSection from '../layout/mainlobby/TitleSection';
import { useUserStore } from '../../store/userStore';

const MainLobbyPage = () => {
  const name = useUserStore((state) => state.name);
  var userId = useUserStore((state) => state.userId);

  useEffect(() => {
    console.log(name, userId);
  }, []);

  return (
    <>
      <h1>{name}</h1>
      <h2>{userId}</h2>
      <div style={{ height: '40%' }}>
        <TitleSection />
      </div>
      <div style={{ height: '60%' }}>
        <SelectSection />
      </div>
    </>
  );
};

export default MainLobbyPage;
