export type InitType = {
    mapRef:React.MutableRefObject<HTMLDivElement | null>;
    roadRef:React.MutableRefObject<HTMLDivElement | null>;
    mapObject:React.MutableRefObject<naver.maps.Map | null>;
    roadObject:React.MutableRefObject<naver.maps.Panorama | null>;
    selectPosition: naver.maps.LatLng | null;
    setSelectPosition: React.Dispatch<React.SetStateAction<naver.maps.LatLng | null>>;
    selectMarker: React.MutableRefObject<naver.maps.Marker | null>;
    answerPosition: naver.maps.LatLng;
}
// const locationDataSet = [
//     new naver.maps.LatLng(36.1075, 128.4175),
//     new naver.maps.LatLng(36.103, 128.4197),
//     new naver.maps.LatLng(36.1043, 128.4259),
//     new naver.maps.LatLng(35.834706853813366, 129.21862387497592),
//     new naver.maps.LatLng(35.159697612693876, 129.1615279149234),
//     new naver.maps.LatLng(37.2409613281374, 131.86427301896774),
//     new naver.maps.LatLng(33.1955538950559, 126.2897381956593),
//     new naver.maps.LatLng(33.32588373574955, 126.84024380149489),
//     new naver.maps.LatLng(36.03449541326816, 129.38055432505215),
//     new naver.maps.LatLng(35.852761505162896, 128.56653392221193),
//     new naver.maps.LatLng(34.38205171109758, 126.23056519578175),
//     new naver.maps.LatLng(33.45930351568051, 126.93966579985329),
//     new naver.maps.LatLng(37.30510147340937, 127.01523993525507),
//     new naver.maps.LatLng(37.2889, 127.01412),
//     new naver.maps.LatLng(37.29161570239798, 127.20470017638027),
//     new naver.maps.LatLng(35.884336692366794, 126.51264058983512),
//     new naver.maps.LatLng(36.541910284408075, 127.8332425372653),
//     new naver.maps.LatLng(34.79884360902794, 128.04043980767793),
//     new naver.maps.LatLng(36.79707694275219, 127.06149260922584),
//     new naver.maps.LatLng(33.49308951552344, 126.96605139997007),
//     new naver.maps.LatLng(38.34037575485417, 128.50022345030231),
//     new naver.maps.LatLng(34.2924380112566, 126.52384739752617),
//     new naver.maps.LatLng(36.48800827917877, 126.3337966701461),
//     new naver.maps.LatLng(37.50964541951787, 127.10007236078948)
// ];
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
 * @returns 저장된 국내 좌표 개수 리턴
 */
export const getDataSetSize = () => {
    return locationDataSet.length;
}

/**
 * 
 * @param idx 인덱스번호
 * @returns 인덱스번호에 맞는 국내 좌표 데이터 반환
 */
export const getDataSet = (idx:number) => {
    return new naver.maps.LatLng(locationDataSet[idx][0], locationDataSet[idx][1]);
}

export const Init = (data:InitType):void => {
    const {mapRef, roadRef, mapObject, roadObject, selectPosition, setSelectPosition, answerPosition} = data;
    let {selectMarker} = data;
    if(!mapRef.current || !roadRef.current) return;
    const map:naver.maps.Map = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(36.6349, 127.9076),
        zoom: 1,
        logoControl: false,
        mapDataControl: false,
        zoomControl: false,
        scaleControl: false,
        tileSpare: 5,
    });
    const pano = new naver.maps.Panorama(roadRef.current, {
        // position: new naver.maps.LatLng(36.1073, 128.4175),
        position: answerPosition,
        aroundControl: false,
        flightSpot: false,
    })
    mapObject.current = map;
    roadObject.current = pano;
    naver.maps.Event.addListener(pano, "pano_status", () => {
        if(!roadRef.current) return;
        const spans = roadRef.current.querySelectorAll('span');
        for (const span of spans) {
            span.className = "roadText";
        }
    });
    naver.maps.Event.addListener(map, 'click', (e) => {
        if(!selectMarker.current) {
            let marker = new naver.maps.Marker({
                position: e.coord,
                map:map,
            })
            selectMarker.current = marker;
            setSelectPosition(e.coord);
        } else {
            selectMarker.current.setPosition(e.coord);
            setSelectPosition(e.coord);
        }
    });
    roadRef.current.style.position = 'absolute';
    mapRef.current.style.position = 'absolute';
}