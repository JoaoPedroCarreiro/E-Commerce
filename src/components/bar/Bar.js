import { styled } from "styled-components"

const StyledBar = styled.div`
    position: absolute;
    bottom: 0;
    transform: translateY(calc(100% + 8px));

    display: flex;
    gap: 10px;

    visibility: hidden;

    min-width: 100%;

    border-radius: 5px;

    background-color: rgb(240, 240, 240);

    overflow: hidden;

    z-index: 3;

    &, * {
        font-size: ${({$optionSize}) => $optionSize ? $optionSize : "1rem"};
    }

    .title {
        font-size: ${({$titleSize}) => $titleSize ? $titleSize : "1rem"};
        font-weight: 500;
    }
`

function Bar({ children, titleSize, optionSize, viewCondition, tabIndex }) {
    return (
        <StyledBar
            tabIndex={tabIndex}
            $titleSize={titleSize}
            $optionSize={optionSize}
            style={{ visibility: viewCondition ? "visible" : "hidden" }}
        >{ children }</StyledBar>
    )
}

export default Bar