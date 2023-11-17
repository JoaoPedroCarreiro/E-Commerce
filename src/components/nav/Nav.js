import { styled } from "styled-components"

const Nav = styled.nav`
    position: sticky;
    top: 0;
    
    width: 100%;
    height: 70px;

    display: flex;
    justify-content: space-around;
    align-items: center;

    background-color: var(--bg-color);
    color: var(--txt-color);

    box-shadow: rgba(50, 50, 93, 0.25) 0px 1px 3px -1px, rgba(0, 0, 0, 0.3) 0px 1px 1px -1px;

    z-index: 3;

    @media (width <= 550px) {
        .logo {
            font-size: 1.2rem;
        }
    }
`

export default Nav