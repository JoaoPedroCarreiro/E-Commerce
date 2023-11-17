import React from "react"

import { styled } from "styled-components"

const StyledBarDiv = styled.div`
    width: 100%;

    & > * {
        padding: 2px 6px;
    }
`

function BarDiv({ children, title  }) {
    return (
        <StyledBarDiv>
            {(title) ? <span className="title">{title}</span> : <></>}
            {children}
        </StyledBarDiv>
    )
}

export default BarDiv