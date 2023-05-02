import React from 'react';
import * as Style from './CountTimer.Styled';

type propsType = {
    timer: number;
}

const CountTimer = (props:propsType) => {

    return (
        <Style.TimerWrapper>
            <Style.TimerText>{props.timer/60 < 10 ? '0'+props.timer/60 : props.timer/60} : {props.timer%60 < 10 ? '0'+props.timer%60 : props.timer%60}</Style.TimerText>
        </Style.TimerWrapper>
    )
}

export default CountTimer;
