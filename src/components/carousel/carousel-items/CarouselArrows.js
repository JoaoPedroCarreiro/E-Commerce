import React, { useContext } from "react"

import { styled } from "styled-components"
import { CarouselContext } from "../Carousel"

const StyledCarouselArrows = styled.div`
    button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        width: 60px;
        height: 50px;

        background-color: var(--carousel-button-color);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    button:hover {
        width: 70px;
        height: 60px;

        i {
            font-size: 2.2rem;
        }
    }

    button:after {
        content: "";

        position: absolute;
        top: 0;
        left: 0;

        display: block;
        width: 100%;
        height: 100%;

        background-color: var(--carousel-button-color);

        z-index: -1;
    }

    .left {
        left: 0;
    }

    .right {
        right: 0;
    }

    .left:after {
        transform-origin: top left;
        transform: skew(10deg);
    }

    .right:after {
        transform-origin: top right;
        transform: skew(-10deg);
    }

    i {
        font-size: 2rem;
        color: white;
    }

    button, i {
        transition: all .3s ease;
    }
`

function CarouselArrows({ move }) {
    const { buttonsDisabled } = useContext(CarouselContext)

    return (
        <StyledCarouselArrows>
            <button aria-label="Carousel-Left" className="left" onClick={() => move(-1)} disabled={buttonsDisabled}><i className="bi bi-caret-left-fill"></i></button>
            <button aria-label="Carousel-Right" className="right" onClick={() => move(1)} disabled={buttonsDisabled}><i className="bi bi-caret-right-fill"></i></button>
        </StyledCarouselArrows>
    )
}

export default CarouselArrows