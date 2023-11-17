import React, { useEffect, useLayoutEffect, useState } from "react"

import { styled } from "styled-components"

import PageBase from "./PageBase"
import api from "api"
import CartItemsGrid from "./cart/CartItemsGrid"
import CartItem from "./cart/CartItem"
import CartBuy from "./cart/CartBuy"

const StyledCart = styled.div`
    display: flex;
    justify-content: center;

    animation: fadeInWhenStart .5s ease-out;

    gap: 30px;

    @media only screen and (width <= 970px) {
        flex-direction: column;
        align-items: center;
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

const CartContainer = styled.div`
    width: 500px;

    margin: 50px 0;
    padding: 15px;

    border-radius: 15px;

    background-color: rgb(240, 240, 240);

    box-sizing: content-box;

    & > div {
        padding: 25px 20px;
    }

    @media only screen and (width <= 970px) {
        margin: 0;
        margin-top: 50px;
    }

    @media only screen and (width <= 550px) {
        width: 345px;
    }

    @media only screen and (width <= 390px) {
        width: 220px;
    }
`

const H2 = styled.h2`
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1.4rem;

    padding: 10px 0;
`

function Cart() {
    const [cart, setCart] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useLayoutEffect(() => {
        document.title = "Cherry Shop Cart"
    }, [])

    useEffect(() => {
        (async () => {
            const { data } = await api.get("/cart")

            setCart(data)
            setIsLoading(false)
        })()
    }, [])

    const displayItems = () => {
        const arr = []
        
        for(let i = 0; i < cart.length; i++) {
            arr.push(<CartItem key={"cart-item-" + i} item={cart[i]} index={i} setCart={setCart}/>)
        }

        return (arr.length === 0) ? <H2>You don't have any items in your Cart</H2> : arr
    }

    const getTotal = () => {
        let total = 0

        for(let i = 0; i < cart.length; i++) {
            total += Number(cart[i].price.split(",").join("."))
        }

        return total.toFixed(2)
    }

    return (
        <PageBase>
            {
                !isLoading ? 
                    <StyledCart>
                        <CartContainer>
                            <Title>MY CART</Title>
                            <CartItemsGrid>
                                {displayItems()}
                            </CartItemsGrid>
                        </CartContainer>
                        <CartBuy total={getTotal()}></CartBuy>
                    </StyledCart>
                :
                    <></>
            }
        </PageBase>
    )
}

export default Cart
