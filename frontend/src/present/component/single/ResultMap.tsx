import React, {useState} from "react";
import * as Style from "./ResultMap.Styled";

type propsType = {
    selectPosition: naver.maps.LatLng | null;
    currentStage: number;
}

const ResultMap = (props:propsType) => {
    const [answerPosition, setAnswerPosition] = useState<null | naver.maps.LatLng>(new naver.maps.LatLng(36.1073, 128.4175));
    const {currentStage} = props;
    return (
        answerPosition ?
        <Style.ResultWrapper>
            <Style.StageText>Stage {currentStage}</Style.StageText>
            <Style.ResultMap />
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