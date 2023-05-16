import { useEffect, useRef } from "react";
import styled from "styled-components";
import { LatLng } from "../../layout/multi/MultiGameResult";
import { useGameSettingStore } from "../../pages/MultiGamePage";

type Props = {
  answerPosition: LatLng,
  selectedPosition: Array<LatLng>,
  id: string
  isLoaded: string
};

const answerIconPic = "https://cdn-icons-png.flaticon.com/64/5695/5695118.png";
const selectedIconPic = "https://cdn-icons-png.flaticon.com/64/5695/5695123.png";

export const RankingMap = ({answerPosition, selectedPosition, id, isLoaded }: Props) => {
  const mapRef = useRef<naver.maps.Map | google.maps.Map | null>(null);
  const markerArrRef = useRef<naver.maps.Marker[] | google.maps.Marker[] | null>(null);
  const infoWindowArrRef = useRef<naver.maps.InfoWindow[] | google.maps.InfoWindow[] | null>(null);
  const polylineArrRef = useRef<naver.maps.Polyline[] | google.maps.Polyline[] | null>(null);
  const { isDomestic } = useGameSettingStore();
  useEffect(() => { 
    if (isLoaded !== "ready") return; 
    if (isDomestic && naver.maps.Map) {
      // 네이버 지도를 보여줘야 하는 경우
      mapRef.current = new naver.maps.Map(id, {
        center: new naver.maps.LatLng(36.1146, 128.3645)
      })
      markerArrRef.current = new Array<naver.maps.Marker>;
      polylineArrRef.current = new Array<naver.maps.Polyline>;
      infoWindowArrRef.current = new Array<naver.maps.InfoWindow>;
      for (const pos of selectedPosition) { 
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(pos.lat, pos.lng),
          map: mapRef.current,
          visible: true,
          icon: {
            url: selectedIconPic,
            // size: new naver.maps.Size(48, 48), //아이콘 크기
            scaledSize: new naver.maps.Size(48, 48),
          },
          animation: naver.maps.Animation.DROP
        })
        const info = new naver.maps.InfoWindow({
          content: `
          <div style="padding: 8px; border: 2px solid black; border-radius: 2rem; text-align: center;">
            <h3>${pos.nickname}</h3>
            <h3>${pos.lat}</h3>
          </div>
          `,
          borderWidth: 0,
        })
        marker.addListener("mouseover", () => { 
          if (mapRef.current && mapRef.current instanceof naver.maps.Map && marker instanceof naver.maps.Marker) { 
            info.open(mapRef.current, marker);
          }
        })
        marker.addListener("mouseout", () => {
          if (info.getMap()) info.close();
        })
        markerArrRef.current?.push(marker)
        infoWindowArrRef.current.push(
        
        )
        polylineArrRef.current.push(
          new naver.maps.Polyline({
            map: mapRef.current,
            path: [new naver.maps.LatLng(pos.lat, pos.lng), new naver.maps.LatLng(answerPosition.lat, answerPosition.lng)],
            strokeColor: "#000000",
            strokeStyle: "shortdash",
            strokeWeight: 4,
          })
        )
      }
      markerArrRef.current.push(
        new naver.maps.Marker({
          position: new naver.maps.LatLng(answerPosition.lat, answerPosition.lng),
          map: mapRef.current,
          visible: true,
          icon: {
            url: answerIconPic,
            scaledSize: new naver.maps.Size(40, 40), //아이콘 크기
          }
        })
      )
      mapRef.current.fitBounds(markerArrRef.current.map((m) => m.getPosition()));
    } else if (!isDomestic && google.maps.Map) { 
      // 구글 지도를 보여줘야 하는 경우
      mapRef.current = new google.maps.Map(document.getElementById(id) as HTMLElement, {
        center: new google.maps.LatLng(36.1146, 128.3645),
        zoom: 14,
        fullscreenControl: false,
        panControl: false,
        disableDefaultUI: true,
        clickableIcons: false,
      });
      markerArrRef.current = new Array<google.maps.Marker>;
      polylineArrRef.current = new Array<google.maps.Polyline>;
      infoWindowArrRef.current = new Array<google.maps.InfoWindow>;
      const lineSymbol = {
        path: "M 0,-1 0,1",
        strokeOpacity: 1,
        scale: 4,
      };
      for (const pos of selectedPosition) { 
        markerArrRef.current?.push(
          new google.maps.Marker({
            position: new google.maps.LatLng(pos.lat, pos.lng),
            map: mapRef.current,
            visible: true,
            icon: {
              url: selectedIconPic,
              scaledSize: new google.maps.Size(40, 40), //아이콘 크기
              strokeColor: "#000000",
            },
            animation: google.maps.Animation.DROP
          })
        )
        markerArrRef.current.at(-1)?.addListener("click", () => { 

        })
        polylineArrRef.current.push(
          new google.maps.Polyline(
            {
              map: mapRef.current,
              path: [{ lat: pos.lat, lng: pos.lng }, { lat: answerPosition.lat, lng: answerPosition.lng }],
              strokeColor: "#000000",
              strokeOpacity: 0,
              strokeWeight: 4,
              icons: [
                {
                  icon: lineSymbol,
                  offset: "0",
                  repeat: "20px",
                },
              ],
            }
          )
        )
      }
      markerArrRef.current.push(
        new google.maps.Marker({
          position: new google.maps.LatLng(answerPosition.lat, answerPosition.lng),
          map: mapRef.current,
          visible: true,
          icon: {
            url: answerIconPic,
            scaledSize: new google.maps.Size(40, 40), //아이콘 크기
            strokeColor: "#000000",
          },
          animation: google.maps.Animation.BOUNCE
        })
      )
      const boundary = new google.maps.LatLngBounds();
      for (const marker of markerArrRef.current) { 
        boundary.extend(marker.getPosition()!);
      }
      mapRef.current.fitBounds(boundary);
    }
    console.log(mapRef.current);
  }, [isLoaded])
  return (
    <RankingMapContainer id={id}>
      
    </RankingMapContainer>
  );
};

const RankingMapContainer = styled.div`
  width: 50vw;
  height: 30vh;
  margin-top: 1vh;
  background: white;
  align-items: center;
  justify-content: center; 
  border-radius: 2rem 2rem 0 0;
`
const InfowindowContainer = "";