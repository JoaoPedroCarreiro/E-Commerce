import React, { useRef, useState } from "react"
import { useLocation } from "react-router-dom"

import { styled } from "styled-components"

import Bar from "components/bar/Bar"
import BarOption from "components/bar/BarOption"
import BarDiv from "components/bar/BarDiv"

const StyledRightBarItem = styled.div`
    font-size: 1.5rem;

    display: none;

    text-align: start;

    .icon {
        width: 1.5rem;
        height: 2rem;
    }

    .search-div {
        width: 208px;
        height: 24px;

        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);

        z-index: 5;

        border-radius: 5px;

        background-color: white;
    }

    .search {
        width: calc(100% - 1rem - 3px);

        margin: 2px 3px;
    }

    .search-icon {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);

        padding: 0 3px;
    }

    .opacity-wall {
        display: block;

        width: 100%;
        height: 100vh;

        position: absolute;
        top: 0;
        left: 0;

        z-index: 4;

        background-color: rgba(0, 0, 0, 0.5);

        cursor: default;
    }

    @media (max-width: 550px) {
        & {
            font-size: 1.1rem;
        }

        .icon {
            width: 1.1rem;
            height: 1.6rem;
        }
    }

    @media (max-width: 390px) {
        display: block;
    }
`

function RightBarItemSearch() {
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
        <StyledRightBarItem>
            <div className="icon" onClick={() => setFocused(true)}>
                <i className={`bi bi-search`}></i>
            </div>
            <div className="search-div" style={{ visibility: focused ? "visible" : "hidden" }}>
                <input
                    ref={searchRef}
                    autoComplete="off"
                    type="text" id="searchItem"
                    defaultValue={pathname.startsWith("/search=") ? pathname.slice("/search=".length, pathname.length).split("%20").join(" ") : undefined}
                    placeholder="Search for clothes"
                    onClick={() => setFocused(true)}
                    onKeyDown={(e) => { if(e.key === "Enter") window.location.replace(`/search=${searchRef.current.value}`) }}
                    onBlur={() => setTimeout(() => setFocused(false), 100)}
                    className="search"
                />
                <button
                    style={{ visibility: focused ? "visible" : "hidden" }}
                    onClick={() => window.location.replace(`/search=${searchRef.current.value}`)}
                ><i className="bi bi-search search-icon"></i></button>
                <Bar viewCondition={focused}>
                    <BarDiv>
                        {getRecomendations(amountOfOptions)}
                    </BarDiv>
                </Bar>
            </div>
            <div className="opacity-wall" style={{ visibility: focused ? "visible" : "hidden" }} onClick={() => setFocused(false)}></div>
        </StyledRightBarItem>
    )
}

export default RightBarItemSearch