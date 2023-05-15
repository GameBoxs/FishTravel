import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CgArrowsExpandLeft } from "react-icons/cg";
import useLoadScript from "../../../action/hooks/useLoadScript";
import { Timer } from "../../component/multi/Timer";
import { Ranking } from "../../component/multi/Ranking";
import { GrPowerReset } from "react-icons/gr";
import { useGameSettingStore } from "../../pages/MultiGamePage";
type Props = {
  isObserver: boolean,
};
export const MultiGameInternational = ({ isObserver }: Props) => {
  const isLoaded = useLoadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC5fl-yV_BZhfIXZYDpU4JnCwFGDhd8oQA");
  const mapRef = useRef<google.maps.Map | null>(null);
  const panoRef = useRef<google.maps.StreetViewPanorama | null>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [isExpand, setIsExpand] = useState(false);
  const initialPosition = useRef<google.maps.LatLng | null>(null);
  const { setGameStage } = useGameSettingStore();
  const handleConfirmLocation = () => { 
    setGameStage(3);
  }
  useEffect(() => {
    if (isLoaded === "loading") return;
    initialPosition.current = new google.maps.LatLng(37.3599605, 127.1058814);
    if (isObserver) {
      // 지도 객체 없으면 초기화
      if (mapRef.current === null) {
        mapRef.current = new google.maps.Map(
          document.getElementById("obsmap") as HTMLElement,
          {
            center: initialPosition.current ? initialPosition.current : new google.maps.LatLng(33, 128),
            zoom: 3,
            fullscreenControl: false,
            panControl: false,
            disableDefaultUI: true,
            clickableIcons: false,
          }
        );
      }
    } else { 
      // 지도 객체 없으면 초기화
      if (mapRef.current === null) { 
        mapRef.current = new google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            center: initialPosition.current ? initialPosition.current : new google.maps.LatLng(33, 128),
            zoom: 1,
            fullscreenControl: false,
            panControl: false,
            disableDefaultUI: true,
            clickableIcons: false,
          }
        );
        mapRef.current.addListener("click", (event: google.maps.MapMouseEvent) => { 
          const clickedPos = event.latLng;
          if (markerRef.current != null) {
            markerRef.current.setPosition(clickedPos);
          } else { 
            markerRef.current = new google.maps.Marker({
              map: mapRef.current,
              position: clickedPos,
            })
          }
        })
        if (controlRef.current !== null) { 
          mapRef.current.controls[google.maps.ControlPosition.LEFT_TOP].push(controlRef.current);
        }
      }
      // 파노라마(스트리트 뷰) 객체 없으면 초기화
      if (panoRef.current === null) { 
        panoRef.current = new google.maps.StreetViewPanorama(
          document.getElementById("pano") as HTMLElement,
          {
            position: initialPosition.current,
            pov: {
              heading: 34,
              pitch: 10,
            },
            motionTracking: false,
            motionTrackingControl: false,
            zoomControl: false,
            fullscreenControl: false,
          }
        );
        panoRef.current.setOptions({
          addressControl: false,
          showRoadLabels: false,
        });
      }
    }
  }, [isLoaded]);
  return (
    <div>
      {isObserver && <>
        <ObserverMapContent id="obsmap">
        </ObserverMapContent>
        <ChattingInput></ChattingInput>
      </>}
      {!isObserver && <>
      <MapContent id="map" isExpand={isExpand}> 
      </MapContent>
      <StreetViewContent id="pano">
      </StreetViewContent>
      <div ref={controlRef}>
        <CustomButton onClick={() => {setIsExpand(prevData=>!prevData)}}>
          <CgArrowsExpandLeft />
        </CustomButton>
      </div>
      <DecisionButton isExpand={isExpand} isReset={true} onClick={() => {
        if (initialPosition.current === null) { return; }
        panoRef.current?.setPosition(initialPosition.current);
      }}>
        <GrPowerReset />
      </DecisionButton>
      <DecisionButton isExpand={isExpand} isReset={false} onClick={handleConfirmLocation}>
        결정
      </DecisionButton>
      </>}
      <Timer isDomestic={false} />
      <Ranking isDomestic={true} />
    </div>
  );
};

const MapContent = styled.div<{isExpand: boolean}>`
  width: ${(props)=>props.isExpand ? "40vw" : "25vw"};
  height: ${(props)=>props.isExpand ? "40vh" : "25vh"};
  position: absolute;
  z-index: 10;
  bottom: 0;
  right: 0;
  -webkit-transition: width 1s ease-in-out;
  -moz-transition: width 1s ease-in-out;
  -o-transition: width 1s ease-in-out;
  transition: all 0.5s ease-in-out;
`

const StreetViewContent = styled.div`
  width: 100vw;
  height: 100vh;
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
  border-radius: 1rem;
  right: ${(props) => props.isReset ? (props.isExpand ? "29.8vw" : "19vw") : "0"};
  -webkit-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  -o-transition: all 1s ease-in-out;
  transition: all 0.5s ease-in-out;
  transform: translate3d(0, 0, 0);
  font-size: large;
  z-index: 999;
  background: rgb(255,255,255);
  font-weight: bold;
  :hover {
    background: rgba(157,165,255);
    color: white;
  }
`