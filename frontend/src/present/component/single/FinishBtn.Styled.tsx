import styled from "styled-components";

export const BtnWrapper = styled.div`
    @font-face {
        font-family: 'PyeongChang-Bold';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/PyeongChang-Bold.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'PyeongChang-Bold', sans-serif;
    color: #3d3d3d;
    
    background-color: #21c9c0;
    cursor: pointer;

    position: absolute;
    z-index: 10;
    border-radius: 15px;
    width: 100px;
    height: 30px;
    bottom: 1%;
    left: 45%;
    transition: 500ms;
    text-align: center;
    line-height: 30px;

    :hover {
        background-color: #00fff2;
        left: 42.5%;
        width: 200px;
        height: 30px;
    }
`