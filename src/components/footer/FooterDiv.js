import React from "react"

import { styled } from "styled-components"

const StyledFooterDiv = styled.div`
    display: flex;
    flex-direction: column;

    padding: 5px 10px;

    height: 100%;

    ${({ $mid }) => $mid ? "height: auto; transform: translateY(-50%);" : ""}

    .title {
        font-weight: 500;

        padding-bottom: 2px;

        position: relative;
    }

    .title::after {
        content: "";

        position: absolute;
        left: 0;
        bottom: 0;

        width: 40px;
        height: 3px;

        background-color: var(--logo-color);
    }

    ${({ $mid }) => $mid ?
        `@media (width <= 560px) {
            position: absolute;
            bottom: 20%;
            left: 50%;
            transform: translateX(-50%);
        }`
    :
        ""
    }
`

function FooterDiv({ children, mid, title, isTitle = false }) {
    return (
        <StyledFooterDiv $mid={mid} $isTitle={isTitle}>
            {(title) ? <span className="title">{title}</span> : <></>}
            {children}
        </StyledFooterDiv>
    )
}

export default FooterDiv