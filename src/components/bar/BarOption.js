import React from "react"

import { styled } from "styled-components"

const StyledBarOption = styled.a`
    i {
        height: 100%;
        padding-right: 5px;
    }

    &:hover {
        backdrop-filter: brightness(90%);
    }
`

function BarOption({ children, icon, href }) {
    return <StyledBarOption href={href}>{icon ? <i className={`bi bi-${icon}`}></i> : <></>}{children}</StyledBarOption>
}

export default BarOption