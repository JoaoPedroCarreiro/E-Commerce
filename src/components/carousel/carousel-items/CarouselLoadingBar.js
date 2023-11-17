import React, { forwardRef, useContext } from "react"

import { styled } from "styled-components"

import { CarouselContext } from "components/carousel/Carousel"

const StyledCarouselLoadingBar = styled.div`
    position: absolute;
    bottom: 0;
    
    width: 100%;
    height: 4px;
    background-color: rgba(0, 0, 0, .3);

    .loading-bar {
        height: 100%;
        background-color: var(--logo-color);

        animation: loading-bar-animation ${({ $eachSectionTime }) => $eachSectionTime} linear;
    }

    @keyframes loading-bar-animation {
        0% { width: 0 }
        100% { width: 100% }
    }
`

const CarouselLoadingBar = forwardRef((props, ref) => {
    const { eachSectionTime } = useContext(CarouselContext)

    return (
        <StyledCarouselLoadingBar $eachSectionTime={eachSectionTime}>
            <div ref={ref} className="loading-bar"></div>
        </StyledCarouselLoadingBar>
    )
})

export default CarouselLoadingBar