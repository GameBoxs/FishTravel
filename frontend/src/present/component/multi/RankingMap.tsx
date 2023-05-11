import { useEffect, useRef } from "react";
import styled from "styled-components";
import { LatLng } from "../../layout/multi/MultiGameResult";
import { useGameSettingStore } from "../../pages/MultiGamePage";

type Props = {
  answerPosition: LatLng,
  selectedPosition: LatLng,
  id: string
  isLoaded: string
};
export const RankingMap = ({answerPosition, selectedPosition, id, isLoaded }: Props) => {
  const mapRef = useRef<naver.maps.Map | google.maps.Map | null>(null);
  const markerArrRef = useRef<naver.maps.Marker[] | google.maps.Marker[] | null>(null);
  const { isDomestic } = useGameSettingStore();
  useEffect(() => { 
    if (isLoaded !== "ready") return; 
    if (isDomestic && naver.maps.Map) {
      mapRef.current = new naver.maps.Map(id, {
        center: new naver.maps.LatLng(36.1146, 128.3645)
      })
    } else if (!isDomestic && google.maps.Map) { 
      mapRef.current = new google.maps.Map(document.getElementById(id) as HTMLElement, {
        center: new google.maps.LatLng(36.1146, 128.3645)
      });
    }
  }, [isLoaded])

  return (
    <RankingMapContainer id={id}>
      
    </RankingMapContainer>
  );
};

const RankingMapContainer = styled.div`
  width: 50vw;
  height: 30vh;
  margin-top: 1vh;
  background: white;
  align-items: center;
  justify-content: center; 
  border-radius: 2rem 2rem 0 0;
`