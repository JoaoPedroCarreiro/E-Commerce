import React, { useEffect, useState } from "react"

import { styled } from "styled-components"

const StyledCardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 260px);
    grid-gap: 50px;
    justify-content: space-evenly;

    @media only screen and (width <= 750px) {
        grid-template-columns: repeat(2, 200px);
    }

    @media only screen and (width <= 500px) {
        grid-template-columns: repeat(2, 150px);
    }

    @media only screen and (width <= 420px) {
        grid-gap: 25px;
    }

    @media only screen and (width <= 370px) {
        grid-template-columns: repeat(2, 125px);
        grid-gap: 28px    
    }

    @media only screen and (width <= 315px) {
        grid-template-columns: repeat(auto-fill, 125px);
    }
`

function CardGrid({ children }) {
    const [cardWishlist, setCardWishlist] = useState(false)

    useEffect(() => {
        if(document.body.hasAttribute("cardwishlist")) {
            setCardWishlist(true)
        }
    }, [])

    return (
        <StyledCardGrid $cardWishlist={cardWishlist}>
            {children}
        </StyledCardGrid>
    )
}

export default CardGrid