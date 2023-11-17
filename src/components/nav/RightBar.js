import { styled } from "styled-components"

const RightBar = styled.div`
    display: flex;
    gap: 35px;

    @media only screen and (max-width: 375px) {
        gap: 20px;
    }
`

export default RightBar