import React, { useEffect, useRef, useState } from "react";
import * as Style from './SingleDomestic.Styled';

const SingleDomestic = () => {
    const naver = window.naver;
    const [currentStage, setCurrentStage] = useState(1);
    const [currentState, setCurrentState] = useState(0);
    const [selectPosition, setSelectPosition] = useState();
    const [answerPosition, setAnswerPosition] = useState();

    const mapRef = useRef<HTMLDivElement | null>(null);
    const roadRef = useRef<HTMLDivElement | null>(null);
    const mapObject = useRef<null | naver.maps.Map>(null);
    const roadObject = useRef<null | naver.maps.Panorama>(null);

    useEffect(() => {
        const handleResize = () => {
            if (!roadObject.current) return;
            roadObject.current.setSize(new naver.maps.Size(window.innerWidth, window.innerHeight));
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if(currentStage == 0) {

        }
    },[currentStage])

    useEffect(() => {
        if(!mapRef.current || !roadRef.current) return;
        const map:naver.maps.Map = new naver.maps.Map(mapRef.current, {
            center: new naver.maps.LatLng(36.6349, 127.9076),
            zoom: 1,
            logoControl: false,
            mapDataControl: false,
            zoomControl: false,
            scaleControl: false
        });
        const pano = new naver.maps.Panorama(roadRef.current, {
            position: new naver.maps.LatLng(36.1073, 128.4175),
            aroundControl: false,
        })
        mapObject.current = map;
        roadObject.current = pano;
        naver.maps.Event.addListener(pano, "pano_status", () => {
            if(!roadRef.current) return;
            const spans = roadRef.current.querySelectorAll('span');
            for (const span of spans) {
                span.className = "roadText";
            }
        })
        roadRef.current.style.position = 'absolute';
        mapRef.current.style.position = 'absolute';
    },[])

    return (
        <Style.SingleWrapper>
            {
                currentState == 0 ? 
                <Style.ViewWrapper>
                    <Style.RoadWrapper ref={roadRef} className="panorama">
                    </Style.RoadWrapper>
                    <Style.MapWrapper ref={mapRef} className="map">
                    </Style.MapWrapper>
                </Style.ViewWrapper>
                : null
            }
        </Style.SingleWrapper>
    )
}

export default SingleDomestic;