import React, { useEffect, useRef, useState } from 'react';
import * as Style from './SingleInternational.Styled';
import * as Api from '../../../action/module/singleplay/international/SingleInternationalAPI';
import FinishBtn from '../../component/single/FinishBtn';
import CountTimer from '../../component/single/CountTimer';
import ResultMapGoogle from '../../component/single/ResultMapGoogle';

const SingleInternational = () => {
    const google = window.google;
    const [currentStage, setCurrentStage] = useState(0);
    const [currentState, setCurrentState] = useState(0);
    const [selectPosition, setSelectPosition] = useState<null | google.maps.LatLng>(null);
    const [answerPosition, setAnswerPosition] = useState<google.maps.LatLng>(new google.maps.LatLng(36.48800827917877, 126.3337966701461));
    const [timer, setTimer] = useState(120);

    const mapRef = useRef<HTMLDivElement | null>(null);
    const roadRef = useRef<HTMLDivElement | null>(null);
    const mapObject = useRef<null | google.maps.Map>(null);
    const roadObject = useRef<null | google.maps.StreetViewPanorama>(null);
    let selectMarker = useRef<null | google.maps.Marker>(null);
    let answerMarker = useRef<null | google.maps.Marker>(null);
    let idxArr = useRef([-1, -1, -1]);

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
    const resetData = (answerPosition:google.maps.LatLng) => {
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
                :
                <ResultMapGoogle selectPosition={selectPosition} currentStage={currentStage} startStage={startStage} answerPosition={answerPosition}/>
            }
        </Style.SingleWrapper>
    )
}

export default SingleInternational;