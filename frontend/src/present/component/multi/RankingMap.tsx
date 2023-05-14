import { useEffect, useRef } from "react";
import styled from "styled-components";
import { LatLng } from "../../layout/multi/MultiGameResult";
import { useGameSettingStore } from "../../pages/MultiGamePage";

type Props = {
  answerPosition: LatLng,
  selectedPosition: Array<LatLng>,
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
      // 네이버 지도를 보여줘야 하는 경우
      mapRef.current = new naver.maps.Map(id, {
        center: new naver.maps.LatLng(36.1146, 128.3645)
      })
      markerArrRef.current = new Array<naver.maps.Marker>;
      for (const pos of selectedPosition) { 
        markerArrRef.current?.push(
          new naver.maps.Marker({
            position: new naver.maps.LatLng(pos.lat, pos.lng),
            map: mapRef.current,
            visible: true
          })
        )
      }
      markerArrRef.current.push(
        new naver.maps.Marker({
          position: new naver.maps.LatLng(answerPosition.lat, answerPosition.lng),
          map: mapRef.current,
          visible: true,
        })
      )
      mapRef.current.fitBounds(markerArrRef.current.map((m) => m.getPosition()));
    } else if (!isDomestic && google.maps.Map) { 
      // 구글 지도를 보여줘야 하는 경우
      mapRef.current = new google.maps.Map(document.getElementById(id) as HTMLElement, {
        center: new google.maps.LatLng(36.1146, 128.3645),
        zoom: 14,
        fullscreenControl: false,
        panControl: false,
        disableDefaultUI: true,
        clickableIcons: false,
      });
      markerArrRef.current = new Array<google.maps.Marker>;
      for (const pos of selectedPosition) { 
        markerArrRef.current?.push(
          new google.maps.Marker({
            position: new google.maps.LatLng(pos.lat, pos.lng),
            map: mapRef.current,
            visible: true,
          })
        )
      }
      markerArrRef.current.push(
        new google.maps.Marker({
          position: new google.maps.LatLng(answerPosition.lat, answerPosition.lng),
          map: mapRef.current,
          visible: true,
        })
      )
      const boundary = new google.maps.LatLngBounds();
      for (const marker of markerArrRef.current) { 
        boundary.extend(marker.getPosition()!);
      }
      mapRef.current.fitBounds(boundary);
    }
    console.log(mapRef.current);
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