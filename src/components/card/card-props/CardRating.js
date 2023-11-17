import React from "react"

import { styled } from "styled-components"

const StyledCardRating = styled.div`
    display: flex;
    justify-content: end;

    .first-bg {
        display: flex;
        gap: 5px;
        justify-content: center;
        align-items: center;
    }

    .second-bg {
        width: 100%;
        background-color: var(--logo-color);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }

    .contentRating {
        width: 100%;
        display: flex;
        
        width: ${({ $rating }) => 100 - (($rating * 100) / 5)}%;
        background-color: var(--logo-color-lighter);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }

    .contentRating > * {
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }
`

function CardRating({ rating }) {
    return (
        <StyledCardRating $rating={rating}>
            <div className="first-bg">
                <div className="second-bg">
                    <div className="contentRating">
                        <span className="bi bi-star-fill"></span>
                        <span className="bi bi-star-fill"></span>
                        <span className="bi bi-star-fill"></span>
                        <span className="bi bi-star-fill"></span>
                        <span className="bi bi-star-fill"></span>
                    </div>
                </div>
            </div>
        </StyledCardRating>
    )
}

export default CardRating