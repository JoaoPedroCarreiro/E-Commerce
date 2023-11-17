import { styled } from "styled-components"

const CardButtons = styled.div`
    position: absolute;

    top: 10px;
    left: -20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;

    button > div {
        width: .8rem;
        height: .8rem;

        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, .2);
    }

    span {
        font-size: .8rem;
        color: var(--logo-color);
    }

    .bi-heart {
        position: relative;
    }

    .bi-heart-fill {
        position: absolute;
        top: 50%;
        left: 50%;

        transform: translateY(-50%) translateX(-50%);

        font-size: 0;

        transition: font-size .15s ease-in;
    }

    .bigger {
        font-size: .8rem;
    }
`

export default CardButtons