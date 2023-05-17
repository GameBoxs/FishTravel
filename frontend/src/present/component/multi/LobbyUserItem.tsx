import styled from "styled-components";

type Props = {
  
};
export const LobbyUserItem = (props: Props) => {
  return (
    <UserContainer>
      <IconItem src="https://cdn-icons-png.flaticon.com/128/149/149071.png" />
      <TextItem>아이디</TextItem>
    </UserContainer>
  );
};

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
  width: calc(100% - 16px);
  height: calc(100% - 16px);
  margin: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 2rem;
`
const IconItem = styled.img`
  position: relative;
  width: 15vh;
  max-height: 15vh;
  height: auto;
  border-radius: 50%;
  border: 4px solid #146C94;
`
const TextItem = styled.span`
  color: black
`