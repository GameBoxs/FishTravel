import styled from "styled-components";
import { ChattingItem } from "./ChattingItem";
import { ChattingInput } from "./ChattingInput";

type Props = {
  
};
export const ChattingHolder = (props: Props) => {
  return (
    <ChattingHolderContainer>
      <ChattingListContainer>
        <ChattingItem />
        <ChattingItem />
        <ChattingItem />
        <ChattingItem />
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
`
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
`