import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CgArrowsExpandLeft } from "react-icons/cg";
import useLoadScript from "../../../action/hooks/useLoadScript";
import { Timer } from "../../component/multi/Timer";
import { Ranking } from "../../component/multi/Ranking";
type Props = {
  
};

export const MultiGameProgress = (props: Props) => {
  const isLoaded = useLoadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC5fl-yV_BZhfIXZYDpU4JnCwFGDhd8oQA");
  const mapRef = useRef<google.maps.Map | null>(null);
  const panoRef = useRef<google.maps.StreetViewPanorama | null>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [isExpand, setIsExpand] = useState(false);
  useEffect(() => {
    if (isLoaded === "loading") return;
    const startPos = { lat: 42.345573, lng: -71.098326 };
    // 지도 객체 없으면 초기화
    if (mapRef.current === null) { 
      mapRef.current = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: startPos,
          zoom: 14,
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
            title: "ㅎㅇ"
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
          position: startPos,
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
  }, [isLoaded]);
  return (
    <div>
      <MapContent id="map" isExpand={isExpand}> 
      </MapContent>
      <StreetViewContent id="pano">
      </StreetViewContent>
      <div ref={controlRef}>
        <CustomButton onClick={() => {setIsExpand(prevData=>!prevData)}}>
          <CgArrowsExpandLeft />
        </CustomButton>
      </div>
      <Timer />
      <Ranking />
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