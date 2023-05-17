import styled from 'styled-components';

export const TimerText = styled.p`
    text-align: center;
    color: #ffffffb5;
    font-size: 33px;
    font-weight: 800;
`

export const TimerWrapper = styled.div`
    width: 150px;
    height: 50px;
    border-radius: 36px;
    background: #000000ac;
    position: absolute;
    top: 2%;
    left: 44%;
    z-index: 10;

    @media screen and (max-width: 425px) {
        transform: translateX(-20px);
        width: 100px;
        height: 35px;
        * {
            font-size: 24px;
        }
    }

    @media screen and (max-width: 1024px) {
        left: 44%;
    }

    @media screen and (max-width: 1920px) {
        left: 47%;
    }


    @media screen and (min-width: 2560px) {
        left: 47%;
    }
`

