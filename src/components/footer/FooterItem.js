import React from "react"

import { styled } from "styled-components"

const StyledFooterItem = styled.a`
    padding-top: 2px;

    display: flex;
    align-items: center;
    gap: 5px;

    i {
        width: 1rem;
        height: 100%;
    }

    &:hover {
        text-decoration: underline;
    }
`

function FooterItem({ children, icon, href, target }) {
    return (
        <StyledFooterItem href={href} target={target}>
            {(icon) ? <i className={`bi bi-${icon}`}></i> : <></>}
            {children}
        </StyledFooterItem>
    )
}

export default FooterItem