import React, { useRef, useState } from "react"

import { styled } from "styled-components"

const StyledDoubleSlider = styled.div`
    .price {
        width: 150px;
        position: relative;
    }

    .slider {
        width: 100%;
        height: 3px;

        border-radius: 5px;

        background: var(--logo-color);

        position: absolute;
        top: 0;
        left: 0;

        pointer-events: none;
    }

    input[type="range"] {
        appearance: none;

        height: 3px;

        border-radius: 5px;

        background: transparent;

        position: absolute;
        top: 0;
        left: 0;

        pointer-events: none;
    }

    input[type="range"]::-webkit-slider-thumb {
        appearance: none;

        width: 12px;
        height: 12px;

        left: 10px;
        
        border-radius: 50%;
        
        background: var(--logo-color);

        cursor: pointer;

        pointer-events: auto;
    }

    input[type="range"]::-moz-ms-thumb {
        pointer-events: auto;
    }

    input[type="range"]::-ms-thumb {
        pointer-events: auto;
    }

    #pricemin {
        width: 100%;
    }

    #pricemax {
        width: 100%;
    }

    .display-prices {
        display: flex;
        justify-content: space-between;

        padding-top: 5px;

        span {
            display: flex;
            align-items: center;
        }
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }
`

function DoubleSlider({ initMinMax, setMinMax }) {
    const [initMin, initMax] = initMinMax

    const [min, setMin] = useState(initMin)
    const [max, setMax] = useState(initMax)

    const sliderRef = useRef(0)

    const _onChange = (e, targetValue, minOrMax) => {
        const minMax = {
            "min": [0, setMin],
            "max": [1, setMax]
        }

        e.currentTarget.value = targetValue

        const arr = [min, max]
        arr[minMax[minOrMax][0]] = Number(e.currentTarget.value)

        sliderRef.current.style.background = `linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.3) calc(${100 * (arr[0]) / (initMax)}% + 0.5%),
            var(--logo-color) calc(${100 * (arr[0]) / (initMax)}% + 0.5%),
            var(--logo-color) calc(${100 * (arr[1]) / (initMax)}% - 0.5%),
            rgba(0, 0, 0, 0.3) calc(${100 * (arr[1]) / (initMax)}% - 0.5%)
        )`

        minMax[minOrMax][1](Number(e.currentTarget.value))
        setMinMax(arr)
    }
    
    return (
        <StyledDoubleSlider>
            <div className="price">
                <div className="slider" ref={sliderRef}></div>
                <input
                    aria-label="Min Value Slider"
                    type="range"
                    name="pricemin"
                    id="pricemin"
                    min={initMin} max={initMax}
                    value={min}
                    onChange={(e) => _onChange(e, Number(e.currentTarget.value) >= max - 10 ? max - 10 : Number(e.currentTarget.value), "min")}
                />
                <input
                    aria-label="Max Value Slider"
                    type="range"
                    name="pricemax"
                    id="pricemax"
                    min={initMin} max={initMax}
                    value={max}
                    onChange={(e) => _onChange(e, Number(e.currentTarget.value) <= min + 10 ? min + 10 : Number(e.currentTarget.value), "max")}  
                />
            </div>
            <div className="display-prices">
                <span>$<input
                    aria-label="Min Value"
                    type="number"
                    min={initMin}
                    max={max - 10}
                    value={min}
                    style={{width: `calc(${String(min).length} * 10px)`}}
                    onChange={(e) => _onChange(e, Number(e.currentTarget.value), "min")}
                    onBlur={(e) => _onChange(e, Number(e.currentTarget.value) >= max - 10 ? max - 10 : Number(e.currentTarget.value) >= initMin ? Number(e.currentTarget.value) : initMin, "min")}
                /></span>
                <span>$<input
                    aria-label="Max Value"
                    type="number"
                    min={min + 10}
                    max={initMax}
                    value={max}
                    style={{width: `calc(${String(max).length} * 7.5px)`}}
                    onChange={(e) => _onChange(e, Number(e.currentTarget.value), "max")}
                    onBlur={(e) => _onChange(e, e.currentTarget.value = Number(e.currentTarget.value) <= min + 10 ? min + 10 : Number(e.currentTarget.value) <= initMax ? Number(e.currentTarget.value) : initMax, "max")}
                /></span>
            </div>
        </StyledDoubleSlider>
    )
}

export default DoubleSlider