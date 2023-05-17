import React, { useEffect, useState } from 'react';
import GameEnterBtn from '../../component/mainlobby/GameEnterBtn';
import * as Style from './SelectSection.Styled';

const SelectSection = () => {
  useEffect(() => {}, []);

  return (
    <Style.SelectSectionWrapper>
      <GameEnterBtn />
      <GameEnterBtn />
      <GameEnterBtn />
    </Style.SelectSectionWrapper>
  );
};

export default SelectSection;
