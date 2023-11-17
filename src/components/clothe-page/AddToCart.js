import api from "api"
import { PageBaseContext } from "components/PageBase"
import React, { useContext } from "react"
import { useLocation } from "react-router-dom"

import { styled } from "styled-components"

const StyledAddToCart = styled.button`
    background-color: var(--logo-color);
    color: white;

    border-radius: 12px;

    font-size: 1.3rem;

    padding: 4px 0;

    transition: opacity .3s ease;

    &:hover {
        opacity: .85;
    }
`

function AddToCart({ children, content, size, color, hasSize = true }) {
    const { setCartLength } = useContext(PageBaseContext)

    const { pathname } = useLocation()

    const addToCart = () => {
        if(!size && hasSize) { alert("Please select a size."); return }

        (async () => {
            await api.post("/cart/item", {
                img: color ? content.images[color][0] : content.images[0],
                name: content.name,
                color: color,
                size: size,
                path: pathname,
                price: content.price,
                id: content.id
            })
        })()

        setCartLength((oldCartLenth) => oldCartLenth + 1)
    }

    return <StyledAddToCart onClick={addToCart}>{children}</StyledAddToCart>
}

export default AddToCart