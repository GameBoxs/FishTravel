import { Client } from "@stomp/stompjs";
import { GrCirclePlay } from "react-icons/gr";
import { ImExit } from "react-icons/im";
import styled from "styled-components";
import { useUserStore } from "../../../store/userStore";
import { ChattingHolder } from "../../component/multi/ChattingHolder";
import { LobbyUserHolder } from "../../component/multi/LobbyUserHolder";
import { useGameInfoStore } from "../../pages/MultiGamePage";

type Props = {
  
};
export const MultiGameLobby = (props: Props) => {
  const { connection } = useUserStore();
  const {roomId } = useGameInfoStore();
  const handleStart = () => { 
    (connection as Client).publish({
      destination: `/pub/room/${roomId}/start`,
    })
  }
  return (
    <LobbyContainer>
      <ChattingHolder />
      <LobbyUserHolder />
      <StartButton onClick={handleStart}>
        <GrCirclePlay />
        시작
      </StartButton>
      <ExitButton>
        <ImExit />
        나가기
      </ExitButton>
    </LobbyContainer>
  );
};

const LobbyContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #0C134F;
  background-image: linear-gradient(45deg, #1D267D 0%, #5C469C 46%, #D4ADFC 100%);
`
const StartButton = styled.button`
  position: absolute;
  right: 1vw;
  top: 50vh;
  width: 20vw;
  height: 5vh;
  border: none;
  border-radius: 2.5rem;
  font-size: x-large;
  background: #5dbea3;
  color: black;
  `
const ExitButton = styled.button`
  position: absolute;
  right: 1vw;
  top: 56vh;
  width: 20vw;
  height: 5vh;
  border: none;
  border-radius: 2.5rem;
  font-size: x-large;
  background: #dd7973;
  color: white;
`