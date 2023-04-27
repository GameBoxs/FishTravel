import styled from 'styled-components';

export const ViewWrapper = styled.div`
    width: 100%;
    height: 100%;
`

export const MapWrapper = styled.div`
    width: 30%;
    height: 30%;
    bottom: 0.5%;
    right: 0.5%;
    opacity: 0.2;
    transition: 500ms;
    :focus {
        outline: none;
    }
    :hover {
        opacity: 1;
    }
    z-index: 100;
`

export const RoadWrapper = styled.div`
    width: 100%;
    height: 100%;
    & .roadText {
        visibility: hidden;
    }
`

export const SingleWrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;