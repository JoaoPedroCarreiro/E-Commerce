import { styled } from "styled-components"

const Footer = styled.footer`
    width: 100%;
    height: var(--footer-height);

    position: absolute;
    bottom: 0;
    left: 0;

    box-shadow: rgba(50, 50, 93, 0.25) 0px -1px 3px -1px, rgba(0, 0, 0, 0.3) 0px -1px 1px -1px;
    background-color: rgb(240, 240, 240);

    padding: 20px 0;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 200px;

    z-index: 2;

    @media (width <= 1060px) {
        gap: 100px;
    }

    @media (width <= 700px) {
        gap: 50px;
    }

    @media (width <= 380px) {
        &, .title {
            gap: 25px;
            font-size: 0.8rem;
        }
    }

    @media (width <= 335px) {
        .logo {
            font-size: 1.3rem;
        }
    }

    @media (width <= 300px) {
        &, .title {
            gap: 15px;
            font-size: 0.6rem;
        }
    }
`

export default Footer