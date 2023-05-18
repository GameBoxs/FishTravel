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
    [35.7144622,139.7966334],
    [35.7097546,139.8116173],
    [-16.5061953,-151.7059093],
    [-8.6204792,115.0869007],
    [-22.9518499,-43.2100847],
    [40.7487397,-73.9852793],
    [25.197184,55.274378],
    [27.1719538,78.0421016],
    [48.8578541,2.2952721],
    [41.890111,12.4925349],
    [41.8896762,12.4914261],
    [43.7228944,10.3962378],
    [-22.0489658,43.265658],
    [36.4617547,25.3822781],
    [46.9482774,7.4599163],
    [42.3621815,-71.0907346],
    [42.3752472,-71.1171208],
    [56.1893543,-117.6107348],
    [51.5058183,-0.075192],
    [51.5073733,-0.077165],
    [51.5187345,-0.1261345],
    [51.5015884,-0.1410892],
    [38.6921313,-9.2152044],
    [40.4149751,-3.69425],
    [9.0594112,7.4903175],
    [-1.2839794,36.8208278],
    [60.445224,22.2598237],
    [-34.6066154,-58.4359813]
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