import React, { createContext, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"

import { styled } from "styled-components"
import PageBase from "./PageBase"

import api from "api"
import ClotheImg from "./clothe-page/ClotheImg"
import Preload from "./useful/Preload"
import ClotheRating from "./clothe-page/ClotheRating"
import AddToWishlist from "./clothe-page/AddToWishlist"
import AddToCart from "./clothe-page/AddToCart"

const ClothePageContext = createContext(null)

const StyledClothePage = styled.div`
    margin: 50px;
    padding: 15px;

    display: flex;
    justify-content: center;
    gap: 75px;

    & > div {
        width: 450px;
        height: 450px;

        padding: 25px 0px;
    }
    
    @media only screen and (width <= 1200px) {
        flex-direction: column;
        align-items: center;
    }

    @media only screen and (width <= 590px) {
        gap: 25px;
        margin: 25px;

        & > div {
            width: 350px;
            height: 350px;
        }
    }

    @media only screen and (width <= 490px) {
        & > div {
            width: 250px;
            height: 250px;
        }
    }
`

const Info = styled.div`
    position: relative;
    
    display: flex;
    flex-direction: column;

    gap: 15px;

    animation: fadeInWhenStart .5s ease-out;
`

const Colors = styled.div`
    display: flex;
    gap: 10px;

    button {
        width: 35px;
        height: 20px;

        border-radius: 20px;
        border: 1px solid rgba(0, 0, 0, .2);
    }
`

const Sizes = styled.div`
    display: flex;
    gap: 10px;
`

const Title = styled.h1`
    position: relative;

    font-weight: 300;
    font-size: 1.1rem;

    &::after {
        content: "";

        position: absolute;

        left: 0;
        bottom: -4px;

        width: 35px;
        height: 3px;

        background-color: var(--logo-color);
    }

    @media only screen and (width <= 490px) {
        font-size: .9rem;
        display: flex;
        flex-direction: column;
    }
`

const SubTitle = styled.h2`
    position: relative;

    font-weight: 500;
    font-size: 1.2rem;

    color: rgb(40, 40, 40);

    @media only screen and (width <= 490px) {
        font-size: 1rem;
    }
`

const Price = styled.p`
    position: relative;

    font-size: 1.65rem;
    color: rgb(40, 40, 40);

    font-weight: 700;

    &::after {
        content: "";

        position: absolute;

        left: 0;
        bottom: -6px;

        width: 100%;
        height: 1px;

        background-color: rgba(0, 0, 0, 0.1);
    }

    @media only screen and (width <= 490px) {
        font-size: 1.4rem;
    }
`

const Color = styled.button`
    &.selected {
        border: 2px solid var(--logo-color);
    }
`

const Size = styled.button`
    width: 2rem;
    height: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;

    font-size: 1rem;
    
    color: white;
    background-color: var(--logo-color);

    font-weight: 700;

    padding: 5px;

    transition: all .3s ease;

    &:hover {
        opacity: .85;
    }

    &.selected {
        opacity: .85;
        border: 2px solid rgba(0, 0, 0, .3);
    }
`

const Sub = styled.span`
    font-size: .75rem;
    padding-left: 5px;

    @media only screen and (width <= 490px) {
        padding-left: 0px;
    }
`

function ClothePage() {
    const [content, setContent] = useState(0)
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")
    const [biggerImg, setBiggerImg] = useState("")
    const [imgs, setImgs] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const sizesRef = useRef(0)
    const colorsRef = useRef(0)

    const { pathname } = useLocation()
    const id = pathname.split("/")[pathname.split("/").length - 1]

    useEffect(() => {
        (async () => {
            const { data } = await api.get(pathname)

            document.title = "Cherry Shop " + data.name

            setContent(data)
            setColor(data.colors ? data.colors[0].toLowerCase() : "")
            setBiggerImg(data.colors ? data.images[data.colors[0].toLowerCase()][0] : data.images[0])

            const arr = []

            if(data.colors) {
                for(const color in data.images) {
                    for(const img of data.images[color]) {
                        arr.push(img)
                    }
                }

                setImgs(arr)
                setIsLoading(false)
                return
            }

            for(const img of data.images) {
                arr.push(img)
            }

            setImgs(arr)
            setIsLoading(false)
        })()
    }, [pathname])

    const displayColors = () => {
        const arr = []

        for(const color of content.colors) {
            arr.push(
                <Color
                    key={"btn-select-" + color.toLowerCase().split(" ").join("-")}
                    id={"btn-select-" + color.toLowerCase().split(" ").join("-")}
                    onClick={() => { setColor(color.toLowerCase()); setBiggerImg(content.images[color.toLowerCase()][0]) }}
                    style={{backgroundColor: `var(--${color.toLowerCase().split(" ").join("-")})`}}
                ></Color>
            )
        }

        return arr
    }

    useEffect(() => {
        if(!size) return

        for(const child of sizesRef.current.children) {
            child.classList.remove("selected")
        }

        sizesRef.current.querySelector(`[value="${size}"]`).classList.add("selected")
    }, [size])

    useEffect(() => {
        if(!color) return

        for(const child of colorsRef.current.children) {
            child.classList.remove("selected")
        }

        colorsRef.current.querySelector(`#btn-select-${color.split(" ").join("-")}`).classList.add("selected")
    }, [color])

    const displaySizes = {
        "shoes": <>
            <Size value="5" onClick={() => setSize("5")}>5</Size>
            <Size value="6" onClick={() => setSize("6")}>6</Size>
            <Size value="6.5" onClick={() => setSize("6.5")}>6.5</Size>
            <Size value="7.5" onClick={() => setSize("7.5")}>7.5</Size>
            <Size value="8" onClick={() => setSize("8")}>8</Size>
            <Size value="9" onClick={() => setSize("9")}>9</Size>
            <Size value="9.5" onClick={() => setSize("9.5")}>9.5</Size>
        </>,
        "accessories": <></>
    }

    return (
        <PageBase>
            <ClothePageContext.Provider value={{ content: content, color: color, biggerImg: biggerImg, setBiggerImg: setBiggerImg }}>
                <Preload $imgs={imgs} />
                <StyledClothePage>
                    <ClotheImg />
                    {
                        !isLoading ?
                            <Info>
                                <Title>{content.name} <Sub>Total buys: {content["total-buys"]}</Sub><AddToWishlist id={id} /></Title>
                                <Price>${content.price}</Price>
                                {
                                    content.colors ?
                                        <>
                                            <SubTitle>Colors: </SubTitle>
                                            <Colors ref={colorsRef}>{displayColors()}</Colors>
                                        </>
                                    :
                                        <></>
                                }
                                {
                                    !displaySizes[content.categorie] ? 
                                        <>
                                            <SubTitle>Sizes: </SubTitle>
                                            <Sizes ref={sizesRef}>
                                                <Size value="xs" onClick={() => setSize("xs")}>XS</Size>
                                                <Size value="s" onClick={() => setSize("s")}>S</Size>
                                                <Size value="m" onClick={() => setSize("m")}>M</Size>
                                                <Size value="l" onClick={() => setSize("l")}>L</Size>
                                                <Size value="xl" onClick={() => setSize("xl")}>XL</Size>
                                            </Sizes>
                                        </>
                                    :
                                        !displaySizes[content.categorie].props.children ?
                                            <></>
                                        :
                                            <>
                                                <SubTitle>Sizes: </SubTitle>
                                                <Sizes ref={sizesRef}>
                                                    {displaySizes[content.categorie]}
                                                </Sizes>
                                            </>
                                }
                                <ClotheRating />
                                <AddToCart
                                    content={content} size={size} color={color}
                                    hasSize={displaySizes[content.categorie] ? !!displaySizes[content.categorie].props.children : true}
                                >Add To Cart</AddToCart>
                            </Info>
                        :
                            <Info />
                    }
                </StyledClothePage>
            </ClothePageContext.Provider>
        </PageBase>
    )
}

export { ClothePageContext }
export default ClothePage