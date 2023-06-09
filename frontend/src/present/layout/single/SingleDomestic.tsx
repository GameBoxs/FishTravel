import React, { useEffect, useRef, useState } from "react";
import * as Style from './SingleDomestic.Styled';
import * as Api from '../../../action/module/singleplay/domestic/SingleDomesticAPI';
import FinishBtn from "../../component/single/FinishBtn";
import ResultMap from "../../component/single/ResultMap";
import CountTimer from "../../component/single/CountTimer";

const SingleDomestic = () => {
    const naver = window.naver;
    const [currentStage, setCurrentStage] = useState(0);
    const [currentState, setCurrentState] = useState(0);
    const [selectPosition, setSelectPosition] = useState<null | naver.maps.LatLng>(null);
    const [answerPosition, setAnswerPosition] = useState<naver.maps.LatLng>(new naver.maps.LatLng(36.48800827917877, 126.3337966701461));
    const [timer, setTimer] = useState(120);
    
    const mapRef = useRef<HTMLDivElement | null>(null);
    const roadRef = useRef<HTMLDivElement | null>(null);
    const mapObject = useRef<null | naver.maps.Map>(null);
    const roadObject = useRef<null | naver.maps.Panorama>(null);
    let selectMarker = useRef<null | naver.maps.Marker>(null);
    let answerMarker = useRef<null | naver.maps.Marker>(null);
    let idxArr = useRef([-1, -1, -1]);
    
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
        if(currentState == 0) {
            let tempLatLng = changeAnswerPosition();
            resetData(tempLatLng);
        }
    },[currentState])

    useEffect(() => {
        if(timer == 0) {
            setTimeout(() => finishStage(), 500);
        }
    },[timer])

    const finishStage = () => {
        setTimer(0);
        setCurrentState(1);
    }
    const resetData = (answerPosition:naver.maps.LatLng) => {
        selectMarker.current?.setMap(null);
        selectMarker.current = null;
        setTimer(120);
        setCurrentStage(currentStage+1);
        setSelectPosition(null);
        mapObject.current = null;
        roadObject.current = null;
        let data: Api.InitType = {mapRef, roadRef, mapObject, roadObject, selectPosition, setSelectPosition, selectMarker, answerPosition};
        Api.Init(data);
    }
    const startStage =() => {
        setCurrentState(0);
    }
    const changeAnswerPosition = () => {
        let dataSetSize = Api.getDataSetSize();
        let randomIdx = Math.floor(Math.random() * dataSetSize);
        while(true) {
            if(idxArr.current.indexOf(randomIdx) === -1) {
                break;
            }
            randomIdx = Math.floor(Math.random() * dataSetSize);
        }
        setAnswerPosition(Api.getDataSet(randomIdx));
        idxArr.current[currentStage] = randomIdx;
        return Api.getDataSet(randomIdx);
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
                :<ResultMap selectPosition={selectPosition} currentStage={currentStage} startStage={startStage} answerPosition={answerPosition}/>
            }
        </Style.SingleWrapper>
    )
}

export default SingleDomestic;