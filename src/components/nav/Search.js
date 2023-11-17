import React, { useRef, useState } from "react"
import { useLocation } from "react-router-dom"

import { styled } from "styled-components"

import Bar from "components/bar/Bar"
import BarOption from "components/bar/BarOption"
import BarDiv from "components/bar/BarDiv"

const StyledSearch = styled.span`
    position: relative;
    
    width: 400px;
    height: 22px;

    border-bottom: 1px solid rgb(129, 129, 129);

    input {
        width: calc(100% - 1rem - 3px);
        height: 100%;

        padding: 0 3px;
    }

    .search-icon {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);

        padding: 0 3px;
    }

    @media (width <= 710px) {
        width: 250px;
    }

    @media (width <= 490px) {
        width: 150px;
    }

    @media (max-width: 390px) {
        display: none;
    }
`

function Search() {
    const [focused, setFocused] = useState(false)

    const { pathname } = useLocation()

    const searchRef = useRef(0)

    const amountOfOptions = 5

    const recomendations = {
        "Jeans": "/search=Jeans",
        "Black Clothes": "/search=Black Clothes",
        "Color Selectable": "/search=Color Selectable",
        "Skirts": "/search=Skirts",
        "Eyeglasses": "/search=Eyeglasses"
    }

    const getRecomendations = (amount) => {
        const arr = []

        for(let i = 0; i < amount; i++) {
            const recomendation = Object.keys(recomendations)[i]
            const href = recomendations[recomendation]

            arr.push(<BarOption icon="search" href={href} key={recomendation}>{recomendation}</BarOption>)
        }

        return arr
    }

    return (
        <StyledSearch>
            <input
                ref={searchRef}
                autoComplete="off"
                type="text" id="search"
                defaultValue={pathname.startsWith("/search=") ? pathname.slice("/search=".length, pathname.length).split("%20").join(" ") : undefined}
                placeholder="Search for clothes"
                onClick={() => setFocused(!focused)}
                onKeyDown={(e) => { if(e.key === "Enter") window.location.replace(`/search=${searchRef.current.value}`) }}
                onBlur={() => setTimeout(() => setFocused(false), 100)}
            />
            <button aria-label="Search" onClick={() => window.location.replace(`/search=${searchRef.current.value}`)}><i className="bi bi-search search-icon"></i></button>
            <Bar viewCondition={focused}>
                <BarDiv>
                    {getRecomendations(amountOfOptions)}
                </BarDiv>
            </Bar>
        </StyledSearch>
    )
}

export default Search