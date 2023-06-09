import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Client, Message } from '@stomp/stompjs';
import { useUserStore } from '../../../store/userStore';

const GameConnect = ({ roomCode, setRoomCode, callback }: any) => {
  const connection = useUserStore((state) => state.connection);
  const setConnection = useUserStore((state) => state.setConnection);
  const id = useUserStore((state) => state.id);
  const name = useUserStore((state) => state.name);
  const [subscription, setSubscription] = useState<any | null>(null);

  useEffect(() => {
    if (roomCode != null) {
      setConnection(
        new Client({
          brokerURL: 'wss://k8d205.p.ssafy.io/api/ws',
          connectHeaders: {
            login: 'guest',
            passcode: 'guest',
          },
          debug: function (str) {
            console.log(str);
          },
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
        }),
      );
    }
  }, [roomCode]);

  useEffect(() => {
    if (connection != null) {
      console.log(`/topic/${roomCode}`);
      connection.onConnect = function (frame: any) {
        console.log('Connect Success!');
        setSubscription(connection.subscribe(`/topic/${roomCode}`, callback));
        // Do something, all subscribes must be done is this callback
        // This is needed because this will be executed after a (re)connect
      };

      connection.onStompError = function (frame: any) {
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      };

      connection.activate();
    }
  }, [connection]);

  useEffect(() => {
    if (subscription != null) {
      connection.publish({
        destination: `/pub/room/${roomCode}/enter`,
        body: JSON.stringify({
          requester: { id: id, name: name },
        }),
      });
    }
  }, [subscription]);
  return <></>;
};

export default GameConnect;
