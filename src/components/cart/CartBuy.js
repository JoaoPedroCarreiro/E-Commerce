import React from "react"

import { styled } from "styled-components"

function numberToString(n) {
    let str = String(n).split(".")

    if(str.length === 1) return str[0] + ",00"

    for(let i = 0; i < 2 - str[1].length; i++) {
        str[1] += "0"
    }
    
    return str[0] + "," + str[1]
}

const StyledCartBuy = styled.div`
    width: 375px;
    height: max-content;

    margin-top: 50px;
    padding: 15px;

    display: flex;
    flex-direction: column;
    gap: 20px;

    border-radius: 15px;

    background-color: rgb(240, 240, 240);

    box-sizing: border-box;

    .total {
        font-size: 1.3rem;
    }

    button {
        width: 100%;

        background-color: var(--logo-color);
        color: white;

        border-radius: 9px;

        font-size: 1.1rem;

        padding: 4px 2px;

        transition: opacity .3s ease;

        &:hover {
            opacity: .85;
        }
    }

    & > div {
        display: flex;
        justify-content: space-between;
        align-items: end;
    }

    @media only screen and (width <= 970px) {
        margin-top: 0;
        margin-bottom: 50px;

        width: 530px;
    }

    @media only screen and (width <= 550px) {
        width: 375px;
    }

    @media only screen and (width <= 390px) {
        width: 250px;
    }
`

function CartBuy({ total }) {
    return (
        <StyledCartBuy>
            <div>
                <span><strong>Total</strong></span><span className="total"><strong>${numberToString(total)}</strong></span>
            </div>
            <button>Checkout now</button>
        </StyledCartBuy>
    )
}

export default CartBuy