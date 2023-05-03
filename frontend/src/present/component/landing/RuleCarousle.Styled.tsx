import styled from 'styled-components';

export const RuleCarousleWrapper = styled.div`
  max-width: 800px; /* 최대 너비를 800px로 제한 */
  margin: 0 auto; /* 가운데 정렬 */
  padding: 20px; /* 내부 패딩값 조정 */

  .carosel {
    width: 30vw;
    height: 30vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 100%);
  }

  .next,
  .prev {
    top: calc(50% - 20px);
    position: absolute;
    background: white;
    border-radius: 30px;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
    z-index: 2;
  }

  .next {
    right: 10px;
  }

  .prev {
    left: 10px;
    transform: scale(-1);
  }

  img {
    position: absolute;
    max-width: 30vw;
  }

  .refresh {
    padding: 10px;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    width: 20px;
    height: 20px;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
