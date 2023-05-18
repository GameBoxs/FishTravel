import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useUserStore } from "../../../store/userStore";
import { useGameInfoStore, useGameSettingStore } from "../../pages/MultiGamePage";

type Props = {
  isLoaded: string
};
export const MultiWaitingPage = ({isLoaded}: Props) => {
  const mapRef = useRef<naver.maps.Map | google.maps.Map | null>(null);
  const markerRef = useRef<naver.maps.Marker | google.maps.Marker | null>(null);
  const { connection, id, name } = useUserStore();
  const { domestic, submittedPosition } = useGameInfoStore();
  useEffect(() => { 
    console.log("ㅇㅇ", isLoaded);
    console.log("ㅇㅇㅇ", submittedPosition);
    if (isLoaded !== "ready") return;
    if (domestic && submittedPosition !== null && naver.maps.Map) {
      // 네이버 지도를 보여줘야 하는 경우
      mapRef.current = new naver.maps.Map("waitingmap", {
        center: new naver.maps.LatLng(submittedPosition.lat, submittedPosition.lng)
      })
      markerRef.current = new naver.maps.Marker({
        map: mapRef.current,
        position: new naver.maps.LatLng(submittedPosition.lat, submittedPosition.lng),
      })
    }
    else if (!domestic && submittedPosition !== null && google.maps.Map) { 
      mapRef.current = new google.maps.Map(document.getElementById("waitingmap") as HTMLElement, {
        center: new google.maps.LatLng(submittedPosition.lat, submittedPosition.lng),
        zoom: 14,
        fullscreenControl: false,
        panControl: false,
        disableDefaultUI: true,
        clickableIcons: false,
      });
      markerRef.current = new google.maps.Marker({
        map: mapRef.current,
        position: new google.maps.LatLng(submittedPosition.lat, submittedPosition.lng),
      })
    }
  }, [isLoaded])

  return (
    <PickerContainer>
      <MapContainer id="waitingmap">
      </MapContainer>
    </PickerContainer>
  );
};

const PickerContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
`
const MapContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 50vw;
  height: 50vh;
  background: rgba(255, 255, 255, 1);
  border-radius: 1.5rem;
  border: none;
`