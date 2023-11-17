import api from "api"
import { PageBaseContext } from "components/PageBase"
import React, { useContext } from "react"

import { styled } from "styled-components"

function upperFirstCase(str) {
    let newStr = ""

    for(const s of str.split(" ")) {
        newStr += s.charAt(0).toUpperCase() + s.slice(1) + " "
    }

    return newStr.slice(0, newStr.length - 1)
}

const StyledCartItem = styled.a`
    display: flex;
    gap: 10px;

    border-radius: 5px;

    background-color: rgba(0, 0, 0, .15);

    padding: 10px;

    transition: background-color .3s ease;

    &:hover {
        .title-name {
            text-decoration: underline;
        }
    }

    img {
        border-radius: 5px;

        width: 150px;
        height: 150px;

        object-fit: cover;
    }

    .item-info {
        width: 375px;
    
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .price {
        font-size: 1.1rem;
    }

    .price-buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;

        z-index: 1;

        .bi-trash {
            font-size: .9rem;

            transition: color .2s ease;

            &:hover {
                color: var(--rb-item-amount-color);
            }
        }
    }

    @media only screen and (width <= 550px) {
        .item-info {
            width: 220px;
        }
    }

    @media only screen and (width <= 390px) {
        font-size: .8rem;

        .item-info {
            width: 95px;
        }

        img {
            width: 75px;
            height: 75px;
        }
    }
`

function CartItem({ item, index, setCart }) {
    const { setCartLength } = useContext(PageBaseContext)

    const removeFromCart = () => {
        (async() => {
            const { data } = await api.delete("/cart/" + index)
            setCart(data)
            setCartLength((oldCartLength) => oldCartLength - 1)
        })()
    }

    return (
        <StyledCartItem href={item.path}>
            <img src={item.img} alt="" />
            <div className="item-info">
                <div>
                    <p className="title-name"><strong>{item.name}</strong></p>
                    {
                        item.color ?
                            <p><strong>Color: </strong>{upperFirstCase(item.color)}</p>
                        :
                            <></>
                    }
                    {
                        item.size ?
                            <p><strong>Size: </strong>{item.size.toUpperCase()}</p>
                        :
                            <></>
                    }
                </div>
                <div className="price-buttons">
                    <p className="price"><strong>${item.price}</strong></p>
                    <div>
                        <button aria-label="Remove from cart" className="bi bi-trash" onClick={(e) => {e.preventDefault(); removeFromCart()}}></button>
                    </div>
                </div>
            </div>
        </StyledCartItem>
    )
}

export default CartItem