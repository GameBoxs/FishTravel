import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import * as Style from "./ResultMapGoogle.Styled";
import * as Api from "../../../action/module/singleplay/international/SingleInternationalResultAPI";

type propsType = {
    selectPosition: google.maps.LatLng | null;
    currentStage: number;
    startStage: () => void;
}

const ResultMapGoogle = (props:propsType) => {
    const {currentStage, selectPosition, startStage} = props;
    const moveNavigation = useNavigate();
    
    const [answerPosition, setAnswerPosition] = useState<null | google.maps.LatLng>(new google.maps.LatLng(36.1073, 128.4175));
    const [distancePoint, setDistancePoint] = useState(0);

    const resultMapRef = useRef<HTMLDivElement | null>(null);
    const resultMapObject = useRef<google.maps.Map | null>(null);
    
    useEffect(() => {
        let data:Api.ResultInitType = {resultMapRef, answerPosition, selectPosition, resultMapObject};
        const initDatas = Api.initMap(data);
        if(initDatas) setTimeout(() => {makeMarker(initDatas)}, 500);
    },[]);

    const makeMarker = (initDatas:Api.ResultInitReturnType) => {
        setDistancePoint(Math.trunc(initDatas.distancePoint));
        console.log(initDatas.resultMapObject.current);
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
                <Style.ResultText>Score</Style.ResultText>
                <Style.ResultText>{distancePoint}M</Style.ResultText>
                <Style.ResultText>4</Style.ResultText>
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

export default ResultMapGoogle;