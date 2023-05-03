import styled from "styled-components";

export const TempMarker = styled.div`
    width: 25px;
    height: 25px;
    background: black;
    position: absolute;
    z-index: 10;
    border-radius: 50%;
`

export const ResultWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #4158D0;
    background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
`

export const StageText = styled.span`
    font-size: 50px;
    font-weight: bolder;
    text-shadow: 2px 2px 4px black;
    color: white;
    top: 2%;
    left: 45%;
    position: absolute;
`

export const ResultMap = styled.div`
    width: 40%;
    height: 40%;
    border-radius: 10px;
    position: absolute;
    background-color: white;
    top: 12%;
    left: 30%;
    :focus {
        outline: none;
    }
    * {
        cursor: default !important;
    }
`

export const ResultInfo = styled.div`
    width: 40%;
    height: 25%;
    border-radius: 10px;
    position: absolute;
    background-color: #00000050;
    left: 30%;
    bottom: 15%;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 20% 80%;
`

export const ResultText = styled.h1`
    color: white;
    font-size: 20px;
    text-align: center;
    margin: auto;
`