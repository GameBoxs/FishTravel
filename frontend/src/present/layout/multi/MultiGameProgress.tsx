import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CgArrowsExpandLeft } from "react-icons/cg";
import useLoadScript from "../../../action/hooks/useLoadScript";
type Props = {
  
};

export const MultiGameProgress = (props: Props) => {
  const isLoaded = useLoadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC5fl-yV_BZhfIXZYDpU4JnCwFGDhd8oQA");
  const mapRef = useRef<google.maps.Map | null>(null);
  const panoRef = useRef<google.maps.StreetViewPanorama | null>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const [isExpand, setIsExpand] = useState(false);
  useEffect(() => {
    if (isLoaded === "loading") return;
    const fenway = { lat: 42.345573, lng: -71.098326 };
    if (mapRef.current === null) { 
      mapRef.current = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: fenway,
          zoom: 14,
          fullscreenControl: false,
          panControl: false,
          disableDefaultUI: true,
        }
      );
      if (controlRef.current !== null) { 
        mapRef.current.controls[google.maps.ControlPosition.LEFT_TOP].push(controlRef.current);
      }
    }
    if (panoRef.current === null) { 
      panoRef.current = new google.maps.StreetViewPanorama(
        document.getElementById("pano") as HTMLElement,
        {
          position: fenway,
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
    </div>
  );
};

const MapContent = styled.div<{isExpand: boolean}>`
  width: ${(props)=>props.isExpand ? "40vw" : "20vw"};
  height: ${(props)=>props.isExpand ? "40vh" : "20vh"};
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