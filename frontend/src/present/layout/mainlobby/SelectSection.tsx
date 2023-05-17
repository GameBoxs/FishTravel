import React, { useEffect, useState } from 'react';
import GameEnterBtn from '../../component/mainlobby/GameEnterBtn';
import * as Style from './SelectSection.Styled';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SelectSection = () => {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  return (
    <Style.SelectSectionWrapper>
      <button
        onClick={() => {
          let propsCode: string;
          let isDomestic: boolean;
          axios
            .get('http://localhost:8080/api/room/create', {
              withCredentials: true,
            })
            .then((response) => {
              propsCode = response.data;
              isDomestic = true;
              navigate('/game/multi', {
                state: { propsCode, isDomestic },
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }}
      >
        <GameEnterBtn />
      </button>
      <button
        onClick={() =>
          navigate('/game/multi', {
            state: '1235181818',
          })
        }
      >
        <GameEnterBtn />
      </button>
    </Style.SelectSectionWrapper>
  );
};

export default SelectSection;
