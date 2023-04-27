import styled from 'styled-components';

export const ViewWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`

export const MapWrapper = styled.div`
    width: 30%;
    height: 30%;
    position: absolute;
    top: 0;
    left: 0;
`

export const RoadWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    & .roadText {
        visibility: hidden;
    }
`

export const SingleWrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
`;