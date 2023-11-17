import React, { useEffect, useState } from "react"
import { styled } from "styled-components"

import Carousel from "./carousel/Carousel"

import imageCarousel1 from "assets/image-carousel-1.webp"
import imageCarousel2 from "assets/image-carousel-2.webp"

import {
    CarouselItem1,
    CarouselItem2
} from "./carousel/CarouselItems"

import Preload from "./useful/Preload"
import PageBase from "./PageBase"
import Card from "./card/Card"
import api from "api"
import CardUnloaded from "./card/CardUnloaded"

const AppContent = styled.div`
    width: 100%;
    min-height: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    padding-bottom: 55px;
`

const AppCardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-gap: 50px;
    justify-content: start;

    @media (width <= 1290px) {
        grid-template-columns: repeat(2, auto);
    }

    @media (width <= 640px) {
        grid-gap: 35px;
    }

    @media (width <= 640px) {
        grid-gap: 35px;
    }

    @media (width <= 395px) {
        grid-template-columns: repeat(1, auto);
    }
`

const Title = styled.a`
    font-weight: 500;
    font-size: 2rem;
    padding: 20px 0;

    background-image: linear-gradient(90deg, ${({ $colorInit }) => $colorInit}, ${({ $colorFinal }) => $colorFinal});
    background-size: 0% 3px;
    background-repeat: no-repeat;
    background-position: 50% calc(50% + 1.2rem);

    transition: background-size .35s ease;

    &:hover {
        background-size: 100% 3px;
    }

    @media only screen and (width <= 375px) {
        font-size: 1.7rem;
    }
`

function App() {
    const [feminine, setFeminine] = useState(<><CardUnloaded /><CardUnloaded /><CardUnloaded /><CardUnloaded /></>)
    const [masculine, setMasculine] = useState(<><CardUnloaded /><CardUnloaded /><CardUnloaded /><CardUnloaded /></>)

    useEffect(() => {
        (async () => {
            const feminine = (await api.get("/feminine")).data
            const masculine = (await api.get("/masculine")).data

            const femArr = []

            for(let i = 0; i < 4; i++) {
                femArr.push(
                    <Card
                        key={"app-card-feminine-" + i}
                        src={{ ...Object.values(feminine)[i][0], gender: "feminine", categorie: Object.keys(feminine)[i] }}
                    />
                )
            }

            setFeminine(femArr)

            const mascArr = []

            for(let i = 0; i < 4; i++) {
                mascArr.push(
                    <Card
                        key={"app-card-masculine-" + i}
                        src={{ ...Object.values(masculine)[i][0], gender: "masculine", categorie: Object.keys(masculine)[i]}}
                    />
                )
            }

            setMasculine(mascArr)
        })()
    }, [])

    return (
        <>
            <Preload $imgs={[imageCarousel1, imageCarousel2]}/>
            <PageBase>
                <AppContent>
                    <Carousel>
                        <CarouselItem1 bg={imageCarousel1} />
                        <CarouselItem2 bg={imageCarousel2} />
                    </Carousel>
                    <Title
                        href="/feminine"
                        style={{ textShadow: "2px 1px 1px #591e98" }}
                        $colorInit="rgb(159, 96, 210)"
                        $colorFinal="#431672"
                    >New Feminine Clothes</Title>
                    <AppCardGrid>
                        {feminine}
                    </AppCardGrid>
                    <Title
                        href="/masculine"
                        style={{ textShadow: "2px 1px 1px #57c785" }}
                        $colorInit="rgb(123, 212, 156)"
                        $colorFinal="#16722f"
                    >New Masculine Clothes</Title>
                    <AppCardGrid>
                        {masculine}
                    </AppCardGrid>
                </AppContent>
            </PageBase>    
        </>
    )
}

export default App