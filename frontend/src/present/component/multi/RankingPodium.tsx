import styled from "styled-components";
import { RankingPodiumItem } from "./RankingPodiumItem";

type Props = {
  
};
export const RankingPodium = (props: Props) => {
  return (
    <ResultRankingContainer>
      <RankingPodiumItem rank={2}/>
      <RankingPodiumItem rank={1}/>
      <RankingPodiumItem rank={3}/>
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