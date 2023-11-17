import { styled } from "styled-components"

const CardNamePrice = styled.div`
    display: flex;
    justify-content: space-between;

    .price {
        color: var(--logo-color);
    }
`

const CardName = styled.p`
    white-space: nowrap;
    overflow: hidden;

    width: 75%;
    text-overflow: ellipsis;
    
    font-weight: 500;
`

const CardPrice = styled.p`
    color: var(--logo-color);
`

export { CardName }
export { CardPrice }
export default CardNamePrice