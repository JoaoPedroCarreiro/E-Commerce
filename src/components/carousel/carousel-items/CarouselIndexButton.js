import React, { useContext } from "react"

import { styled } from "styled-components"
import { CarouselContext } from "../Carousel"

const StyledCarouselIndexButton = styled.button`
    width: 5px;
    height: 5px;

    background-color: ${({ $isCurrentIndex }) => $isCurrentIndex ? "var(--logo-color)" : "white"};

    border-radius: 50%;
    overflow: hidden;

    transition: all .3s ease;

    &:hover {
        background-color: var(--logo-color);
        width: 10px;
        height: 10px;
    }
`

function CarouselIndexButton({ ariaLabel, isCurrentIndex, onClick }) {
    const { buttonsDisabled } = useContext(CarouselContext)

    return <StyledCarouselIndexButton aria-label={ariaLabel} $isCurrentIndex={isCurrentIndex} onClick={onClick} disabled={buttonsDisabled} />
}

export default CarouselIndexButton