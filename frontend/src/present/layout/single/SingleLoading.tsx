import styled from "styled-components";
import { motion } from "framer-motion";

export const SingleLoading = () => {
  return (
    <>
      <Background>
        <Jumbotron>
          <RoundCountContainer>
          </RoundCountContainer>
          <MiddleContent>
            <motion.img src="https://static.wikia.nocookie.net/seuss/images/3/35/Parachute_Fish.PNG" alt="" initial={{scale: 1.5} } animate={{ scale: 1, rotateZ: 360, scaleX: 0, scaleY: 0}} transition={{repeat: Infinity, duration: 5}} />
          </MiddleContent>
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
  background-image: url("https://cdn.mos.cms.futurecdn.net/yCPyoZDQBBcXikqxkeW2jJ-970-80.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`
const RoundCountContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 6vh;
  `
const RoundCountText = styled.div`
  text-align: center;
  padding: 4px 8px;
  border-radius: 2.5rem;
  color: white;
  box-shadow: 9px 10px 98px -22px rgba(0,0,0,0.75);
  -webkit-box-shadow: 9px 10px 98px -22px rgba(0,0,0,0.75);
  -moz-box-shadow: 9px 10px 98px -22px rgba(0,0,0,0.75);
`

const FallingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.5);
  margin: 0px 5vw;
  white-space: nowrap;
  overflow: hidden;
  box-shadow: 9px 10px 98px -22px rgba(0,0,0,0.75);
  -webkit-box-shadow: 9px 10px 98px -22px rgba(0,0,0,0.75);
  -moz-box-shadow: 9px 10px 98px -22px rgba(0,0,0,0.75);
`
const MiddleContent = styled.div`
  display: flex;
  width: 100%;
  height: 60%;
  align-items: center;
  justify-content: center;
`