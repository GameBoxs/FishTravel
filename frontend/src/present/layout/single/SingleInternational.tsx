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
    const [timer, setTimer] = useState(120);

    const mapRef = useRef<HTMLDivElement | null>(null);
    const roadRef = useRef<HTMLDivElement | null>(null);
    const mapObject = useRef<null | google.maps.Map>(null);
    const roadObject = useRef<null | google.maps.StreetViewPanorama>(null);
    let selectMarker = useRef<null | google.maps.Marker>(null);
    let answerMarker = useRef<null | google.maps.Marker>(null);

    useEffect(() => {
        if(currentState == 0) {
            resetData();
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
    const resetData = () => {
        selectMarker.current?.setMap(null);
        selectMarker.current = null;
        setTimer(120);
        setCurrentStage(currentStage+1);
        setSelectPosition(null);
        mapObject.current = null;
        roadObject.current = null;
        let data: Api.InitType = {mapRef, roadRef, mapObject, roadObject, selectPosition, setSelectPosition, selectMarker};
        Api.Init(data);
    }
    const startStage =() => {
        setCurrentState(0);
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
                <ResultMapGoogle selectPosition={selectPosition} currentStage={currentStage} startStage={startStage}/>
            }
        </Style.SingleWrapper>
    )
}

export default SingleInternational;