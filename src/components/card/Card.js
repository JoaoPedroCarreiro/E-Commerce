import React, { useContext, useEffect, useRef, useState } from "react"

import { styled } from "styled-components"

import api from "api"

import CardNamePrice, { CardName, CardPrice } from "./card-props/CardNamePrice"

import CardRating from "./card-props/CardRating"
import CardButtons from "./card-props/CardButtons"
import CardUnloaded from "./CardUnloaded"

import { PageBaseContext } from "components/PageBase"

const Box = styled.div`
    width: 260px;
    position: relative;
    perspective: 1200px;

    ${({ $categorieResponsivity }) =>
        !$categorieResponsivity ?
            `
                @media only screen and (width <= 645px) {
                    width: 200px;
                }

                @media only screen and (width <= 490px) {
                    width: 150px;
                }
            `
        :
            `
                @media only screen and (width <= 750px) {
                    width: 200px;
                }

                @media only screen and (width <= 500px) {
                    width: 150px;
                }

                @media only screen and (width <= 370px) {
                    width: 125px;
                }
            `
    }
`

const StyledCard = styled.a`
    border-radius: 10px;
    overflow: hidden;

    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

    .image {
        position: relative;
    }

    img {
        width: 260px;
        height: 260px;

        object-fit: cover;
    }

    &.useTransitionOut {
        transition: transform .2s linear;
    }

    &.useTransitionIn {
        transition: transform .1s linear;
    }

    .content {
        padding: 0 7px;
        padding-bottom: 3px;

        & > * {
            padding-top: 2px;
        }
    }

    ${({ $categorieResponsivity }) =>
        !$categorieResponsivity ?
            `
                @media only screen and (width <= 645px) {
                    img {
                        width: 200px;
                        height: 200px;
                    }
                }

                @media only screen and (width <= 490px) {
                    img {
                        width: 150px;
                        height: 150px;
                    }

                    font-size: .7rem;
                }
            `
        :
            `
                @media only screen and (width <= 750px) {
                    img {
                        width: 200px;
                        height: 200px;
                    }
                }

                @media only screen and (width <= 500px) {
                    img {
                        width: 150px;
                        height: 150px;
                    }
                    
                    font-size: .7rem;
                }

                @media only screen and (width <= 375px) {
                    img {
                        width: 125px;
                        height: 125px;
                    }
                    
                    font-size: .6rem;
                }
            `
    }
`

function Card({ src }) {
    const { setWishlistLength } = useContext(PageBaseContext)

    const [state, setState] = useState({
        id: 0,
        imgs: {},
        name: "",
        price: "",
        colors: [],
        rating: 0,
        selectedColor: "",
        gender: "", 
        categorie: ""
    })

    const [isLoading, setIsLoading] = useState(true)
    const [categorieResponsivity, setCategorieResponsivity] = useState(false)

    const cardRef = useRef(0)
    const heartRef = useRef(0)
    const boxRef = useRef(0)

    const onMouseMove = (e) => {
        const x = (e.layerX - cardRef.current.clientWidth / 2) / cardRef.current.clientWidth * 2
        const y = (e.layerY - cardRef.current.clientHeight / 2) / cardRef.current.clientHeight * 2

        cardRef.current.style.transform = `rotateX(${y * 17}deg) rotateY(${-x * 17}deg)`
    }

    const onMouseEnter = () => {
        cardRef.current.disabled = true
        cardRef.current.classList.remove("useTransitionOut")
        cardRef.current.classList.add("useTransitionIn")
        setTimeout(() => {
            cardRef.current.classList.remove("useTransitionIn")
            cardRef.current.disabled = false
        }, 100)
    }

    const onMouseLeave = () => {
        cardRef.current.classList.add("useTransitionOut")
        cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)"
    }

    useEffect(() => {
        if(document.body.hasAttribute("cardcategorie")) {
            setCategorieResponsivity(true)
        }

        (async () => {
            const wishlist = (await api.get("/wishlist")).data

            if(typeof src === "string") {
                const { data } = await api.get(src)

                const newState = {
                    id: data.id,
                    imgs: { default: data.images[0] },
                    name: data.name,
                    price: data.price,
                    colors: data.colors,
                    rating: data.rating,
                    selectedColor: data.colors ? data.colors[0].toLowerCase() : "default",
                    gender: data.gender, 
                    categorie: data.categorie
                }
    
                if(wishlist.includes(newState.id)) heartRef.current.classList.add("bigger")
    
                if(newState.colors) {
                    for(const color of newState.colors) {
                        newState.imgs[color.toLowerCase()] = data.images[color.toLowerCase()][0]
                    }
                }
    
                setState(newState)
                setIsLoading(false)
                boxRef.current.onmouseenter = onMouseEnter
                boxRef.current.onmouseleave = onMouseLeave
                cardRef.current.onmousemove = onMouseMove
                return
            }

            const newState = {
                id: src.id,
                imgs: { default: src.images[0] },
                name: src.name,
                price: src.price,
                colors: src.colors,
                rating: src.rating,
                selectedColor: src.colors ? src.colors[0].toLowerCase() : "default",
                gender: src.gender,
                categorie: src.categorie
            }

            if(wishlist.includes(newState.id)) heartRef.current.classList.add("bigger")

            if(newState.colors) {
                for(const color of newState.colors) {
                    newState.imgs[color.toLowerCase()] = src.images[color.toLowerCase()][0]
                }
            }

            setState(newState)
            setIsLoading(false)
            
            boxRef.current.onmouseenter = onMouseEnter
            boxRef.current.onmouseleave = onMouseLeave
            cardRef.current.onmousemove = onMouseMove
        })()
    }, [src])

    const displayColors = () => {
        const arr = []

        try {
            for(const color of state.colors) {
                arr.push(
                    <button aria-label={color} onMouseMove={(e) => e.preventDefault()} key={color} onClick={(e) => {e.preventDefault(); setState({...state, selectedColor: color.toLowerCase()})}}>
                        <div style={{backgroundColor: `var(--${color.toLowerCase().split(" ").join("-")})`}}></div>
                    </button>
                )
            }
        } catch (error) {}

        return arr
    }

    const addToWishlist = () => {
        (async () => {
            const { data } = await api.get("/wishlist")

            if(data.includes(state.id)) {
                await api.delete(`/wishlist/${state.id}`)
                heartRef.current.classList.remove("bigger")
                setWishlistLength(data.length - 1)

                return
            }

            await api.post(`/wishlist/${state.id}`)
            heartRef.current.classList.add("bigger")

            setWishlistLength(data.length + 1)
        })()
    }

    return (
        <Box $categorieResponsivity={categorieResponsivity} ref={boxRef}>
            <CardButtons style={{ visibility: !isLoading ? "visible" : "hidden" }}>
                {displayColors()}
                <button aria-label="Add To Wishlist" onClick={addToWishlist}>
                    <span className="bi bi-heart"><span ref={heartRef} className="bi bi-heart-fill"></span></span>
                </button>
            </CardButtons>
            <StyledCard $categorieResponsivity={categorieResponsivity} ref={cardRef} href={`/${state.gender}/${state.categorie}/${state.id}`}>
                {
                    !isLoading ?
                        <>
                            <div className="image">
                                <img src={state.imgs[state.selectedColor]} alt={state.name} />
                            </div>
                            <div className="content">
                                <CardNamePrice>
                                    <CardName>{state.name}</CardName>
                                    <CardPrice>${state.price}</CardPrice>
                                </CardNamePrice>
                                <CardRating rating={state.rating} />
                            </div>
                        </>
                    :
                        <CardUnloaded />
                }
            </StyledCard>
        </Box>
    )
}

export default Card