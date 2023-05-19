import { useEffect, useState } from 'react';

import { create } from 'zustand';
import { MultiGameLoading } from '../layout/multi/MultiGameLoading';
import { LatLng, MultiGameResult } from '../layout/multi/MultiGameResult';
import useLoadScript from '../../action/hooks/useLoadScript';
import { MultiGameProgress } from '../layout/multi/MultiGameProgress';
import { MultiGameLobby } from '../layout/multi/MultiGameLobby';

import { MultiGamePicker } from '../layout/multi/MultiGamePicker';
import { TGameInfo, TMessageCode, TPlayer, TRoundInfo, TBroadcastMessage, TMarkerRequest, TRanking } from './index.d';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { Client, Message } from '@stomp/stompjs';
import GameConnect from '../component/gamelobby/GameConnect';
import { Loading } from '../layout/multi/Loading';
import { MultiWaitingPage } from '../layout/multi/MultiWaitingPage';
import { MultiGameFinalResult } from '../layout/multi/MultiGameFinalResult';
type Props = {};
type TGameData = TGameInfo & {
  isObserver: boolean;
  problemPosition: TMarkerRequest | null;
  problemRequester: TPlayer | null;
  submittedPosition: TMarkerRequest | null;
  observingMarkerArray: Array<TMarkerRequest>;
  rankingArray: Array<TRanking>;
  setGameInfo: (value: TGameInfo) => void;
  setRoomId: (value: string) => void;
  setCode: (value: TMessageCode) => void;
  setIsDomestic: (value: boolean) => void;
  setManagerId: (value: number) => void;
  setMaxPlayers: (value: number) => void;
  setPlayers: (value: Array<TPlayer>) => void;
  setRounds: (value: Array<TRoundInfo>) => void;
  setIsObserver: (value: boolean) => void;
  setProblemPosition: (value: TMarkerRequest) => void;
  setProblemRequester: (value: TPlayer) => void;
  setSubmittedPosition: (value: TMarkerRequest) => void;
  setRankingArray: (value: Array<TRanking>) => void;
  refreshRanking: () => void;
  updateIsObserver: () => void;
  initializeRanking: () => void;
  updateObservingMarkerArray: (value: TMarkerRequest) => void;
};

export const useGameInfoStore = create<TGameData>((set, get) => ({
  code: null,
  domestic: false,
  managerId: 1,
  maxPlayers: 6,
  players: [],
  currentRound: 0,
  roomId: '',
  rounds: [],
  isObserver: false,
  problemPosition: null,
  problemRequester: null,
  submittedPosition: null,
  observingMarkerArray: [],
  rankingArray: [],
  setGameInfo: (value: TGameInfo) => set((state) => ({ ...state, ...value })),
  setRoomId: (value: string) => set((state) => ({ ...state, roomId: value })),
  setCode: (value: TMessageCode) => set((state) => ({ ...state, code: value })),
  setIsDomestic: (value: boolean) => set((state) => ({ ...state, isDomestic: value })),
  setManagerId: (value: number) => set((state) => ({ ...state, managerId: value })),
  setMaxPlayers: (value: number) => set((state) => ({ ...state, maxPlayers: value })),
  setPlayers: (value: Array<TPlayer>) => set((state) => ({ ...state, players: value })),
  setRounds: (value: Array<TRoundInfo>) => set((state) => ({ ...state, round: value })),
  setIsObserver: (value: boolean) => set((state) => ({ ...state, isObserver: value })),
  setProblemPosition: (value: TMarkerRequest) => set((state) => ({ ...state, problemPosition: value })),
  setProblemRequester: (value: TPlayer) => set((state) => ({ ...state, problemRequester: value })),
  setSubmittedPosition: (value: TMarkerRequest) => set((state) => ({ ...state, ...(Number(useUserStore.getState().id) === value.requester.id && { code: "WAITING" as TMessageCode, submittedPosition: value }) })),
  setRankingArray: (value: Array<TRanking>) => set((state) => ({ ...state, rankingArray: value })),
  updateIsObserver: () => set((state) => ({ ...state, isObserver: Number(useUserStore.getState().id) === get().problemRequester!.id })),
  initializeRanking: () => set((state) => ({
    ...state,
    rankingArray: state.players!.map((p) => ({ player: p, scoreSum: 0 })),
  })),
  refreshRanking: () => set((state) => ({
    ...state,
    rankingArray: state.rankingArray!.map((r) => ({
      ...r,
      scoreSum: r.scoreSum + (state.problemRequester!.id === Number(useUserStore.getState().id)
        ? 0
        : state.rounds!.find((r) => r.roundOrder == get().currentRound)!.scores.find((s) => s.answer.requester.id === r.player.id)!.distance),
    })).sort((a, b) => a.scoreSum < b.scoreSum ? -1 : a.scoreSum === b.scoreSum ? 0 : 1),
  })),
  updateObservingMarkerArray: (value: TMarkerRequest) => set((state) => ({
    ...state,
    ...(state.observingMarkerArray && state.isObserver &&
    {
      observingMarkerArray: state.observingMarkerArray.find((m) => m.requester.id === value.requester.id) ?
        state.observingMarkerArray.map((m) => m.requester.id === value.requester.id ? value : m) :
        [...state.observingMarkerArray, value]
    })
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
  const navigate = useNavigate();
  const id = useUserStore((state) => state.id);
  const [postMessage, setPostMessage] = useState<any>('');
  const callback = (message: Message) => {
    if (message.body === "다 끝났다") { 
      gameInfo.setCode(TMessageCode.FINAL_RESULT);
    }
    const body = JSON.parse(message.body);
    console.log(body);
    if (body.code === "ANSWER") { 
      gameInfo.updateObservingMarkerArray(body.data);
      gameInfo.setSubmittedPosition(body.data);
    }
    if (body.code === 'CHAT' && gameInfo.players !== null) {
      setPostMessage(body.data);
    }
    if (body.code === 'GAME_START' && gameInfo.players !== null) {
      gameInfo.initializeRanking();
    }
    if (body.code === 'IN_ROUND') {
      gameInfo.setCode(TMessageCode.IN_ROUND);
      const data: TMarkerRequest = body.data;
      gameInfo.setProblemPosition(data);
      gameInfo.setProblemRequester(data.requester);
      gameInfo.updateIsObserver();
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
    // if (!id) { 
    //   alert('로그인이 필요합니다.')
    //   navigate('/');
    // }
    if (!params.roomCode) {
      alert('방 번호가 입력되지 않았습니다.');
      navigate('/');
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
      )}
      {gameInfo.code === TMessageCode.FINAL_RESULT && (
        <MultiGameFinalResult />
      )
      }
    </div>
  );
};
