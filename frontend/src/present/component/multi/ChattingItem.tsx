import { useState } from 'react';
import styled from 'styled-components';

type Message = {
  requester: any;
  message: string;
};

type Props = {
  message: Message;
};

export const ChattingItem = ({ message }: Props) => {
  return (
    <ChattingContainer>
      <ChattingHeader>
        <IconItem src="https://cdn-icons-png.flaticon.com/128/149/149071.png" />
        <NicknameItem>{message?.requester?.name}</NicknameItem>
      </ChattingHeader>
      <TextItem>{message?.message}</TextItem>
    </ChattingContainer>
  );
};

const ChattingContainer = styled.div`
  position: relative;
  width: max-content;
  max-width: calc(90% - 36px);
  height: max-content;
  margin: 20px 0 20px 10px;
`;
const ChattingHeader = styled.div``;
const IconItem = styled.img`
  width: 50px;
  height: 50px;
`;
const NicknameItem = styled.span`
  position: absolute;
  top: 0;
`;
const TextItem = styled.div`
  width: 100%;
  font-size: small;
  padding: 12px;
  margin-left: 40px;
  border-radius: 2rem;
  border-top-left-radius: 0;
  background-color: rgba(255, 255, 255, 0.9);
`;
