import React, { useEffect, useState } from 'react';
import * as Style from './CountTimer.Styled';

type propsType = {
    timer: number;
    setTimer: React.Dispatch<React.SetStateAction<number>>;
}

const CountTimer = (props:propsType) => {
    const [timerInterval, setTimerInterval] = useState<number>(0);

    useEffect(() => {
        if (props.timer > 0) {
            setTimerInterval(window.setTimeout(() => props.setTimer(props.timer - 1), 1000));
        }
        return () => {
            window.clearTimeout(timerInterval);
        };
    }, [props.timer]);

    return (
        <Style.TimerWrapper>
            <Style.TimerText>{props.timer/60 < 10 ? '0'+ Math.trunc(props.timer/60) : props.timer/60} : {props.timer%60 < 10 ? '0'+props.timer%60 : props.timer%60}</Style.TimerText>
        </Style.TimerWrapper>
    )
}

export default CountTimer;
