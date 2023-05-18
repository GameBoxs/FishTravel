import { useEffect, useState } from 'react';

import { create } from 'zustand';
import { MultiGameLoading } from '../layout/multi/MultiGameLoading';
import { LatLng, MultiGameResult } from '../layout/multi/MultiGameResult';
import useLoadScript from '../../action/hooks/useLoadScript';
import { MultiGameProgress } from '../layout/multi/MultiGameProgress';
import { MultiGameLobby } from '../layout/multi/MultiGameLobby';

import { MultiGamePicker } from '../layout/multi/MultiGamePicker';
import { TGameInfo, TMessageCode, TPlayer, TRound, TBroadcastMessage, TMarkerRequest, TRanking } from './index.d';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { Client, Message } from '@stomp/stompjs';
import GameConnect from '../component/gamelobby/GameConnect';
import { Loading } from '../layout/multi/Loading';
import { MultiWaitingPage } from '../layout/multi/MultiWaitingPage';
type Props = {};
type TGameSetting = {
  gameStage: number;
  isDomestic: boolean;
  selectedPosition: LatLng;
  setGameStage: (value: number) => void;
  setIsDomestic: (value: boolean) => void;
};
type TGameData = TGameInfo & {
  isObserver: boolean;
  problemPosition: TMarkerRequest | null;
  submittedPosition: TMarkerRequest | null;
  rankingArray: Array<TRanking> | null;
  setGameInfo: (value: TGameInfo) => void;
  setRoomId: (value: string) => void;
  setCode: (value: TMessageCode) => void;
  setIsDomestic: (value: boolean) => void;
  setManagerId: (value: number) => void;
  setMaxPlayers: (value: number) => void;
  setPlayers: (value: Array<TPlayer>) => void;
  setRounds: (value: Array<TRound>) => void;
  setIsObserver: (value: boolean) => void;
  setProblemPosition: (value: TMarkerRequest) => void;
  setSubmittedPosition: (value: TMarkerRequest) => void;
  setRankingArray: (value: Array<TRanking>) => void;
  refreshRanking: () => void;
};

export const useGameSettingStore = create<TGameSetting>((set, get) => ({
  gameStage: 0,
  isDomestic: true,
  selectedPosition: { nickname: '나', lat: 22, lng: 22 },
  setGameStage: (value: number) => set((state) => ({ ...state, gameStage: value })),
  setIsDomestic: (value: boolean) => set((state) => ({ ...state, isDomestic: value })),
}));

export const useGameInfoStore = create<TGameData>((set, get) => ({
  code: null,
  domestic: false,
  managerId: 1,
  maxPlayers: 6,
  players: [],
  roomId: '',
  rounds: [],
  isObserver: false,
  problemPosition: null,
  submittedPosition: null,
  rankingArray: null,
  setGameInfo: (value: TGameInfo) => set((state) => ({ ...state, ...value })),
  setRoomId: (value: string) => set((state) => ({ ...state, roomId: value })),
  setCode: (value: TMessageCode) => set((state) => ({ ...state, code: value })),
  setIsDomestic: (value: boolean) => set((state) => ({ ...state, isDomestic: value })),
  setManagerId: (value: number) => set((state) => ({ ...state, managerId: value })),
  setMaxPlayers: (value: number) => set((state) => ({ ...state, maxPlayers: value })),
  setPlayers: (value: Array<TPlayer>) => set((state) => ({ ...state, players: value })),
  setRounds: (value: Array<TRound>) => set((state) => ({ ...state, round: value })),
  setIsObserver: (value: boolean) => set((state) => ({ ...state, isObserver: value })),
  setProblemPosition: (value: TMarkerRequest) => set((state) => ({ ...state, problemPosition: value })),
  setSubmittedPosition: (value: TMarkerRequest) => set((state) => ({ ...state, ...(Number(useUserStore.getState().id) === value.requester.id && {code: "WAITING" as TMessageCode, submittedPosition: value}) })),
  setRankingArray: (value: Array<TRanking>) => set((state) => ({ ...state, rankingArray: value })),
  refreshRanking: () => set((state) => ({
    ...state,
    rankingArray: state.rankingArray!.map((r) => ({
      ...r,
      scoreSum: r.scoreSum + state.rounds!.at(-1)!.scores.filter((s) => s.answer.requester.id === r.player.id)[0]?.distance,
    })).sort((a, b) => a.scoreSum < b.scoreSum ? 1 : a.scoreSum === b.scoreSum ? 0 : -1 ),
  }))
}));
export const MultiGamePage = (props: Props) => {
  const gameInfo = useGameInfoStore();
  const isLoadedState = useLoadScript(
    gameInfo.domestic
      ? 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=4vgyzjsnlj&submodules=panorama'
      : 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC5fl-yV_BZhfIXZYDpU4JnCwFGDhd8oQA',
  );
  const params = useParams();
  const { id } = useUserStore();
  const [postMessage, setPostMessage] = useState<any>('');
  const callback = (message: Message) => {
    const body = JSON.parse(message.body);
    console.log(body);
    console.log(id);
    if (body.code ==="ANSWER") { 
      gameInfo.setSubmittedPosition(body.data);
    }
    if (body.code === 'CHAT' && gameInfo.players !== null) {
      setPostMessage(body.data);
    }
    if (body.code === 'GAME_START' && gameInfo.players !== null) {
      gameInfo.setRankingArray(gameInfo.players.map((p) => ({ player: p, scoreSum: 0 })));
    }
    if (body.code === 'IN_ROUND') {
      gameInfo.setCode(TMessageCode.IN_ROUND);
      const data: TMarkerRequest = body.data;
      gameInfo.setProblemPosition(data);
      if (data.requester.id === Number(id)) {
        gameInfo.setIsObserver(true);
      } else {
        gameInfo.setIsObserver(false);
      }
    } else {
      gameInfo.setGameInfo((JSON.parse(message.body) as TBroadcastMessage<TGameInfo>).data);
    }
    if (body.code === 'ROUND_RESULT') {
      //  라운드 결과창에서 가장 최근의 라운드 결과 값 가산.
      console.log(gameInfo.rankingArray);
      gameInfo.refreshRanking();
    }
  };
  useEffect(() => {
    if (!params.roomCode) {
      alert('방 번호가 입력되지 않았습니다.');
    }
  }, []);
  useEffect(() => {
    console.log(gameInfo.code);
  }, [gameInfo.code]);
  return (
    <div>
      {params.roomCode && <GameConnect roomCode={params.roomCode} callback={callback} />}
      {/* {1 && <MultiGameLobby/>} */}
      {gameInfo.code === TMessageCode.LOBBY && <MultiGameLobby message={postMessage} />}
      {gameInfo.code === TMessageCode.PICK_FISH && <MultiGamePicker isLoaded={isLoadedState} />}
      {gameInfo.code === TMessageCode.GAME_START && <Loading />}
      {gameInfo.code === TMessageCode.WAIT_FOR_NEXT_ROUND && <MultiGameLoading />}
      {gameInfo.code === TMessageCode.IN_ROUND && (
        <MultiGameProgress isDomestic={gameInfo.domestic} isLoaded={isLoadedState} />
      )}
      {gameInfo.code === TMessageCode.ROUND_RESULT && (
        <MultiGameResult isDomestic={gameInfo.domestic} isLoaded={isLoadedState} />
      )}
      {gameInfo.code === TMessageCode.WAITING && (
        <MultiWaitingPage isLoaded={isLoadedState} />
      ) }
    </div>
  );
};
