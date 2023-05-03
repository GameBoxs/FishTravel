import React, {useEffect, useRef, useState} from "react";
import * as Style from "./ResultMap.Styled";
import * as Api from "../../../action/module/singleplay/domestic/SingleDomesticResultAPI";

type propsType = {
    selectPosition: naver.maps.LatLng | null;
    currentStage: number;
}

const ResultMap = (props:propsType) => {
    const {currentStage, selectPosition} = props;
    
    const [answerPosition, setAnswerPosition] = useState<null | naver.maps.LatLng>(new naver.maps.LatLng(36.1073, 128.4175));
    const [answerMarker, setAnswerMarker] = useState<naver.maps.Point | null>(null);
    const [selectMarker, setSelectMarker] = useState<naver.maps.Point | null>(null);

    const resultMapRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        let data:Api.ResultInitType = {resultMapRef, answerPosition, selectPosition};
        const offsetDatas = Api.Init(data);
        if(offsetDatas) setTimeout(() => {makeMarker(offsetDatas)}, 500);
    },[]);

    const makeMarker = (offsetDatas:Api.ResultInitReturnType) => {
        setAnswerMarker(offsetDatas.answerPositionOffset);
        setSelectMarker(offsetDatas.selectPositionOffset);
    }

    return (
        answerPosition ?
        <Style.ResultWrapper>
            <Style.StageText>Stage {currentStage}</Style.StageText>
            <Style.ResultMap ref={resultMapRef}>
                {
                    answerMarker ?
                    <Style.TempMarker style={{left: `${answerMarker?.x -12}px`, top:`${answerMarker?.y - 10}px`}} />
                    : null
                }
            </Style.ResultMap>
            <Style.ResultInfo>
                <Style.ResultText>떨어진 거리</Style.ResultText>
                <Style.ResultText>Score</Style.ResultText>
                <Style.ResultText>3</Style.ResultText>
                <Style.ResultText>4</Style.ResultText>
            </Style.ResultInfo>
        </Style.ResultWrapper>
        : <h1>로딩중</h1>
    )
}

export default ResultMap;