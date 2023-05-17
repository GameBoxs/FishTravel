import styled from "styled-components";

type Props = {
  
};
export const ChattingInput = (props: Props) => {
  return (
    <div>
      <InputItem placeholder="채팅을 작성해보세요."/>
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
`