import styled from "styled-components";
import { TRanking } from "../../pages";

type Props = {
  item: TRanking,
  rank: number
};
export const RankingItem = ({ item, rank }: Props) => {
  return (
    <RankingItemContainer>
      <div style={{ flex: 1}}>{rank}</div>
      <div style={{ flex: 1}}>
        <RankingIcon src="https://cdn-icons-png.flaticon.com/128/149/149071.png" alt="" />
      </div>
      <div style={{ flex: 3, overflow: "hidden", display: "flex", }}>
        <RankingTextContainer>
          <RankingUserText>{item.player.name}</RankingUserText>
          <RankingScoreText>{item.scoreSum}</RankingScoreText>
        </RankingTextContainer>
      </div>
    </RankingItemContainer>
  );
};

const RankingItemContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  font-size: large;
  border-radius: 1rem;
  margin: 4px 0px;
  background-color: rgba(0, 0, 255, 0.05);
`
const RankingIcon = styled.img`
  width: 100%;
`
const RankingTextContainer = styled.div`
  display: grid;
  margin-left: 4px;
`
const RankingUserText = styled.span`
`
const RankingScoreText = styled.span`
  font-size: small;
  text-align: left;
`