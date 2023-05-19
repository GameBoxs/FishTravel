import { useState } from 'react';
import styled from "styled-components";
import { RankingItem } from "./RankingItem";
import { BsChevronBarDown, BsChevronBarUp } from "react-icons/bs";
import { useGameInfoStore } from '../../pages/MultiGamePage';

type Props = {
  isDomestic: boolean
};

export const Ranking = ({isDomestic}: Props) => {
  const [isExpand, setIsExpand] = useState(false);
  const { rankingArray } = useGameInfoStore();
  return (
    <RankingContainer isExpand={isExpand} isDomestic={isDomestic}>
      <RankingContent>
        {rankingArray !== null && (isExpand ? rankingArray.map((ranking, index) => <RankingItem item={ranking} rank={index+1} />)
          : <RankingItem item={rankingArray[0]} rank={1} />
        )}
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
  background: rgba(255, 255, 255, 1);
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
  display: flex;
  flex-direction: column;
  padding: 8px;
  height: calc(100% - 2vh - 24px);
  width: calc(100% - 16px);
`
const RankingCollapseButton = styled.button`
  background: rgba(244, 244, 244, 1);
  border: none;
  width: 100%;
  height: 2vh;
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