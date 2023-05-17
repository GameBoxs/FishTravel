import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Client, Message } from '@stomp/stompjs';
import { useUserStore } from '../../store/userStore';
import GameConnect from '../component/gamelobby/GameConnect';
import UserList from '../layout/gamelobby/UserList';
import { useLocation, useParams } from 'react-router';

const GameLobbyPage = () => {
  const { state } = useLocation() as unknown as {
    state: string;
  };
  const [roomCode, setRoomCode] = useState<string | null>(null);

  useEffect(() => {
    console.log(state);
  }, []);
  const callback = (message: any) => {
    // called when the client receives a STOMP message from the server
    if (message.body) {
      console.log(message);
      alert('got message with body ' + message.body);
    } else {
      alert('got empty message');
    }
  };

  return (
    <>
      <GameConnect roomCode={roomCode} setRoomCode={setRoomCode} callback={callback} />
      {roomCode != null ? (
        <UserList callback={callback}>
          <></>
        </UserList>
      ) : null}
      {roomCode}
    </>
  );
};

export default GameLobbyPage;
