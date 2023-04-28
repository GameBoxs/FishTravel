export type InitType = {
    mapRef:React.MutableRefObject<HTMLDivElement | null>;
    roadRef:React.MutableRefObject<HTMLDivElement | null>;
    mapObject:React.MutableRefObject<naver.maps.Map | null>;
    roadObject:React.MutableRefObject<naver.maps.Panorama | null>;
    selectPosition: naver.maps.LatLng | null;
    setSelectPosition: React.Dispatch<React.SetStateAction<naver.maps.LatLng | null>>;
    selectMarker: React.MutableRefObject<naver.maps.Marker | null>;
    setViewPosition: React.Dispatch<React.SetStateAction<naver.maps.LatLng | null>>;
}

export const Init = (data:InitType):void => {
    const {mapRef, roadRef, mapObject, roadObject, selectPosition, setSelectPosition, setViewPosition} = data;
    let {selectMarker} = data;
    if(!mapRef.current || !roadRef.current) return;
    setViewPosition(new naver.maps.LatLng(36.6349, 127.9076));
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
        position: new naver.maps.LatLng(36.1073, 128.4175),
        aroundControl: false,
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
    naver.maps.Event.addListener(map, 'dragend', () => {
        setViewPosition(new naver.maps.LatLng(map.getCenter().y, map.getCenter().x));
    })
    roadRef.current.style.position = 'absolute';
    mapRef.current.style.position = 'absolute';
}