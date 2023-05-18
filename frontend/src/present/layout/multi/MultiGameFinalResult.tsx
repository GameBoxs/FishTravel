import styled from "styled-components";
import { useGameInfoStore } from "../../pages/MultiGamePage";
import { ResultRankingItem } from "../../component/multi/ResultRankingItem";
import { TRanking } from "../../pages";
import { ImExit } from "react-icons/im";
import { useNavigate } from "react-router-dom";
type Props = {
  
};

export const MultiGameFinalResult = (props: Props) => {
  const { rankingArray } = useGameInfoStore();
  const navigate = useNavigate();
  return (
    <ResultContainer>
      <ResultContent>
        <HeaderText>
          최종결과
        </HeaderText>
        <RankingItemListContainer>
          {rankingArray?.map((r, i) => <ResultRankingItem index={i+1} rank={r} />) }
        </RankingItemListContainer>
      </ResultContent>
      <ExitButton onClick={() => {navigate('/')}}>
        <ImExit />
        나가기
      </ExitButton>
    </ResultContainer>
  );
};

const ResultContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
`

const ResultContent = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%) translatey(-50%);
  width: 50vw;
  height: 70vh;
  padding: 10px;
  background: rgb(76, 76, 109);
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 9px 10px 98px -22px rgba(0,0,0,0.75);
  -webkit-box-shadow: 9px 10px 98px -22px rgba(0,0,0,0.75);
  -moz-box-shadow: 9px 10px 98px -22px rgba(0,0,0,0.75);
`
const RankingItemListContainer = styled.div`
  position: absolute;
  bottom: 5vh;
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 60vh;
  align-items: center;
  justify-content: flex-start;
  div {
    margin: 1vh 0px;
  }
`
const HeaderText = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: xx-large;
  color: white;
`
const ExitButton = styled.button`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 50vw;
  height: 7vh;
  border: none;
  border-radius: 2.5rem;
  font-size: x-large;
  background: #dd7973;
  color: white;
`