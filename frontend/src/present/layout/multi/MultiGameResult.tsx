import { useEffect, useState } from "react";
import styled from "styled-components";
import { LoadingIndicator } from "../../component/multi/LoadingIndicator";
import { RankingMap } from "../../component/multi/RankingMap";
import { RankingPodium } from "../../component/multi/RankingPodium";
import { ResultRankingItemList } from "../../component/multi/ResultRankingItemList";

type Props = {
  isDomestic: boolean;
  isLoaded: string;
};
export type LatLng = {
  nickname: string;
  lat: number;
  lng: number;
}
export const MultiGameResult = ({ isDomestic, isLoaded }: Props) => {
  const [answerPosition, setAnswerPosition] = useState<LatLng>({ nickname:"김덕배", lat: 37.3599605, lng: 127.1058814 });
  const [selectedPosition, setSelectedPosition] = useState<Array<LatLng>>([{ nickname:"김덕배", lat: 37.3699605, lng: 127.1058814 },{ nickname:"이창민", lat: 37.3999605, lng: 127.1158814 },{ nickname:"임수민", lat: 37.3499605, lng: 127.1558814 }]);
  return (
    <div>
      <ResultContainer>
        <ResultContent>
          <ResultMapContent>
            <RankingMap id="map" answerPosition={answerPosition} selectedPosition={selectedPosition} isLoaded={isLoaded} />
          </ResultMapContent>
          <ResultRankingContent>
            <RankingPodium />
            <ResultRankingItemList />
          </ResultRankingContent>
        </ResultContent>
        <LoadingIndicatorContainer>
          <LoadingIndicatorText>
            다음 라운드를 로딩중입니다...
          </LoadingIndicatorText>
          <LoadingIndicator />
        </LoadingIndicatorContainer>
      </ResultContainer>
    </div>
  );
};

const ResultContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
`

const ResultContent = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%) translatey(-50%);
  width: 50vw;
  height: 70vh;
  padding: 10px;
  background: rgb(76, 76, 109);
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 9px 10px 98px -22px rgba(0,0,0,0.75);
  -webkit-box-shadow: 9px 10px 98px -22px rgba(0,0,0,0.75);
  -moz-box-shadow: 9px 10px 98px -22px rgba(0,0,0,0.75);
`

const ResultMapContent = styled.div`
  display: flex;
  position: absolute;
  height: 50%;
  bottom: 50%;
`

const ResultRankingContent = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;
  height: 50%;
  bottom: 0;
`

const LoadingIndicatorContainer = styled.div`
  display: grid;
 position: absolute;
 bottom: 5%;
 left: 50%;
 transform: translateX(-50%);
`
const LoadingIndicatorText = styled.div`
  background: rgba(255, 255, 255, 0.5);
  font-size: large;
  padding: 8px;
  border-radius: 2rem;
`