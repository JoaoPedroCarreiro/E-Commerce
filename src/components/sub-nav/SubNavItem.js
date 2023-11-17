import React from "react"

import { styled } from "styled-components"

const StyledSubNavItem = styled.li`
    &, * {
        font-size: .8rem;
    }

    @media only screen and (width <= 375px) {
        &, * {
            font-size: .7rem;
        }
    }
`

function SubNavItem({children, href}) {
    return (
        <StyledSubNavItem>
            <a href={href}>{children}</a>
        </StyledSubNavItem>
    )
}

export { StyledSubNavItem }
export default SubNavItem