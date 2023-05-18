import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import * as Style from "./ResultMapGoogle.Styled";
import * as Api from "../../../action/module/singleplay/international/SingleInternationalResultAPI";
import { SingleLoading } from "../../layout/single/SingleLoading";

type propsType = {
    selectPosition: google.maps.LatLng | null;
    answerPosition: google.maps.LatLng;
    currentStage: number;
    startStage: () => void;
}

const ResultMapGoogle = (props:propsType) => {
    const {currentStage, selectPosition, startStage, answerPosition} = props;
    const moveNavigation = useNavigate();
    
    const [distancePoint, setDistancePoint] = useState("");
    const [distanceUnit, setDistanceUinit] = useState(" M");

    const resultMapRef = useRef<HTMLDivElement | null>(null);
    const resultMapObject = useRef<google.maps.Map | null>(null);
    
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
                <Style.ResultText>정답과 선택한 거리차이</Style.ResultText>
                <Style.ResultText>{distancePoint}{distanceUnit}</Style.ResultText>
            </Style.ResultInfo>
            {
                currentStage != 3 ? 
                <Style.ResultNextBtn onClick={startStage}>Next</Style.ResultNextBtn>
                :
                <Style.ResultNextBtn onClick={moveHome}>Finish</Style.ResultNextBtn>
            }
        </Style.ResultWrapper>
        : <SingleLoading />
    )
}

export default ResultMapGoogle;