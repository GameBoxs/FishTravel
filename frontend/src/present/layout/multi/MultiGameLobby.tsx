import styled from "styled-components";
import { ChattingHolder } from "../../component/multi/ChattingHolder";
import { LobbyUserHolder } from "../../component/multi/LobbyUserHolder";

type Props = {
  
};
export const MultiGameLobby = (props: Props) => {
  return (
    <LobbyContainer>
      <ChattingHolder />
      <LobbyUserHolder />
    </LobbyContainer>
  );
};

const LobbyContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #0C134F;
  background-image: linear-gradient(45deg, #1D267D 0%, #5C469C 46%, #D4ADFC 100%);
`