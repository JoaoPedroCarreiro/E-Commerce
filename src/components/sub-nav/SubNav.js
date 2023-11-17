import { styled } from "styled-components"

const SubNav = styled.ul`
    position: sticky;
    top: 70px;

    width: 100%;
    height: 40px;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 50px;

    background-color: var(--bg-color);
    color: var(--txt-color);

    box-shadow: rgba(50, 50, 93, 0.25) 0px 1px 3px -1px, rgba(0, 0, 0, 0.3) 0px 1px 1px -1px;

    z-index: 2;

    @media only screen and (width <= 375px) {
        gap: 25px;
    }
`

export default SubNav