import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CgArrowsExpandLeft } from "react-icons/cg";
import useLoadScript from "../../../action/hooks/useLoadScript";
import { Timer } from "../../component/multi/Timer";
import { Ranking } from "../../component/multi/Ranking";
type Props = {
  isObserver: boolean,
};
export const MultiGameDomestic = (props: Props) => {
  const isLoaded = useLoadScript("https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=4vgyzjsnlj&submodules=panorama");
  const mapRef = useRef<naver.maps.Map | null>(null);
  const panoRef = useRef<naver.maps.Panorama | null>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);
  const [isExpand, setIsExpand] = useState(false);
  useEffect(() => {
    console.log(isLoaded);
    if (isLoaded !== "ready") return;
    (naver.maps as any).onJSContentLoaded = () => { 
      panoRef.current = new naver.maps.Panorama(
        document.getElementById("pano") as HTMLElement,
        {
          position: startPos,
          flightSpot: false,
        }
      );
    }
    console.log(naver.maps.Panorama);
    
    const startPos = new naver.maps.LatLng(37.3599605, 127.1058814);
    // 지도 객체 없으면 초기화
    if (mapRef.current === null) { 
      mapRef.current = new naver.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: startPos,
          zoom: 14,
          scaleControl: false,
        }
      );
      // mapRef.current.addListener("click", (event: naver.maps.ev) => { 
      //   const clickedPos = event.latLng;
      //   if (markerRef.current != null) {
      //     markerRef.current.setPosition(clickedPos);
      //   } else { 
      //     markerRef.current = new google.maps.Marker({
      //       map: mapRef.current,
      //       position: clickedPos,
      //       title: "ㅎㅇ"
      //     })
      //   }
      // })
      if (controlRef.current !== null) {
        // mapRef.current.controls[naver.maps.Position.TOP_LEFT].push(controlRef.current);
      }
    }
    // 파노라마(스트리트 뷰) 객체 없으면 초기화
    if (panoRef.current === null && naver.maps.Panorama !== undefined) { 
      panoRef.current = new naver.maps.Panorama(
        document.getElementById("pano") as HTMLElement,
        {
          position: startPos,
          flightSpot: false,
        }
      );
    }
  }, [isLoaded, window.naver]);
  return (
    <div>
      <StreetViewContent id="pano">
        <Timer />
        <Ranking />
        <MapContent id="map" isExpand={isExpand}> 
        </MapContent>
      </StreetViewContent>
      <div ref={controlRef}>
        <CustomButton onClick={() => {setIsExpand(prevData=>!prevData)}}>
          <CgArrowsExpandLeft />
        </CustomButton>
      </div>
    </div>
  );
};

const MapContent = styled.div<{isExpand: boolean}>`
  width: ${(props)=>props.isExpand ? "40vw" : "25vw"};
  height: ${(props)=>props.isExpand ? "40vh" : "25vh"};
  position: absolute;
  z-index: 999;
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