import React, { useContext, useState } from "react"

import { styled } from "styled-components"

import { StyledSubNavItem } from "./SubNavItem"

import list from "assets/list.svg"
import Bar from "components/bar/Bar"
import BarOption from "components/bar/BarOption"
import BarDiv from "components/bar/BarDiv"
import { PageBaseContext } from "components/PageBase"

const StyledSubNavItemAll = styled(StyledSubNavItem)`
    position: relative;
    
    button {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    img {
        width: 1rem;
        height: 1rem;
    }

    @media only screen and (width <= 375px) {
        img {
            width: .9rem;
            height: .9rem;
        }

        &, * {
            font-size: .7rem;
        }
    }
` 

function SubNavItemAll() {
    const [focused, setFocused] = useState(false)

    const { categories } = useContext(PageBaseContext)

    const displayOptions = () => {
        const arr = []

        for(const type in categories) {
            const children = []

            for(const categorie in categories[type]) {
                if(categorie === "index") continue

                const href = categories[type][categorie]

                children.push(<BarOption key={type + "-" + categorie} href={href}>{categorie}</BarOption>)
            }

            arr.push(<BarDiv key={type + "-div"} title={type}>{children}</BarDiv>)
        }

        return arr
    }

    return (
        <StyledSubNavItemAll>
            <button onClick={() => setFocused(!focused)} onBlur={() => setTimeout(() => setFocused(false), 100)}>
                <img src={list} alt="list" /><strong>All categories</strong>
            </button>
            <Bar
                tabIndex="0"
                viewCondition={focused}
                optionSize=".9rem" titleSize=".95rem"
            >
                {displayOptions()}
            </Bar>
        </StyledSubNavItemAll>
    )
}

export default SubNavItemAll