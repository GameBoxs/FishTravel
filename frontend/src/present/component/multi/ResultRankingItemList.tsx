import styled from "styled-components";
import { ResultRankingItem } from "./ResultRankingItem";

type Props = {
  
};
export const ResultRankingItemList = (props: Props) => {
  return (
    <RankingItemListContainer>
      <ResultRankingItem />
      <ResultRankingItem />
      <ResultRankingItem />
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