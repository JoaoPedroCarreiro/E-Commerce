import React, { useState } from "react"
import { useLocation } from "react-router-dom"

import { styled } from "styled-components"

const StyledSelect = styled.span`
    position: relative;
    z-index: 4;

    --rotation: 360deg;

    & > button {
        padding: 2px 4px;

        display: inline-block;

        background-color: rgb(230, 230, 230);
        
        border-radius: 6px;
        border: 1px solid rgb(180, 180, 180);

        text-align: start;

        &:hover {
            background-color: rgba(210, 210, 210);
        }

        p {
            display: inline-block;
            width: 107px;
        }

        i::before {
            width: .75rem;

            font-size: .75rem;
            transform: rotateZ(var(--rotation));

            transition: transform .3s ease;
        }
    }

    .select {
        position: absolute;
        left: 0;
        bottom: 0;

        display: inline-block;
        visibility: hidden;

        transform: translateY(calc(100% - 1px));

        background-color: rgb(230, 230, 230);
        border-bottom: 1px solid rgb(180, 180, 180);
        border-left: 1px solid rgb(180, 180, 180);
        border-right: 1px solid rgb(180, 180, 180);

        border-radius: 0 0 6px 6px;

        box-sizing: content-box;
    }
`

const Option = styled.button`
    display: block;
    padding: 2px 4px;
    color: rgba(0, 0, 0, 0.7);

    width: calc(107px + .75rem);

    text-align: start;

    box-sizing: content-box;

    &:hover {
        background-color: rgba(210, 210, 210);
        color: black;
    }
`

function Select({ children, setValue }) {
    const { pathname } = useLocation()

    const [curOption, setCurOption] = useState(pathname.startsWith("/search=") ? "Search Order" : "Lowest Price")
    const [isFocused, setIsFocused] = useState(false)

    const displayOptions = () => {
        const arr = []

        for(const child of children) {
            if(!child.props.children) continue

            arr.push(
                <Option
                    aria-label={child.props.children}
                    key={child.props.children}
                    id={child.props.id}
                    onClick={(e) => {
                        setCurOption(e.currentTarget.textContent)
                        setValue(e.currentTarget.id)
                    }}
                >
                    {child.props.children}
                </Option>
            )
        }

        return arr
    }

    return (
        <StyledSelect>
            <button
                onClick={() => setIsFocused(!isFocused)}
                onBlur={() => setTimeout(() => setIsFocused(false), 100)}
                style={{ borderRadius: `${isFocused ? "6px 6px 0 0" : "6px"}` }}
            >
                <p>{curOption}</p>
                <i style={{ "--rotation": `${isFocused ? "180deg" : "360deg"}` }} className="bi bi-arrow-down-short"></i>
            </button>
            <span className="select" style={{ visibility: `${isFocused ? "visible" : "hidden"}` }}>
                {displayOptions()}
            </span>
        </StyledSelect>
    )
}

export { Option }
export default Select