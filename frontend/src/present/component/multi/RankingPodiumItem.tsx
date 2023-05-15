import styled from "styled-components";

type Props = {
  rank: number
};
export const RankingPodiumItem = ({ rank }: Props) => {
  return (
    <PodiumItemContainer rank={rank}>
      <CircleIcon profileSrc={"https://picsum.photos/250/250"} />
      <NicknameText>닉네임</NicknameText>
      <ScoreText>점수</ScoreText>
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
  border: 4px solid rgba(255, 255, 255);
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