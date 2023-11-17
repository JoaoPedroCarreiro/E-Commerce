import React, { useRef, useContext, useEffect } from "react"

import { styled } from "styled-components"

import { PageBaseContext } from "components/PageBase"
import api from "api"

const StyledAddToWishlist = styled.button`
    display: inline-block;

    position: absolute;
    top: 0;
    right: 0;

    .bi-heart {
        position: relative;
        color: var(--logo-color);

        font-size: 1.4rem;
    }

    .bi-heart-fill {
        position: absolute;
        top: 50%;
        left: 50%;

        transform: translateY(-50%) translateX(-50%);

        font-size: 0;

        transition: font-size .15s ease-in;

        color: var(--logo-color);
    }

    .bigger {
        font-size: 1.4rem;
    }
`

function AddToWishlist({ id }) {
    const { setWishlistLength } = useContext(PageBaseContext)

    const heartRef = useRef(0)

    useEffect(() => {
        (async () => {
            const { data } = await api.get("/wishlist")

            if(data.includes(Number(id))) heartRef.current.classList.add("bigger")
        })()
    }, [id])

    const addToWishlist = (id) => {
        (async () => {
            const { data } = await api.get("/wishlist")

            if(data.includes(Number(id))) {
                await api.delete(`/wishlist/${id}`)
                heartRef.current.classList.remove("bigger")
                setWishlistLength(data.length - 1)

                return
            }

            await api.post(`/wishlist/${id}`)
            heartRef.current.classList.add("bigger")

            setWishlistLength(data.length + 1)
        })()
    }

    return (
        <StyledAddToWishlist onClick={() => addToWishlist(id)}>
            <span className="bi bi-heart"><span ref={heartRef} className="bi bi-heart-fill"></span></span>
        </StyledAddToWishlist>
    )
}

export default AddToWishlist