import React from "react"

import { styled } from "styled-components"

const StyledCarouselItem1 = styled.div`
    font-size: 5rem;
    transform: translateY(90px) translateX(150px);

    * {
        font-family: 'Anton', sans-serif;
        color: rgb(22, 48, 72);
    }
`

function CarouselItem1() {
    return (
        <StyledCarouselItem1>
        </StyledCarouselItem1>
    )
}

const StyledCarouselItem2 = styled.div`
    font-size: 4rem;
    transform: translateY(90px) translateX(calc(65%));

    * {
        font-family: 'Anton', sans-serif;
        color: rgb(7, 14, 49);
    }
`

function CarouselItem2() {
    return (
        <StyledCarouselItem2>
        </StyledCarouselItem2>
    )
}

export { CarouselItem1, CarouselItem2 }