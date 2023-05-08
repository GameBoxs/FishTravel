import { useState } from 'react';
import styled from "styled-components";
import { RankingItem } from "./RankingItem";
import { BsChevronBarDown, BsChevronBarUp } from "react-icons/bs";

type Props = {
  isDomestic: boolean
};
const list = [
  {
    ranking: 1,
    memberId: "김이박",
    score: 100,
  },
  {
    ranking: 2,
    memberId: "이박최asdasdasd",
    score: 99,
  },
  {
    ranking: 3,
    memberId: "박최정",
    score: 90,
  },
  {
    ranking: 4,
    memberId: "최정강",
    score: 80,
  },
  {
    ranking: 5,
    memberId: "강김최",
    score: 70,
  },
]
export const Ranking = ({isDomestic}: Props) => {
  const [isExpand, setIsExpand] = useState(false);
  return (
    <RankingContainer isExpand={isExpand} isDomestic={isDomestic}>
      <p>순위</p>
      <RankingContent>
        {isExpand ? list.map((ranking) => <RankingItem item={ranking} />)
          : <RankingItem item={list[0]} />
        }
      </RankingContent>
      <RankingControlPanel>
        <RankingCollapseButton onClick={() => { setIsExpand((prev)=>!prev)}}>
          {isExpand ? <BsChevronBarUp /> : <BsChevronBarDown />}
        </RankingCollapseButton>
      </RankingControlPanel>
    </RankingContainer>
  );
};
const RankingContainer = styled.div<{ isExpand: boolean, isDomestic: boolean}>`
  position: absolute;
  right: 1vw;
  top: 1vw;
  width: 15vw;
  height: ${(props)=>props.isExpand ? "40vh" : "10vh"};
  background: rgba(255, 255, 255, 0.6);
  border-radius: 1rem;
  overflow: hidden;
  z-index: 20;
  text-align: center;
  -webkit-transition: height 1s ease-in-out;
  -moz-transition: height 1s ease-in-out;
  -o-transition: height 1s ease-in-out;
  transition: height 0.5s ease-in-out;
  transform: ${(props)=>props.isDomestic ? "translate3d(0, 0, 0)" : ""};
`

const RankingContent = styled.div`
  display: grid;
  padding: 8px;
  width: calc(100% - 16px);
`
const RankingCollapseButton = styled.button`
  background: white;
  border: none;
  width: 100%;
  padding: 2px;
  border-radius: 0.25rem;
`
const RankingControlPanel = styled.div`
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  height: auto;
  width: 50%;
`