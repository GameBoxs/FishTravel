import styled from "styled-components";

// @flow 
type Props = {
  
};
export const MultiGameLoading = (props: Props) => {
  return (
    <>
      <Background>
        <Jumbotron>
          <RoundCount>
            Round 1
          </RoundCount>
          <FallingMessage>
            
          </FallingMessage>
        </Jumbotron>
      </Background>
    </>
  );
};

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: gray;
`
const Jumbotron = styled.div`
  width: 50vw;
  height: 60vh;
  background-color: white;
  border: black;
  border-radius: 2.5rem;
  overflow: hidden;
`
const RoundCount = styled.div`
  border-bottom: 1px black solid;
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 6vh;
`

const FallingMessage = styled.div`
  
`