import styled from "styled-components";
import { motion } from "framer-motion";
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
          <MiddleContent>
            <motion.img src="https://static.wikia.nocookie.net/seuss/images/3/35/Parachute_Fish.PNG" alt="" animate={{}} />
          </MiddleContent>
          <FallingMessage>
            XX가 떨어지고 있습니다.
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
  width: 100vw;
  height: 100vh;
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
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
  border-top: 1px black solid;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 6vh;
`
const MiddleContent = styled.div`
  width: 100%;
  height: 60%;
`