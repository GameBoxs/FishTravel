import React, { useEffect, useRef, useState } from "react";
import * as Style from './SingleDomestic.Styled';
import * as Api from '../../../action/module/singleplay/domestic/SingleDomesticAPI';
import FinishBtn from "../../component/single/FinishBtn";
import ResultMap from "../../component/single/ResultMap";
import CountTimer from "../../component/single/CountTimer";

const SingleDomestic = () => {
    const naver = window.naver;
    const [currentStage, setCurrentStage] = useState(1);
    const [currentState, setCurrentState] = useState(0);
    const [selectPosition, setSelectPosition] = useState<null | naver.maps.LatLng>(null);
    const [timer, setTimer] = useState(120);

    const mapRef = useRef<HTMLDivElement | null>(null);
    const roadRef = useRef<HTMLDivElement | null>(null);
    const mapObject = useRef<null | naver.maps.Map>(null);
    const roadObject = useRef<null | naver.maps.Panorama>(null);
    let selectMarker = useRef<null | naver.maps.Marker>(null);
    let answerMarker = useRef<null | naver.maps.Marker>(null);

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
        if(timer == 0) {
            setTimeout(() => finishStage(), 500);
        }
    },[timer])

    useEffect(() => {
        let data: Api.InitType = {mapRef, roadRef, mapObject, roadObject, selectPosition, setSelectPosition, selectMarker};
        Api.Init(data);
    },[])

    const finishStage = () => {
        setTimer(0);
        setCurrentState(1);
    }

    return (
        <Style.SingleWrapper>
            {
                currentState == 0 ? 
                <Style.ViewWrapper>
                    <CountTimer timer={timer} setTimer={setTimer}/>
                    <Style.RoadWrapper ref={roadRef} className="panorama" />
                    <Style.MapWrapper ref={mapRef} className="map" />
                    {
                        selectPosition ? <FinishBtn finishStage={finishStage} /> : null
                    }
                </Style.ViewWrapper>
                :<ResultMap selectPosition={selectPosition} currentStage={currentStage}/>
            }
        </Style.SingleWrapper>
    )
}

export default SingleDomestic;