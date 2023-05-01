import styled from "styled-components";

type Props = {
  item: {
    ranking: number,
    memberId: string,
    score: number,
  }
};
export const RankingItem = ({ item }: Props) => {
  return (
    <div>
      { item.ranking } { item.memberId } {item.score}
    </div>
  );
};

const RnakingItemContainer = styled.div`
  width: 100%;
`