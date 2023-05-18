import styled from "styled-components";
import { useGameInfoStore } from "../../pages/MultiGamePage";
import { RankingPodiumItem } from "./RankingPodiumItem";

type Props = {
  
};
export const RankingPodium = (props: Props) => {
  const { rankingArray } = useGameInfoStore();
  return (
    <ResultRankingContainer>
      {rankingArray!.length >= 2 &&  <RankingPodiumItem index={2} rank={rankingArray!.at(1)!} />}
      {rankingArray!.length >= 1 &&  <RankingPodiumItem index={1} rank={rankingArray!.at(0)!} />}
      {rankingArray!.length >= 3 &&  <RankingPodiumItem index={3} rank={rankingArray!.at(2)!} />}
    </ResultRankingContainer>
  );
};

const ResultRankingContainer = styled.div`
  display: flex;
  width: 25vw;
  height: 30vh;
  justify-content: center;
  align-items: end;
`