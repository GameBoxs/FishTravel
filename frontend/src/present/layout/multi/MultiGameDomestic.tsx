import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CgArrowsExpandLeft } from "react-icons/cg";
import { GrPowerReset } from "react-icons/gr";
import useLoadScript from "../../../action/hooks/useLoadScript";
import { Timer } from "../../component/multi/Timer";
import { Ranking } from "../../component/multi/Ranking";
import { useGameInfoStore } from "../../pages/MultiGamePage";
import { useUserStore } from "../../../store/userStore";
import { TMessageCode } from "../../pages";
import { Client } from "@stomp/stompjs";
type Props = {
  isObserver: boolean,
};
export const MultiGameDomestic = ({isObserver}: Props) => {
  const isLoaded = useLoadScript("https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=4vgyzjsnlj&submodules=panorama");
  const mapRef = useRef<naver.maps.Map | null>(null);
  const panoRef = useRef<naver.maps.Panorama | null>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);
  const observerMarkerArrayRef = useRef<Array<naver.maps.Marker>>([]);
  const [isExpand, setIsExpand] = useState(false);
  const { problemPosition, roomId, observingMarkerArray } = useGameInfoStore();
  const { connection, name, id } = useUserStore();
  const handleConfirmLocation = () => { 
    const pos = markerRef.current?.getPosition();
    if (markerRef.current && pos) {
      console.log(markerRef.current);
      (connection as Client).publish({
        destination: `/pub/room/${roomId}/answer`,
        body: JSON.stringify({
          name: name,
          lat: pos.y,
          lng: pos.x,
          requester: {
            id: id,
            name: name
          }
        })
      })
    } else { 
      alert("위치를 선택하고 확정 버튼을 눌러주세요.");
    }
  }
  useEffect(() => {
    // Naver Map API js 파일 로딩 전에는 로직 수행하지 않음.
    if (isLoaded !== "ready") return;
    if (isObserver) { 
      if (mapRef.current === null && problemPosition !== null) {
        mapRef.current = new naver.maps.Map(
          document.getElementById("obsmap") as HTMLElement,
          {
            center: new naver.maps.LatLng(problemPosition.lat, problemPosition.lng),
            zoom: 3,
            scaleControl: false,
          }
        );
      }
    }
    else { 
      if (naver.maps.Panorama && problemPosition !== null) { 
        panoRef.current = new naver.maps.Panorama(
          document.getElementById("pano") as HTMLElement,
          {
            position: new naver.maps.LatLng(problemPosition.lat, problemPosition.lng),
            flightSpot: false,
          }
        );
        // 파노라마 객체 초기화 이벤트 트리거되면, visible 하도록 설정.
        naver.maps.Event.addListener(panoRef.current, "init", () => { 
          panoRef.current?.setVisible(true);
        })
      }
      // submodule 포함해서 js 파일 다 로딩되었으면 파노라마 객체 초기화 하도록 설정.
      (naver.maps as any).onJSContentLoaded = () => { 
        // 파노라마(스트리트 뷰) 객체 초기화
        if (problemPosition !== null) { 
          panoRef.current = new naver.maps.Panorama(
            document.getElementById("pano") as HTMLElement,
            {
              position: new naver.maps.LatLng(problemPosition.lat, problemPosition.lng),
              flightSpot: false,
            }
          );
        }
        // 파노라마 객체 초기화 이벤트 트리거되면, visible 하도록 설정.
        naver.maps.Event.addListener(panoRef.current, "init", () => { 
          panoRef.current?.setVisible(true);
        })
      }
      
      // 지도 객체 없으면 초기화
      if (mapRef.current === null&& problemPosition !== null) { 
        mapRef.current = new naver.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            center: new naver.maps.LatLng(problemPosition.lat, problemPosition.lng),
            zoom: 1,
            scaleControl: false,
          }
        );
        // 사용자 커스텀 컨트롤 (지도 확장 버튼) 추가
        naver.maps.Event.once(mapRef.current, 'init', () => { 
          (mapRef.current?.controls as any)[naver.maps.Position.LEFT_TOP].push(controlRef.current)
        })
        // 지도 클릭시 마커 찍도록 설정
        naver.maps.Event.addListener(mapRef.current, 'click', function (e: naver.maps.PointerEvent) {
          console.log(markerRef.current);
          if (markerRef.current === null) {
            markerRef.current = new naver.maps.Marker(
              {
                map: mapRef.current!,
                clickable: false,
                position: e.coord,
              }
            )
          } else { 
            markerRef.current.setPosition(e.coord);
          }
        });
      }
    }
  }, [isLoaded]);
  useEffect(() => { 
    if (mapRef.current === null) return;
    for (const obsMarker of observingMarkerArray) { 
      const foundMarker = observerMarkerArrayRef.current.find((m) => m.getTitle() === obsMarker.requester.name);
      if (foundMarker) {
        foundMarker.setPosition(new naver.maps.LatLng(obsMarker.lat, obsMarker.lng));
      } else { 
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(obsMarker.lat, obsMarker.lng),
          title: obsMarker.requester.name,
          map: mapRef.current,
        });
        observerMarkerArrayRef.current.push(marker)
        const info = new naver.maps.InfoWindow({
          content: `
          <div style="padding: 8px; border: 2px solid black; border-radius: 2rem; text-align: center;">
            <h3>${obsMarker.requester.name}</h3>
          </div>
          `,
          borderWidth: 0,
        })
        marker.addListener("mouseover", () => { 
          if (mapRef.current && mapRef.current instanceof naver.maps.Map && marker instanceof naver.maps.Marker) { 
            info.open(mapRef.current, marker);
          }
        })
        marker.addListener("mouseout", () => {
          if (info.getMap()) info.close();
        })
      }
    }
  }, [observingMarkerArray])
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {isObserver && <React.Fragment>
        <ObserverMapContent id="obsmap" />
      </React.Fragment>}
      {!isObserver &&
        <React.Fragment>
          <MapContent id="map" isExpand={isExpand}> 
          </MapContent>
          <StreetViewContent id="pano">
          </StreetViewContent>
          <DecisionButton isExpand={isExpand} isReset={true} onClick={() => {
            if (problemPosition !== null) { 
              panoRef.current?.setPosition(new naver.maps.LatLng(problemPosition.lat, problemPosition.lng));
            }
          }}>
            <GrPowerReset />
          </DecisionButton>
          <DecisionButton isExpand={isExpand} isReset={false} onClick={handleConfirmLocation}>
            결정
          </DecisionButton>
          <div ref={controlRef}>
            <CustomButton onClick={() => {setIsExpand(prevData=>!prevData)}}>
              <CgArrowsExpandLeft />
            </CustomButton>
          </div>
      </React.Fragment> }
      <Timer initialTime={30} />
      <Ranking isDomestic={true} />
    </div>
  );
};

const MapContent = styled.div<{isExpand: boolean}>`
  width: ${(props)=>props.isExpand ? "40vw" : "25vw"};
  height: ${(props)=>props.isExpand ? "40vh" : "25vh"};
  position: absolute !important;
  z-index: 100;
  bottom: 0;
  right: 0;
  -webkit-transition: width 1s ease-in-out;
  -moz-transition: width 1s ease-in-out;
  -o-transition: width 1s ease-in-out;
  transition: all 0.5s ease-in-out;
  transform: translate3d(0, 0, 0);
  & > div {
    z-index: 999;
  }
`

const StreetViewContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  span {
    display: none !important;
  }
`
const CustomButton = styled.button`
  border-width: 0px;
  padding: 4px;
`

const ObserverMapContent = styled.div`
  width: 100vw;
  height: 100vh;
`
const ChattingInput = styled.input`
  position: absolute;
  bottom: 10vh;
  left: 50%;
  transform: translateX(-50%);
  width: 60vw;
  height: 5vh;
  font-size: xx-large;
  padding: 2vh;
  border: none;
  border-radius: 2rem;
  background-color: rgba(255,255,255, 0.5);
  :hover, :focus {
    background-color: rgba(255,255,255, 1);
  }
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
`

const DecisionButton = styled.button<{isExpand: boolean, isReset: boolean}>`
  position: absolute;
  width: ${(props) => props.isReset ? (props.isExpand ? "8vw" : "5vw") : (props.isExpand ? "28.8vw" : "18vw")};
  height: 50px;
  margin: 1vw;
  bottom: ${(props) => props.isExpand ? "40vh" : "25vh"};
  border: none;
  border-radius: 2rem;
  right: ${(props) => props.isReset ? (props.isExpand ? "29.8vw" : "19vw") : "0"};
  -webkit-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  -o-transition: all 1s ease-in-out;
  transition: all 0.5s ease-in-out;
  transform: translate3d(0, 0, 0);
  font-size: large;
  font-weight: bold;
  background: ${(props) => props.isReset ? "#4681f4" : "#33b249"};
  color: white;
`