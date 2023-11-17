import React, { memo } from "react"

import { styled } from "styled-components"

const StyledLogo = styled.span`
    font-size: 1.7rem;

    &, * {
        font-family: "Unica one", sans-serif;
    }

    .red {
        color: var(--logo-color);
    }
`

function Logo({ as = "block", href = "/" }) {
    const TypeComponent = {
        "link": ({ children }) => <a href={href}>{children}</a>,
        "block": ({ children }) => <>{children}</>
    }[as]

    return (
        <TypeComponent>
            <StyledLogo className="logo"><span className="red">CHERRY</span> SHOP</StyledLogo>
        </TypeComponent>
    )
}

export default memo(Logo)