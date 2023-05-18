import styled from "styled-components";
import { useGameInfoStore } from "../../pages/MultiGamePage";
import { LobbyUserItem } from "./LobbyUserItem";

type Props = {
  
};
export const LobbyUserHolder = (props: Props) => {
  const { players } = useGameInfoStore();
  return (
    <UserHolderContainer>
      {players?.map((p) => <LobbyUserItem id={p.id} name={p.name} isInviter={false} />)}
      {players!.length < 6 && <LobbyUserItem id={0} name={""} isInviter={true} />}
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