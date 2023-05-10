export type InitType = {
    mapRef:React.MutableRefObject<HTMLDivElement | null>;
    roadRef:React.MutableRefObject<HTMLDivElement | null>;
    mapObject:React.MutableRefObject<google.maps.Map | null>;
    roadObject:React.MutableRefObject<google.maps.StreetViewPanorama | null>;
    selectPosition: google.maps.LatLng | null;
    setSelectPosition: React.Dispatch<React.SetStateAction<google.maps.LatLng | null>>;
    selectMarker: React.MutableRefObject<google.maps.Marker | null>;
}

export const Init = (data:InitType):void => {
    const {mapRef, roadRef, mapObject, roadObject, selectPosition, setSelectPosition} = data;
    let {selectMarker} = data;
    if(!mapRef.current || !roadRef.current) return;
    const map:google.maps.Map = new google.maps.Map(mapRef.current, {
        center: new google.maps.LatLng(36.6349, 127.9076),
        zoom: 1,
        disableDefaultUI: true,
        panControl: false,
        rotateControl: false,
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false,
    });
    const pano = new google.maps.StreetViewPanorama(roadRef.current, {
        position: new google.maps.LatLng(36.1073, 128.4175),
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