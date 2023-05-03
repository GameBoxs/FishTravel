export type ResultInitType = {
    resultMapRef:React.MutableRefObject<HTMLDivElement | null>;
    selectPosition: naver.maps.LatLng | null;
    answerPosition: naver.maps.LatLng | null;
}
export type ResultInitReturnType = {
    answerPositionOffset: naver.maps.Point;
    selectPositionOffset: naver.maps.Point | null;
}

export const Init = (data:ResultInitType) => {
    const {resultMapRef, selectPosition, answerPosition} = data;
    if(!resultMapRef.current || !answerPosition) return null;
    const map = new naver.maps.Map(resultMapRef.current, {
        center: answerPosition,
        zoom: 30,
        logoControl: false,
        mapDataControl: false,
        zoomControl: false,
        scaleControl: false,
        tileSpare: 5,
        draggable: false,
        keyboardShortcuts: false,
        pinchZoom: false,
        scrollWheel: false,
    });

    const answerMarker = new naver.maps.Marker({
        position: answerPosition,
        map: map,
    });
    const answerPositionOffset = map.getProjection().fromCoordToOffset(answerPosition);
    let selectPositionOffset = null;
    if(selectPosition) {
        selectPositionOffset = map.getProjection().fromCoordToOffset(selectPosition);
        const selectMarker = new naver.maps.Marker({
            position: selectPosition,
            map:map,
        });
    }
    const resultData = {answerPositionOffset, selectPositionOffset};
    return resultData;
}