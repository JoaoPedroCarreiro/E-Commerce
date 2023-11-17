import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"

import { styled } from "styled-components"
import CardGrid from "./card/CardGrid"
import PageBase from "./PageBase"
import Card from "./card/Card"
import DoubleSlider from "./filter-options/DoubleSlider"
import Select, { Option } from "./filter-options/Select"
import { quickSortTwoArr } from "quickSort"

import api from "api"

function toNumber(str) {
    return (typeof str === "string") ? Number(str.split(",").join(".")) : str
}

function upperFirstCase(str) {
    let newStr = ""

    for(const s of str.split(" ")) {
        newStr += s.charAt(0).toUpperCase() + s.slice(1) + " "
    }

    return newStr.slice(0, newStr.length - 1)
}

const StyledCategoriePage = styled.div`
    display: flex;
    position: relative;
`

const Box = styled.div`
    width: 230px;

    @media only screen and (width <= 910px) {
        display: none;
    }
`

const Options = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 230px;
    height: 100%;

    margin: 20px 0;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    flex-direction: column;

    box-shadow: rgba(50, 50, 93, 0.25) 1px 0px 3px -1px, rgba(0, 0, 0, 0.3) 1px 0px 1px -1px;

    z-index: 1;

    background-color: var(--bg-color);

    transition: height .3s ease;

    &[hide] {
        *:not(.toggleOptions) {
            display: none;
        }

        height: 50px;

        & + div {
            padding-top: calc(50px + 25px);
        }
    }

    & + div {
        padding: 25px 80px;
        width: 100%;
        height: 100%;
    }

    @media only screen and (width <= 910px) {
        width: 100%;
        height: 190px;

        margin: 0;
        margin-top: 110px;

        box-shadow: rgba(50, 50, 93, 0.25) 0px 1px 3px -1px, rgba(0, 0, 0, 0.3) 0px 1px 1px -1px;

        & + div {
            padding-top: calc(190px + 25px);
        }

        .toggleOptions {
            display: block;
        }
    }

    @media only screen and (width >= 910px) {
        &[hide] {
            width: 230px;
            height: 100%;
        }
    }
`

const ToggleOptions = styled.button`
    background-color: rgb(230, 230, 230);
    border: 1px solid rgb(180, 180, 180);
    
    border-radius: 6px;

    padding: 3px 5px;

    font-weight: 500;

    display: none;
`

function Title({ children })  {
    return (
        <p><strong style={{ display: "flex", gap: "5px" }}>{children}</strong></p>
    )
}

function CategoriePage() {
    const minMaxPriceRange = [0, 100]

    const { pathname } = useLocation()

    const [priceRange, setPriceRange] = useState(minMaxPriceRange)
    const [content, setContent] = useState([])
    const [orderType, setOrderType] = useState(pathname.startsWith("/search=") ? "search" : "minorprice")

    const [showOrHide, setShowOrHide] = useState("Hide")

    const optionsRef = useRef()

    useLayoutEffect(() => {
        document.body.toggleAttribute("cardcategorie")

        document.body.onresize = () => {
            if(window.innerWidth >= 910 && optionsRef.current.hasAttribute("hide")) {
                optionsRef.current.removeAttribute("hide")
                setShowOrHide("Hide")
            }
        }

        document.title = "Cherry Shop " + (pathname.startsWith("/search=") ?
            upperFirstCase(pathname.slice("/search=".length, pathname.length).split("%20").join(" "))
        :
            upperFirstCase(pathname.split("/").join(" ")))
    }, [pathname])

    const orderByTemplate = (src, arg, reversed) => {
        const cont = []
        const arr = []

        for(const item of src) {
            cont.push(item)
            arr.push(toNumber(item[arg]))
        }

        quickSortTwoArr(cont, arr)

        return (reversed) ? cont.reverse() : cont
    }

    const orderBy = {
        "search": (src) => src,
        "minorprice": (src) => orderByTemplate(src, "price", false),
        "majorprice": (src) => orderByTemplate(src, "price", true),
        "minorrating": (src) => orderByTemplate(src, "rating", false),
        "majorrating": (src) => orderByTemplate(src, "rating", true),
        "minorbuy": (src) => orderByTemplate(src, "total-buys", false),
        "majorbuy": (src) => orderByTemplate(src, "total-buys", true)
    }

    useEffect(() => {
        (async () => {
            const { data } = await api.get(pathname.startsWith("/search=") ? pathname : "/items" + pathname)

            setContent(data)
        })()
    }, [pathname])

    const displayContent = () => {
        const arr = []

        for(const item of orderBy[orderType](content)) {
            if(toNumber(item.price) > priceRange[0] && toNumber(item.price) < priceRange[1]) {
                arr.push(<Card key={"card" + item.id} src={item} />)
            }
        }

        return arr
    }

    const toggleOptions = () => {
        optionsRef.current.toggleAttribute("hide")

        if(showOrHide === "Hide") return setShowOrHide("Show")
        setShowOrHide("Hide")
    }

    return (
        <PageBase>
            <StyledCategoriePage>
                <Box />
                <Options ref={optionsRef}>
                    <Title>Order by:
                    <Select setValue={setOrderType}>
                        { pathname.startsWith("/search=") ? <Option id="search" key="search-option">Search Order</Option> : <></> }
                        <Option id="minorprice">Lowest Price</Option>
                        <Option id="majorprice">Highest Price</Option>
                        <Option id="minorrating">Lowest Rating</Option>
                        <Option id="majorrating">Highest Rating</Option>
                        <Option id="minorbuy">Least Bought</Option>
                        <Option id="majorbuy">Most Bought</Option>
                    </Select></Title>
                    <Title>Select by price</Title>
                    <DoubleSlider initMinMax={minMaxPriceRange} setMinMax={setPriceRange} />
                    <ToggleOptions className="toggleOptions" onClick={toggleOptions}>{showOrHide} Options</ToggleOptions>
                </Options>
                <CardGrid>
                    {displayContent()}
                </CardGrid>
            </StyledCategoriePage>
        </PageBase>
    )
}

export default CategoriePage