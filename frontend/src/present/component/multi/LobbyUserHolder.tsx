import styled from "styled-components";
import { LobbyUserItem } from "./LobbyUserItem";

type Props = {
  
};
export const LobbyUserHolder = (props: Props) => {
  return (
    <UserHolderContainer>
      <LobbyUserItem />
      <LobbyUserItem />
      <LobbyUserItem />
      <LobbyUserItem />
    </UserHolderContainer>
  );
};

const UserHolderContainer = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  width: 100%;
  height: 25vh;
  background-color: rgba(255, 255, 255, 0.5);
`