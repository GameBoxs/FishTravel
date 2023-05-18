import styled from "styled-components";
import { TRanking } from "../../pages";

type Props = {
  index: number
  rank: TRanking;
};
export const RankingPodiumItem = ({ index, rank }: Props) => {
  return (
    <PodiumItemContainer rank={index}>
      <CircleIcon profileSrc={"https://cdn-icons-png.flaticon.com/128/149/149071.png"} />
      <NicknameText>{rank.player.name}</NicknameText>
      <ScoreText>{rank.scoreSum}</ScoreText>
    </PodiumItemContainer>
  );
};

const PodiumItemContainer = styled.div<{ rank: number }>`
  display: grid;
  text-align: center;
  margin-bottom: ${(props) => { return props.rank === 1 ? "150px" : (props.rank === 2 ? "50px" : "50px") }};
  padding: 8px;
`

const CircleIcon = styled.div<{profileSrc: string}>`
  width: 5vw;
  height: 5vw;
  border-radius: 2rem;
  border: 4px solid rgb(255, 225, 148);
  background-image: ${(props)=>`url(${props.profileSrc})`};
  object-fit: contain;
`

const NicknameText = styled.span`
color: rgba(255, 255, 255);
  font-size: large;
`

const ScoreText = styled.span`
  margin-right: 10px;
  color: rgba(255, 255, 255, 0.8);
`