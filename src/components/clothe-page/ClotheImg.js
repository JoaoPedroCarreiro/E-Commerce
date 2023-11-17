import { ClothePageContext } from "components/ClothePage"
import React, { useContext } from "react"

import { styled } from "styled-components"

const StyledClotheImg = styled.span`
    position: relative;

    width: 450px;
    height: 450px;

    background-color: rgba(220, 220, 220);

    border-radius: ${({ $onlyOne }) => $onlyOne ? "15px" : "0 15px 15px 0"};

    animation: fadeInWhenStart .5s ease-out;

    .imgs {
        width: 100px;

        position: absolute;
        top: 0;
        left: 0;
        transform: translateX(-100%);

        display: ${({ $onlyOne }) => $onlyOne ? "none" : "flex"};
        flex-direction: column;
        gap: 2px;

        border-radius: 15px 0 0 15px;
        border: 2px solid rgba(220, 220, 220);
        border-right: 0;

        overflow: hidden;

        height: 100%;

        background-color: rgba(220, 220, 220);

        button {
            width: 100px;
            height: 100px;

            overflow: hidden;
        }

        img {
            width: 100px;
            height: 100px;

            border-radius: 0;
            border: 0;

            transition: transform .6s ease;
        }

        button:hover {
            img {
                transform: scale(1.2);
            }
        }
    }

    img {
        border-radius: ${({ $onlyOne }) => $onlyOne ? "15px" : "0 15px 15px 0"};
        border: 2px solid rgba(220, 220, 220);

        width: 450px;
        height: 450px;

        object-fit: cover;
    }

    .biggerImg {
        border: 2px solid rgba(220, 220, 220);

        width: 450px;
        height: 450px;
    }

    @media only screen and (width <= 1200px) {
        ${({ $onlyOne }) => $onlyOne ? "" : "transform: translateX(50px);"};
    }

    @media only screen and (width <= 590px) {
        width: 350px;
        height: 350px;

        .biggerImg, img {
            width: 350px;
            height: 350px;
        }

        .imgs {
            width: 75px;

            img, button {
                width: 75px;
                height: 75px;
            }
        }

        ${({ $onlyOne }) => $onlyOne ? "" : "transform: translateX(32.5px);"};
    }

    @media only screen and (width <= 490px) {
        width: 250px;
        height: 250px;

        .biggerImg, img {
            width: 250px;
            height: 250px;
        }

        .imgs {
            width: 50px;

            img, button {
                width: 50px;
                height: 50px;
            }
        }

        ${({ $onlyOne }) => $onlyOne ? "" : "transform: translateX(25px);"};
    }
`

function ClotheImg() {
    const { content, color, biggerImg, setBiggerImg } = useContext(ClothePageContext)
    
    const displayImgs = (color) => {
        if(!content) return
        if(content.images.length === 1) return

        const imgs = content.colors ? content.images[color] : content.images

        const arr = []

        for(const img of imgs) {
            arr.push(<button key={"btn-" + img} onClick={() => setBiggerImg(img)}><img src={img} alt="" /></button>)
        }

        return arr
    }

    return content ?
        <StyledClotheImg $onlyOne={content.images.length === 1}>
            <span className="imgs">
                {displayImgs(content ? color : "")}
            </span>
            <img src={biggerImg} alt="" />
        </StyledClotheImg>
    :
        <></>
}

export default ClotheImg