import React, { useEffect, useLayoutEffect, useState } from "react"

import { styled } from "styled-components"

import PageBase from "./PageBase"
import api from "api"
import Card from "./card/Card"
import CardGrid from "./card/CardGrid"

const StyledWishlist = styled.div`
    margin: 50px;
    padding: 15px;

    border-radius: 15px;

    background-color: rgb(240, 240, 240);

    box-sizing: border-box;

    animation: fadeInWhenStart .5s ease-out;

    & > div {
        padding: 25px 20px;
    }

    @media only screen and (width <= 620px) {
        margin: 25px;
    }

    @media only screen and (width <= 670px) {
        margin: 25px 0;
        border-radius: 0;
    }
`

const Title = styled.h1`
    font-size: 2.3rem;
    font-family: "Unica one", sans-serif;
    font-weight: 400;

    position: relative;

    &::after {
        content: "";

        position: absolute;
        bottom: -5px;
        left: 2px;

        width: 80px;
        height: 3px;

        background-color: var(--logo-color);
    }
`

const H2 = styled.h2`
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1.4rem;

    padding: 30px 0;
`   

function Wishlist() {
    const [cards, setCards] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useLayoutEffect(() => {
        document.title = "Cherry Shop Wishlist"
        document.body.toggleAttribute("cardcategorie")
    }, [])

    useEffect(() => {
        (async () => {
            const { data } = await api.get("/wishlist")
    
            const arr = []
    
            for(const id of data) {
                arr.push(<Card key={id} src={"/id/" + id} />)
            }
    
            setCards(arr)
            setIsLoading(false)
        })()
    }, [])

    return (
        <PageBase>
            {
                !isLoading ?
                    <StyledWishlist>
                        <Title>MY WISHLIST</Title>
                        {
                            (cards.length !== 0) ?
                                <CardGrid useResponsivity={false}>
                                    {cards}
                                </CardGrid>
                            :
                                <H2>You don't have any items in your wishlist</H2>
                        }
                    </StyledWishlist>
                :
                    <></>
            }
        </PageBase>
    )
}

export default Wishlist