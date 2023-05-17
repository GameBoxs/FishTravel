export type InitType = {
    mapRef:React.MutableRefObject<HTMLDivElement | null>;
    roadRef:React.MutableRefObject<HTMLDivElement | null>;
    mapObject:React.MutableRefObject<google.maps.Map | null>;
    roadObject:React.MutableRefObject<google.maps.StreetViewPanorama | null>;
    selectPosition: google.maps.LatLng | null;
    setSelectPosition: React.Dispatch<React.SetStateAction<google.maps.LatLng | null>>;
    selectMarker: React.MutableRefObject<google.maps.Marker | null>;
    answerPosition: google.maps.LatLng;
}
const locationDataSet = [
    [36.1075, 128.4175],
    [36.103, 128.4197],
    [36.1043, 128.4259],
    [35.834706853813366, 129.21862387497592],
    [35.159697612693876, 129.1615279149234],
    [37.2409613281374, 131.86427301896774],
    [33.1955538950559, 126.2897381956593],
    [33.32588373574955, 126.84024380149489],
    [36.03449541326816, 129.38055432505215],
    [35.852761505162896, 128.56653392221193],
    [34.38205171109758, 126.23056519578175],
    [33.45930351568051, 126.93966579985329],
    [37.30510147340937, 127.01523993525507],
    [37.2889, 127.01412],
    [37.29161570239798, 127.20470017638027],
    [35.884336692366794, 126.51264058983512],
    [36.541910284408075, 127.8332425372653],
    [34.79884360902794, 128.04043980767793],
    [36.79707694275219, 127.06149260922584],
    [33.49308951552344, 126.96605139997007],
    [38.34037575485417, 128.50022345030231],
    [34.2924380112566, 126.52384739752617],
    [36.48800827917877, 126.3337966701461],
    [37.50964541951787, 127.10007236078948]
];
/**
 * 
 * @returns 저장된 국외 좌표 개수 리턴
 */
export const getDataSetSize = () => {
    return locationDataSet.length;
}

/**
 * 
 * @param idx 인덱스번호
 * @returns 인덱스번호에 맞는 국외 좌표 데이터 반환
 */
export const getDataSet = (idx:number) => {
    return new google.maps.LatLng(locationDataSet[idx][0], locationDataSet[idx][1]);
}

export const Init = (data:InitType):void => {
    const {mapRef, roadRef, mapObject, roadObject, selectPosition, setSelectPosition, answerPosition} = data;
    let {selectMarker} = data;
    if(!mapRef.current || !roadRef.current) return;
    const map:google.maps.Map = new google.maps.Map(mapRef.current, {
        center: new google.maps.LatLng(14.473029474474735, -11.997194735728957),
        zoom: 0,
        minZoom: 0,
        disableDefaultUI: true,
        panControl: false,
        rotateControl: false,
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false,
    });
    const pano = new google.maps.StreetViewPanorama(roadRef.current, {
        position: answerPosition,
        addressControl: false,
        disableDefaultUI: true,
        fullscreenControl: false,
        imageDateControl: false,
        panControl: false,
        zoomControl: false,
        linksControl: false,
    })
    mapObject.current = map;
    roadObject.current = pano;
    google.maps.event.addListener(map, "click", (e: google.maps.MapMouseEvent) => {
        if(!selectMarker.current) {
            let marker = new google.maps.Marker({
                position: e.latLng,
                map: map,
            })
            selectMarker.current = marker;
            setSelectPosition(e.latLng);
        } else {
            selectMarker.current.setPosition(e.latLng);
            setSelectPosition(e.latLng);
        }
    });
    roadRef.current.style.position = 'absolute';
    mapRef.current.style.position = 'absolute';
}