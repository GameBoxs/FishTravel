import styled from "styled-components";

type Props = {
  id: number,
  name: string,
  isInviter: boolean,
};
export const LobbyUserItem = ({ id, name, isInviter }: Props) => {
  const handleInvite = () => { 
    navigator.clipboard.writeText(window.location.href).then((cliptext) => { 
      alert("현재 방의 URL이 복사되었습니다. 친구에게 공유해보세요!");
    })
  }
  return (
    <UserContainer>
      {!isInviter &&
        <>
        <IconItem src="https://cdn-icons-png.flaticon.com/128/149/149071.png" />
        <TextItem>{name}</TextItem>
        </>
      }
      {isInviter && <>
        <InviteButton src="https://cdn-icons-png.flaticon.com/512/1057/1057240.png" onClick={handleInvite} />
        <TextItem>초대하기</TextItem>
      </>}
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
  color: black;
`
const InviteButton = styled.img`
  position: relative;
  width: 15vh;
  max-height: 15vh;
  height: auto;
  border-radius: 50%;
  border: 4px solid #146C94;
`