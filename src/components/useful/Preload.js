import { memo } from "react"

import { styled } from "styled-components"

const Preload = styled.div`
    background: ${({ $imgs }) => {
        let bg = ""

        for(const img of $imgs) {
            bg = bg.concat(`url(${img}), `)
        }

        return bg.slice(0, bg.length - 2)
    }};
`

export default memo(Preload)