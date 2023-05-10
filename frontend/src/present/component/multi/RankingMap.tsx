import { useEffect } from "react";
import styled from "styled-components";
import { LatLng } from "../../layout/multi/MultiGameResult";

type Props = {
  answerPosition: LatLng,
  selectedPosition: LatLng,
  id: string
};
export const RankingMap = ({answerPosition, selectedPosition, id }: Props) => {
  
  useEffect(() => { 

  }, [])

  return (
    <RankingMapContainer id={id}>
      
    </RankingMapContainer>
  );
};

const RankingMapContainer = styled.div`
  display: grid;
  width: 50vw;
  height: 30vh;
  margin-top: 1vh;
  background: white;
  align-items: center;
  justify-content: center; 
  border-radius: 2rem 2rem 0 0;
`