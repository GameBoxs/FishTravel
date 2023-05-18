import { useState } from 'react';
import styled from 'styled-components';
import { useUserStore } from '../../../store/userStore';
import { useGameInfoStore } from '../../pages/MultiGamePage';

type Props = {};
export const ChattingInput = (props: Props) => {
  const [text, setText] = useState('');
  const { connection, id, name } = useUserStore();
  const { roomId } = useGameInfoStore();
  function onChangeText(e: any) {
    setText(e.target.value);
  }

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      // 엔터키를 눌렀을 때 동작
      connection.publish({
        destination: `/pub/room/${roomId}/chat`,
        body: JSON.stringify({
          message: `${text}`,
          requester: {
            id: id,
            name: name,
          },
        }),
      });
      setText('');
      console.log('You pressed enter!');
    }
  };

  return (
    <div>
      <InputItem type="text" value={text} onChange={onChangeText} onKeyPress={handleKeyPress} />
    </div>
  );
};

const InputItem = styled.input`
  width: calc(100% - 16px);
  height: 3vh;
  border-radius: 2rem;
  padding: 8px;
  margin-top: 1vh;
  border: 0px;
  background-color: rgba(200, 200, 200, 1);
  :focus {
    background-color: rgba(255, 255, 255, 1);
  }
  -webkit-transition: background-color 0.5s ease-in-out;
  -moz-transition: background-color 0.5s ease-in-out;
  -o-transition: background-color 0.5s ease-in-out;
  transition: background-color 0.5s ease-in-out;
`;
