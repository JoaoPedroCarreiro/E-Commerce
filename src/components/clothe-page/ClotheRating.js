import React from "react"

import { styled } from "styled-components"

const StyledClotheRating = styled.div`
    display: flex;
    justify-content: end;
    gap: 5px;

    align-items: center;

    .amount {
        background-color: var(--logo-color);
        border-radius: 5px;
        padding: 2px 5px;

        color: white;
        font-size: .8rem;

        display: flex;
        justify-content: center;
        align-items: center;

        height: min-content;
    }

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

function ClotheRating({ rating }) {
    return (
        <StyledClotheRating $rating={4.8}>
            <div className="amount">4.8</div>
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
        </StyledClotheRating>
    )
}

export default ClotheRating