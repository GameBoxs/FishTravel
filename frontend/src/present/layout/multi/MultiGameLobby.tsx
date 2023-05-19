import { Client } from '@stomp/stompjs';
import { GrCirclePlay } from 'react-icons/gr';
import { ImExit } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUserStore } from '../../../store/userStore';
import { ChattingHolder } from '../../component/multi/ChattingHolder';
import { LobbyUserHolder } from '../../component/multi/LobbyUserHolder';
import { useGameInfoStore } from '../../pages/MultiGamePage';

type Props = {
  message: any;
};
export const MultiGameLobby = ({ message }: Props) => {
  const { connection, id } = useUserStore();
  const { roomId, managerId } = useGameInfoStore();
  const navigate = useNavigate();
  const handleStart = () => {
    (connection as Client).publish({
      destination: `/pub/room/${roomId}/start`,
    });
  };
  return (
    <LobbyContainer>
      <ChattingHolder message={message} />
      <LobbyUserHolder />
      {id && Number(id) === managerId &&
      <StartButton onClick={handleStart}>
        <GrCirclePlay />
        시작
      </StartButton>}
      <ExitButton onClick={() => {navigate('/')}}>
        <ImExit />
        나가기
      </ExitButton>
    </LobbyContainer>
  );
};

const LobbyContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #0c134f;
  background-image: linear-gradient(45deg, #1d267d 0%, #5c469c 46%, #d4adfc 100%);
`;
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
`;
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
`;
