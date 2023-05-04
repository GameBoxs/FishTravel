export type ResultInitType = {
    resultMapRef:React.MutableRefObject<HTMLDivElement | null>;
    selectPosition: naver.maps.LatLng | null;
    answerPosition: naver.maps.LatLng | null;
    resultMapObject: React.MutableRefObject<naver.maps.Map | null>;
}
export type ResultInitReturnType = {
    distancePoint: number
    resultMapObject: React.MutableRefObject<naver.maps.Map | null>;
}

export const initMap = (data:ResultInitType) => {
    const {resultMapRef, selectPosition, answerPosition, resultMapObject} = data;
    if(!resultMapRef.current || !answerPosition) return null;

    // 중간 지점을 계산합니다.
    let centerPosition = answerPosition;
    if(selectPosition) {
        const bounds = new naver.maps.LatLngBounds(answerPosition, selectPosition);
        centerPosition = bounds.getCenter();
    }

    const map = new naver.maps.Map(resultMapRef.current, {
        center: centerPosition,
        zoom: 1,
        logoControl: false,
        mapDataControl: false,
        zoomControl: false,
        scaleControl: false,
        tileSpare: 5,
        // draggable: false,
        // keyboardShortcuts: false,
        // pinchZoom: false,
        // scrollWheel: false,
    });
    resultMapObject.current = map;

    const answerMarker = new naver.maps.Marker({
        position: answerPosition,
        map: map,
    });
    if(selectPosition) {
        const selectMarker = new naver.maps.Marker({
            position: selectPosition,
            map:map,
        });
    }
    const distancePoint = selectPosition ? map.getProjection().getDistance(answerPosition, selectPosition) : 0;
    const resultData = {distancePoint, resultMapObject};

    return resultData;
}

export const makeMarker = (data:{
    selectPosition: naver.maps.LatLng | null;
    answerPosition: naver.maps.LatLng | null;
    resultMapObject: React.MutableRefObject<naver.maps.Map | null>;}) => {
    if(data.resultMapObject.current) {
        const map = data.resultMapObject.current;
        const {selectPosition, answerPosition} = data;

        if(answerPosition) {
            const answerMarker = new naver.maps.Marker({
                position: answerPosition,
                map: map,
            });
            if(selectPosition) {
                const selectMarker = new naver.maps.Marker({
                    position: selectPosition,
                    map:map,
                });
    
                const polyline = new naver.maps.Polyline({
                    map: map,
                    path: [
                        answerPosition,
                        selectPosition,
                    ],
                    strokeColor: '#ff0000',
                    strokeStyle: 'shortdash',
                    strokeOpacity: 1,
                    strokeWeight: 5, 
                    strokeLineCap: 'round',
                    strokeLineJoin: 'miter',
                });
            }
        }
    }
}