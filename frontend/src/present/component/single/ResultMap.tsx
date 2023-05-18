import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import * as Style from "./ResultMap.Styled";
import * as Api from "../../../action/module/singleplay/domestic/SingleDomesticResultAPI";

type propsType = {
    selectPosition: naver.maps.LatLng | null;
    answerPosition: naver.maps.LatLng;
    currentStage: number;
    startStage: () => void;
}

const ResultMap = (props:propsType) => {
    const {currentStage, selectPosition, startStage, answerPosition} = props;
    const moveNavigation = useNavigate();
    
    const [distancePoint, setDistancePoint] = useState("");
    const [distanceUnit, setDistanceUinit] = useState(" M");

    const resultMapRef = useRef<HTMLDivElement | null>(null);
    const resultMapObject = useRef<naver.maps.Map | null>(null);
    
    useEffect(() => {
        let data:Api.ResultInitType = {resultMapRef, answerPosition, selectPosition, resultMapObject};
        const initDatas = Api.initMap(data);
        if(initDatas) setTimeout(() => {makeMarker(initDatas)}, 500);
    },[]);

    const makeMarker = (initDatas:Api.ResultInitReturnType) => {
        let tempDistance = Math.trunc(initDatas.distancePoint);
        if(Math.trunc(tempDistance / 1000) > 0) {
            tempDistance = tempDistance/1000;
            setDistancePoint(tempDistance.toFixed(2));
            setDistanceUinit(" KM");
        } else {
            setDistancePoint(Math.trunc(initDatas.distancePoint).toString());
            setDistanceUinit(" M");
        }
        resultMapObject.current = initDatas.resultMapObject.current ? initDatas.resultMapObject.current : null;
        Api.makeMarker({selectPosition, answerPosition, resultMapObject});
    }
    const moveHome = () => {
        moveNavigation('/');
    }

    return (
        answerPosition ?
        <Style.ResultWrapper>
            <Style.StageText>Stage {currentStage}</Style.StageText>
            <Style.ResultMap ref={resultMapRef} />
            <Style.ResultInfo>
                <Style.ResultText>떨어진 거리</Style.ResultText>
                <Style.ResultText>{distancePoint}{distanceUnit}</Style.ResultText>
            </Style.ResultInfo>
            {
                currentStage != 3 ? 
                <Style.ResultNextBtn onClick={startStage}>Next</Style.ResultNextBtn>
                :
                <Style.ResultNextBtn onClick={moveHome}>Finish</Style.ResultNextBtn>
            }
        </Style.ResultWrapper>
        : <h1>로딩중</h1>
    )
}

export default ResultMap;