import React from "react"

import { styled } from "styled-components"

const StyledRightBarItem = styled.div`
    position: relative;
    font-size: 1.5rem;

    .icon {
        width: 1.5rem;
        height: 2rem;
    }

    .item-lenght {
        position: absolute;
        bottom: -2px;
        right: -7px;

        width: 1.3rem;
        height: 1.3rem;

        border-radius: 50%;

        background-color: var(--rb-item-amount-color);

        font-size: .75rem;
        text-align: center;

        display: table;

        & > span {
            display: table-cell;
            vertical-align: middle;
        }
    }

    @media only screen and (max-width: 550px) {
        & {
            font-size: 1.1rem;
        }

        .icon {
            width: 1.1rem;
            height: 1.6rem;
        }

        .item-lenght {
            width: 1rem;
            height: 1rem;

            font-size: .7rem;
        }
    }
`

function RightBarItem({ href, icon, length }) {
    const icons = {
        "wishlist": "heart",
        "cart": "cart3"
    }

    return (
        <StyledRightBarItem>
            <a href={href}>
                <div className="icon">
                    <i className={`bi bi-${icons[icon]}`}></i>
                </div>
                <span className="item-lenght"><span>{length}</span></span>
            </a>
        </StyledRightBarItem>
    )
}

export default RightBarItem