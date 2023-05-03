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
    <RnakingItemContainer>
      <span style={{flex: 1}}>{item.ranking}</span>
      <span style={{ flex: 3, overflow: "hidden"}}>{item.memberId}</span>
      <span style={{ flex:1}}>{item.score}</span>
    </RnakingItemContainer>
  );
};

const RnakingItemContainer = styled.div`
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: space-between;
  width: 100%;
  font-size: large;
`