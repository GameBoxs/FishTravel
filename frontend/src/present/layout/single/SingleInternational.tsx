import React, { useRef, useState } from 'react';
import * as Style from './SingleInternational.Styled';

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
    
    return (
        <Style.SingleWrapper>

        </Style.SingleWrapper>
    )
}

export default SingleInternational;