import React from "react"

import { styled } from "styled-components"

const StyledCardUnloaded = styled.div`
    border-radius: 10px;
    overflow: hidden;

    height: 317px;

    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

    .img {
        position: relative;

        width: 260px;
        height: 260px;

        background-color: rgba(0, 0, 0, 0.1);

        overflow: hidden;

        &::after {
            content: "";
            
            position: absolute;
            top: 50%;
            left: -20%;

            width: 0px;
            height: 400px;

            transform: translateY(-50%) rotateZ(173deg);

            background-color: transparent;
            box-shadow: 0px 0px 50px 30px rgba(255, 255, 255, .8);
            animation: loading 1.8s linear infinite;
        }
    }

    @keyframes loading {
        0% { left: -20% }
        60% { left: 120% }
        100% { left: 120% }
    }

    .content {
        z-index: 4;

        padding: 0 7px;
        padding-bottom: 3px;

        & > * {
            padding-top: 2px;
        }
    }

    @media only screen and (width <= 645px) {
        width: 200px;
        height: calc(200px + 57px);

        .img {
            width: 200px;
            height: 200px;
        }
    }

    @media only screen and (width <= 490px) {
        width: 150px;
        height: calc(150px + 57px);;

        .img {
            width: 150px;
            height: 150px;
        }
    }
`

function CardUnloaded({ style }) {
    return (
        <StyledCardUnloaded style={style}>
            <div className="img"></div>
            <div className="content"></div>
        </StyledCardUnloaded>
    )
}

export default CardUnloaded