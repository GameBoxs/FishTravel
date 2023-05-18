import React, { useEffect, useState } from 'react';
import SelectSection from '../layout/mainlobby/SelectSection';
import TitleSection from '../layout/mainlobby/TitleSection';
import { useUserStore } from '../../store/userStore';

const MainLobbyPage = () => {
  const name = useUserStore((state) => state.name);
  const id = useUserStore((state) => state.id);

  useEffect(() => {
    if (name != null && id != null) {
      console.log(name, id);
    }
  }, [name]);

  return (
    <div style={{ height: '100%', width: '100%', background: 'linear-gradient(to right, red , yellow)' }}>
      <div style={{ height: '40%' }}>
        <TitleSection />
      </div>
      <div style={{ height: '60%' }}>
        <SelectSection />
      </div>
    </div>
  );
};

export default MainLobbyPage;
