import { useState } from 'react';
import { MultiGameLoading } from '../layout/multi/MultiGameLoading';
type Props = {
  
};
export const MultiGamePage = (props: Props) => {
  //로직
  //페이지 진입
  //1) 게임 진행중인 경우
  //1-1) 게임에 포함된 사람인지 확인
  //1-2) 게임에 포함된 경우, 죽은 사람 화면 띄워줌
  //2) 게임 
  const [gameStage, setGameStage] = useState(1);
  return (
    <div>
      { gameStage === 1 && <MultiGameLoading />}
    </div>
  );
};