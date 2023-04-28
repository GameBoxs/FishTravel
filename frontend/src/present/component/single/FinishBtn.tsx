import React from 'react';
import * as Style from './FinishBtn.Styled';

type propsType = {
    finishStage: () => void;
}

const FinishBtn = (props:propsType) => {
    return (
        <Style.BtnWrapper onClick={props.finishStage}>Finish</Style.BtnWrapper>
    )
}

export default FinishBtn;