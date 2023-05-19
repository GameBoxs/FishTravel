import styled from "styled-components";
import { useGameInfoStore } from "../../pages/MultiGamePage";
import { ResultRankingItem } from "./ResultRankingItem";

type Props = {
  
};
export const ResultRankingItemList = (props: Props) => {
  const { rankingArray } = useGameInfoStore();
  return (
    <RankingItemListContainer>
      {rankingArray!.length >= 4 &&  <ResultRankingItem index={4} rank={rankingArray!.at(3)!} />}
      {rankingArray!.length >= 5 &&  <ResultRankingItem index={5} rank={rankingArray!.at(4)!} />}
      {rankingArray!.length >= 6 &&  <ResultRankingItem index={6} rank={rankingArray!.at(5)!} />}
    </RankingItemListContainer>
  );
};

const RankingItemListContainer = styled.div`
  display: grid;
  width: 25vw;
  height: 30vh;
  align-items: center;
  justify-content: center;
`