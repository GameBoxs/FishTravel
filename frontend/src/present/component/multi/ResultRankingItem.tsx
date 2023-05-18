import styled from "styled-components";
import { TRanking } from "../../pages";

type Props = {
  index: number
  rank: TRanking;
};
export const ResultRankingItem = ({index, rank}: Props) => {
  return (
    <ResultRankingItemContainer>
      <RankText>{index}</RankText>
      <ResultRankingItemContent>
        <IconItem src="https://cdn-icons-png.flaticon.com/128/149/149071.png"></IconItem>
        <NicknameText>{rank.player.name}</NicknameText>
        <ScoreText>{rank.scoreSum}</ScoreText>
      </ResultRankingItemContent>
    </ResultRankingItemContainer>
  );
};

const ResultRankingItemContainer = styled.div`
  display: flex;
  width: 25vw;
  align-items: center;
  justify-content: center;
`

const ResultRankingItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 20vw;
  height: 100%;
  min-height: 50px;
  max-height: 60px;
  border-radius: 1rem;
  background-color: rgba(255,255,255,0.8);
  box-shadow: 9px 10px 98px -22px rgba(0,0,0,0.75);
  -webkit-box-shadow: 10px 10px 15px -18px rgba(0,0,0,0.75);
  -moz-box-shadow: 9px 10px 98px -22px rgba(0,0,0,0.75);
  font-size: large;
`

const IconItem = styled.img`
  min-width: 50px;
  min-height: 50px;
  max-width: 80px;
  max-height: 60px;
  border-radius: 1rem;
  border: 4px solid rgb(255, 225, 148);
`
const NicknameText = styled.span`
  color: black;
  font-size: x-large;
`

const RankText = styled.span`
  font-size: x-large;
  margin-right: 20px;
  color: rgba(255, 255, 255, 0.8);
`
const ScoreText = styled.span`
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.8);
`