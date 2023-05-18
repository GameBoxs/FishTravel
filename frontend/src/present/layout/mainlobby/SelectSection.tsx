import React, { useEffect, useState } from 'react';
import GameEnterBtn from '../../component/mainlobby/GameEnterBtn';
import * as Style from './SelectSection.Styled';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CodeInsertModal from '../../component/mainlobby/CodeInsertModal';

const SelectSection = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const openInsertModal = () => setIsOpen(true);
  const closeInsertModal = () => setIsOpen(false);

  // 버튼 클릭시 실행할 함수 정의
  const startMulti = (isDomestic: boolean) => {
    let propsCode: string;

    axios
      .get(`http://localhost:8080/api/room/create?domestic=${isDomestic}`, {
        withCredentials: true,
      })
      .then((response) => {
        propsCode = response.data;
        navigate(`/game/multi/${propsCode}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const startSingle = (isDomestic: boolean) => {
    navigate(`/game/single`, {
      state: '*',
    });
  };

  return (
    <>
      <Style.SelectSectionWrapper>
        <Style.GameEnterBtnWrapper color="yellow">
          <GameEnterBtn color="yellow" onClick={() => startMulti(true)} />
        </Style.GameEnterBtnWrapper>
        <Style.GameEnterBtnWrapper color="green">
          <GameEnterBtn color="green" onClick={() => startMulti(false)} />
        </Style.GameEnterBtnWrapper>
        <Style.GameEnterBtnWrapper color="blue">
          <GameEnterBtn color="blue" onClick={openInsertModal} />
          <CodeInsertModal isOpen={isOpen} onClose={closeInsertModal} />
        </Style.GameEnterBtnWrapper>
        <Style.GameEnterBtnWrapper color="red">
          <GameEnterBtn color="red" onClick={() => startSingle(true)} />
        </Style.GameEnterBtnWrapper>
        <Style.GameEnterBtnWrapper color="white">
          <GameEnterBtn color="white" onClick={() => startSingle(false)} />
        </Style.GameEnterBtnWrapper>
      </Style.SelectSectionWrapper>
    </>
  );
};

export default SelectSection;
