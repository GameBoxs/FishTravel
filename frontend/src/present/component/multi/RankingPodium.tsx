import styled from "styled-components";
import { useGameInfoStore } from "../../pages/MultiGamePage";
import { RankingPodiumItem } from "./RankingPodiumItem";

type Props = {
  
};
export const RankingPodium = (props: Props) => {
  const { rankingArray } = useGameInfoStore();
  return (
    <ResultRankingContainer>
      <RankingPodiumItem index={2} rank={rankingArray!.at(1)} />
      <RankingPodiumItem index={1} rank={rankingArray!.at(0)} />
      <RankingPodiumItem index={3} rank={rankingArray!.at(2)} />
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