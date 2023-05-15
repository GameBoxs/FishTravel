import styled from "styled-components";

type Props = {
  
};
export const ResultRankingItem = (props: Props) => {
  return (
    <ResultRankingItemContainer>
      <RankText>1</RankText>
      <ResultRankingItemContent>
        <IconItem src="https://picsum.photos/250/250"></IconItem>
        <NicknameText>닉네임</NicknameText>
        <ScoreText>점수</ScoreText>
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
  border: 4px solid rgba(255, 255, 255);
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