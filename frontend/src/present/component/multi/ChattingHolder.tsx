import styled from 'styled-components';
import { ChattingItem } from './ChattingItem';
import { ChattingInput } from './ChattingInput';
import { useEffect, useState } from 'react';

type Message = {
  requester: any;
  message: string;
};

type Props = {
  message: any;
};
export const ChattingHolder = ({ message }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    console.warn(messages);
    if (message) {
      setMessages((prevMessages) => [...prevMessages, message]); // 메시지 추가
    }
  }, [message]); // message가 바뀔 때마다 effect 실행

  return (
    <ChattingHolderContainer>
      <ChattingListContainer>
        {messages.map(
          (
            msg,
            index, // 메시지 배열 순회하여 각 메시지에 대해 ChattingItem 렌더링
          ) => (
            <ChattingItem key={index} message={msg} />
          ),
        )}
      </ChattingListContainer>
      <ChattingInput />
    </ChattingHolderContainer>
  );
};
const ChattingHolderContainer = styled.div`
  position: absolute;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
  width: 50vw;
  height: 50vh;
`;
const ChattingListContainer = styled.div`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  background-color: rgba(200, 200, 200, 1);
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
