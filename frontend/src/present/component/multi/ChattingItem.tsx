import styled from "styled-components";

type Props = {
  
};
export const ChattingItem = (props: Props) => {
  return (
    <ChattingContainer>
      <ChattingHeader>
        <IconItem src="https://cdn-icons-png.flaticon.com/128/149/149071.png" />
        <NicknameItem>
          닉네임
        </NicknameItem>
      </ChattingHeader>
      <TextItem>
      용내용  채팅 내용채팅 내용  채팅 내용채팅 내용  채팅 내용내용  채팅 내용채팅 내용  채팅 내용채팅 내용  채팅 내용내용  채팅 내용채팅 내용  채팅 내용채팅 내용  채팅 내용내용  채팅 내용채팅 내용  채팅 내용채팅 내용  채팅 내용내용  채팅 내용채팅 내용  채팅 내용채팅 내용  채팅 내용
      </TextItem>
    </ChattingContainer>
  );
};

const ChattingContainer = styled.div`
  position: relative;
  width: max-content;
  max-width: calc(90% - 36px);
  height: max-content;
  margin: 20px 0 20px 10px;
  `
const ChattingHeader = styled.div`
`
const IconItem = styled.img`
  width: 50px;
  height: 50px;
`
const NicknameItem = styled.span`
  position: absolute;
  top: 0;
`
const TextItem = styled.div`
  width: 100%;
  font-size: small;
  padding: 12px;
  margin-left: 40px;
  border-radius: 2rem;
  border-top-left-radius: 0;
  background-color: rgba(255, 255, 255, 0.9);
`