import styled from 'styled-components';

type GameEnterBtnWrapperProps = {
  color: string;
};

export const SelectSectionWrapper = styled.div`
  display: flex;
  justify-content: center; // 가로축을 따라 가운데 정렬
  align-items: center; // 세로축을 따라 가운데 정렬
`;

export const GameEnterBtnWrapper = styled.div<GameEnterBtnWrapperProps>`
  body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #91f, #70f);
  }

  .container {
    width: 150px;
    height: 150px;
    background: ${(props) => props.color};
    border-radius: 40px;
    margin: 100px 50px; // 버튼 사이에 10px의 간격을 줌
  }
`;
