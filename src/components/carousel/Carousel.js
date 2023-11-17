import React, { useCallback, useEffect, useState, useRef, createContext, Children } from "react"

import { styled } from "styled-components"

import CarouselArrows from "./carousel-items/CarouselArrows"
import CarouselLoadingBar from "./carousel-items/CarouselLoadingBar"
import CarouselIndexButtons from "./carousel-items/CarouselIndexButtons"
import CarouselIndexButton from "./carousel-items/CarouselIndexButton"

const CarouselContext = createContext(null)

const StyledCarousel = styled.div`
    position: relative;

    width: 100%;
    height: max-content;

    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;

    transition: background-image ${({ $transitionAnimationTime }) => $transitionAnimationTime} ease;

    z-index: 1;
`

const CarouselItems = styled.div`
    width: 100%;
    height: 100%;
`

function Carousel({ children }) {
    const [index, setIndex] = useState(0)
    const [buttonsDisabled, setButtonsDisabled] = useState(false)

    const loadingBarRef = useRef(0)

    const eachSectionTime = {
        js: 10000,
        css: "10s"
    }

    const transitionAnimationTime = {
        js: 250,
        css: ".25s"
    }

    const useElement = Children.map(children, child => child)
    const useBg = Children.map(children, child => child.props.bg)

    const setIndexAndResetAnimation = useCallback((index) => {
        setIndex(index)

        setButtonsDisabled(true)
        setTimeout(() => {
            setButtonsDisabled(false)
        }, transitionAnimationTime.js + 10)

        loadingBarRef.current.classList.remove("loading-bar")
        setTimeout(() => {
            loadingBarRef.current.classList.add("loading-bar")
        }, 10)
    }, [transitionAnimationTime.js])
    
    const move = useCallback((spd) => {
        const length = useBg.length

        if(spd > 0 && index + spd >= length) return setIndexAndResetAnimation((index + spd) - length)
        if(spd < 0 && index + spd <= -1) return setIndexAndResetAnimation(length + (index + spd))

        return setIndexAndResetAnimation(index + spd)
    }, [useBg.length, index, setIndexAndResetAnimation])

    const displayIndexButtons = () => {
        const arr = []

        for(let i = 0; i < useBg.length; i++) {
            arr.push(<CarouselIndexButton ariaLabel={"button-index-" + i} key={"button-index-" + i} isCurrentIndex={i === index} onClick={() => move(i - index)}/>)
        }

        return arr
    }

    useEffect(() => {
        const changeTimer = setTimeout(() => move(1), eachSectionTime.js)

        return () => {
            clearTimeout(changeTimer)
        }
    }, [move, eachSectionTime.js])

    return (
        <CarouselContext.Provider value={{ eachSectionTime: eachSectionTime.css, buttonsDisabled: buttonsDisabled }}>
            <StyledCarousel $transitionAnimationTime={transitionAnimationTime.css} style={{ backgroundImage: `url(${useBg[index]})`}}>
                <img src="" alt="none" width={1920} height={500} style={{ opacity: 0, width: "100%", height: "auto", maxHeight: "500px" }} />
                <CarouselItems>
                    {useElement[index]}
                </CarouselItems>
                <CarouselArrows move={move}/>
                <CarouselIndexButtons>
                    {displayIndexButtons()}
                </CarouselIndexButtons>
                <CarouselLoadingBar ref={loadingBarRef}/>
            </StyledCarousel>
        </CarouselContext.Provider>
    )
}

export { CarouselContext }
export default Carousel