import { useState, useEffect } from 'react';
import { create } from 'zustand';
import { MultiGameLoading } from '../layout/multi/MultiGameLoading';
import { LatLng, MultiGameResult } from '../layout/multi/MultiGameResult';
import useLoadScript from '../../action/hooks/useLoadScript';
import { MultiGameProgress } from '../layout/multi/MultiGameProgress';
import { MultiGameLobby } from '../layout/multi/MultiGameLobby';
import GameConnect from '../component/gamelobby/GameConnect';
import { useUserStore } from '../../store/userStore';
import { useLocation, useParams } from 'react-router';

type Props = {};
type TGameSetting = {
  gameStage: number;
  isDomestic: boolean;
  selectedPosition: LatLng;
  setGameStage: (value: number) => void;
  setIsDomestic: (value: boolean) => void;
};
export const useGameSettingStore = create<TGameSetting>((set, get) => ({
  gameStage: 0,
  isDomestic: true,
  selectedPosition: { nickname: '나', lat: 22, lng: 22 },
  setGameStage: (value: number) => set((state) => ({ ...state, gameStage: value })),
  setIsDomestic: (value: boolean) => set((state) => ({ ...state, isDomestic: value })),
}));

// Define the interface for the props

export const MultiGamePage = (props: Props) => {
  const { state } = useLocation() as unknown as {
    state: {
      propsCode: string;
      isDomestic: boolean;
    };
  };
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const code = useUserStore((state) => state.code);
  const setCode = useUserStore((state) => state.setCode);
  const setRoomId = useUserStore((state) => state.setRoomId);
  const setManagerId = useUserStore((state) => state.setManagerId);
  const setMaxPlayers = useUserStore((state) => state.setMaxPlayers);
  const setPlayers = useUserStore((state) => state.setPlayers);
  const setRounds = useUserStore((state) => state.setRounds);
  // const { gameStage, isDomestic } = useGameSettingStore();
  const isLoadedState = useLoadScript(
    state.isDomestic
      ? 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=4vgyzjsnlj&submodules=panorama'
      : 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC5fl-yV_BZhfIXZYDpU4JnCwFGDhd8oQA',
  );
  // Define the type of the response data

  const callback = (message: any) => {
    // called when the client receives a STOMP message from the server
    if (message.body) {
      alert(message.body);
      const messageBody = JSON.parse(message.body);
      alert(messageBody);
      alert(JSON.stringify(messageBody, null, 2));
      if (messageBody.code) {
        if (messageBody.code !== 'CHAT') {
          console.warn('code is not chat');
          setCode(messageBody.code);
          setRoomId(messageBody.data.roomId);
          setManagerId(messageBody.data.managerId);
          setMaxPlayers(messageBody.data.maxPlayers);
          setPlayers(messageBody.data.players);
          setRounds(messageBody.data.rounds);
        } else if (messageBody.code === 'CHAT') {
          console.warn('code is chat');
          messageBody.data.message;
        }
      }
    } else {
      alert('got empty message');
    }
  };
  //로직
  //페이지 진입
  //1) 게임 진행중인 경우
  //1-1) 게임에 포함된 사람인지 확인
  //1-2) 게임에 포함된 경우, 죽은 사람 화면 띄워줌
  //2) 게임

  useEffect(() => {
    setRoomCode(state.propsCode);
  }, []);

  console.log(isLoadedState);
  return (
    <>
      <GameConnect roomCode={roomCode} setRoomCode={setRoomCode} callback={callback} />
      {roomCode !== null && code !== null ? (
        <div>
          {code === '1' && <MultiGameLobby />}
          {code === '2' && <MultiGameLoading />}
          {code === '3' && (
            <MultiGameProgress isDomestic={state.isDomestic} isLoaded={isLoadedState} isObserver={false} />
          )}
          {code === '4' && <MultiGameResult isDomestic={state.isDomestic} isLoaded={isLoadedState} />}
        </div>
      ) : null}
    </>
  );
};
