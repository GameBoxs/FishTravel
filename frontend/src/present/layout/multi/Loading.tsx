import styled from "styled-components";
import { LoadingIndicator } from "../../component/multi/LoadingIndicator";

type Props = {
  
};
export const Loading = (props: Props) => {
  return (
    <LoadingContainer>
      <LoadingIndicator />
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
`