import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useGameInfoStore } from "../../pages/MultiGamePage";
import { ImCheckmark } from "react-icons/im";
import { Timer } from "../../component/multi/Timer";
import { useUserStore } from "../../../store/userStore";
import { Client } from "@stomp/stompjs";

type Props = {
  isLoaded: string
};
export const MultiGamePicker = ({isLoaded}: Props) => {
  const mapRef = useRef<naver.maps.Map | google.maps.Map | null>(null);
  const markerRef = useRef<naver.maps.Marker | google.maps.Marker | null>(null);
  const { connection, id, name } = useUserStore();
  const { roomId, domestic } = useGameInfoStore();
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => { 
    if (isLoaded !== "ready") return;
    if (domestic && naver.maps.Map) {
      // 네이버 지도를 보여줘야 하는 경우
      mapRef.current = new naver.maps.Map("pickermap", {
        center: new naver.maps.LatLng(36.1146, 128.3645),
        zoom: 1,
      })
      markerRef.current = new naver.maps.Marker({
        map: mapRef.current,
        position: new naver.maps.LatLng(0, 0),
      })
      naver.maps.Event.addListener(mapRef.current, 'click', function (e: naver.maps.PointerEvent) {
        if (markerRef.current && markerRef.current instanceof naver.maps.Marker) { 
          markerRef.current.setPosition(e.coord);
          markerRef.current.setAnimation(naver.maps.Animation.BOUNCE)
        }
      });
    }
    else if (!domestic && google.maps.Map) { 
      mapRef.current = new google.maps.Map(document.getElementById("pickermap") as HTMLElement, {
        center: new google.maps.LatLng(36.1146, 128.3645),
        zoom: 1,
        fullscreenControl: false,
        panControl: false,
        disableDefaultUI: true,
        clickableIcons: false,
      });
      markerRef.current = new google.maps.Marker({
        map: mapRef.current,
        position: new google.maps.LatLng(0, 0),
      })
      mapRef.current.addListener("click", (event: google.maps.MapMouseEvent) => { 
        const clickedPos = event.latLng;
        if (markerRef.current && markerRef.current instanceof google.maps.Marker) { 
          markerRef.current.setPosition(clickedPos);
        }
      })
    }
  }, [isLoaded])

  const handlePicker = () => { 
    const pos = markerRef.current?.getPosition();
    if (naver && pos instanceof naver.maps.LatLng) {
      if (pos.lat() === 0 && pos.lng() === 0) { 
        alert("위치를 지정하고 다시 시도해주세요.");
        return;
      }
      (connection as Client).publish({
        destination: `/pub/room/${roomId}/pickfish`,
        body: JSON.stringify({
          name: name,
          lat: pos.lat(),
          lng: pos.lng(),
          requester: {
            id: id,
            name: name
          }
        })
      })
    } else if (google && pos instanceof google.maps.LatLng) { 
      if (pos.lat() === 0 && pos.lng() === 0) { 
        alert("위치를 지정하고 다시 시도해주세요.");
        return;
      }
      (connection as Client).publish({
        destination: `/pub/room/${roomId}/pickfish`,
        body: JSON.stringify({
          name: name,
          lat: pos.lat(),
          lng: pos.lng(),
          requester: {
            id: id,
            name: name
          }
        })
      })
    }
    setIsFixed(true);
  }
  return (
    <PickerContainer>
      <Timer initialTime={20}/>
      <MapContainer id="pickermap">
      </MapContainer>
      <PickingButton onClick={handlePicker} disabled={isFixed} isDisabled={isFixed}>
        <ImCheckmark />
        <Seperator />
        선택
      </PickingButton>
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
const PickingButton = styled.button<{isDisabled: boolean}>`
  position: absolute;
  width: 50vw;
  left: 50%;
  height: 10vh;
  transform: translateX(-50%);
  bottom: 10vh;
  font-size: xx-large;
  border-radius: 2.5rem;
  border: none;
  font-weight: bold;
  background: ${(props)=>props.isDisabled ? "#AAAAAA" : "#48d845"};
  color: white;
`
const Seperator = styled.span`
  content: '';
  display: inline-block;
  background: #FFF;
  margin: 0px 8vw;
  height: 50%;
  width: 4px;
  vertical-align: middle;
`

