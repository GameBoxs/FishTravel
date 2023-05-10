import { useState } from 'react';
import { create } from 'zustand';
import { MultiGameLoading } from '../layout/multi/MultiGameLoading';
import { MultiGameResult } from '../layout/multi/MultiGameResult';
import useLoadScript from '../../action/hooks/useLoadScript';
import { MultiGameProgress } from '../layout/multi/MultiGameProgress';
type Props = {
  
};
export const MultiGamePage = (props: Props) => {
  //로직
  //페이지 진입
  //1) 게임 진행중인 경우
  //1-1) 게임에 포함된 사람인지 확인
  //1-2) 게임에 포함된 경우, 죽은 사람 화면 띄워줌
  //2) 게임 
  const useGameSetting = create((set, get) => ({
    gameStage: 1,
    isDomestic: false,
    isLoaded: useLoadScript(get().isDomestic ? "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=4vgyzjsnlj&submodules=panorama"
    : "https://maps.googleapis.com/maps/api/js?key=AIzaSyC5fl-yV_BZhfIXZYDpU4JnCwFGDhd8oQA"),
    setGameStage: (value: number) => set((state) => ({...state, gameStage: value})),
    setIsDomestic: (value: boolean) => set((state) => ({...state, isDomestic: value})),
  }))
  return (
    <div>
      {gameStage === 1 && <MultiGameLoading />}
      {gameStage === 2 && <MultiGameProgress isDomestic={isDomestic} isLoaded={isLoaded} isObserver={false} /> }
      {gameStage === 3 && <MultiGameResult isDomestic={isDomestic} isLoaded={isLoaded} /> }
    </div>
  );
};