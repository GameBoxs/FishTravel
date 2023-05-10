import styled from "styled-components";

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
        width: 35%;
        height: 50%;
        opacity: 1;
    }
    z-index: 100;
`

export const RoadWrapper = styled.div`
    width: 100% !important;
    height: 100% !important;
    & .roadText {
        visibility: hidden;
    }
`

export const ViewWrapper = styled.div`
    width: 100%;
    height: 100%;
`

export const SingleWrapper = styled.div`
    width: 100%;
    height: 100%;
`;