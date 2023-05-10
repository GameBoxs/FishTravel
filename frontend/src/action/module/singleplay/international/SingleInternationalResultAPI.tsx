export type ResultInitType = {
    resultMapRef:React.MutableRefObject<HTMLDivElement | null>;
    selectPosition: google.maps.LatLng | null;
    answerPosition: google.maps.LatLng | null;
    resultMapObject: React.MutableRefObject<google.maps.Map | null>;
}
export type ResultInitReturnType = {
    distancePoint: number
    resultMapObject: React.MutableRefObject<google.maps.Map | null>;
}

export const initMap = (data:ResultInitType) => {
    const {resultMapRef, selectPosition, answerPosition, resultMapObject} = data;
    if(!resultMapRef.current || !answerPosition) return null;

    // 중간 지점을 계산합니다.
    let centerPosition = answerPosition;
    if(selectPosition) {
        const bounds = new google.maps.LatLngBounds(answerPosition, selectPosition);
        centerPosition = bounds.getCenter();
    }

    const map = new google.maps.Map(resultMapRef.current, {
        center: centerPosition,
        zoom: 1,
        disableDefaultUI: true,
        panControl: false,
        rotateControl: false,
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false,
    });
    resultMapObject.current = map;

    const answerMarker = new google.maps.Marker({
        position: answerPosition,
        map: map,
    });
    if(selectPosition) {
        const selectMarker = new google.maps.Marker({
            position: selectPosition,
            map:map,
        });
    }
    const distancePoint = selectPosition ? google.maps.geometry.spherical.computeDistanceBetween(
        selectPosition,
        answerPosition
      ) : 0;
    const resultData = {distancePoint, resultMapObject};

    return resultData;
}

export const makeMarker = (data:{
    selectPosition: google.maps.LatLng | null;
    answerPosition: google.maps.LatLng | null;
    resultMapObject: React.MutableRefObject<google.maps.Map | null>;}) => {
    if(data.resultMapObject.current) {
        const map = data.resultMapObject.current;
        const {selectPosition, answerPosition} = data;

        if(answerPosition) {
            const answerMarker = new google.maps.Marker({
                position: answerPosition,
                map: map,
            });
            if(selectPosition) {
                const selectMarker = new google.maps.Marker({
                    position: selectPosition,
                    map:map,
                });
    
                const polyline = new google.maps.Polyline({
                    map: map,
                    path: [
                        answerPosition,
                        selectPosition,
                    ],
                    strokeColor: '#ff0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                });
            }
        }
    }
}