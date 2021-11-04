import { useRef, useState } from "react";
import sprite2 from "../../../img/sprite2.png";
import styled from "styled-components";

interface SliderProps {
    total: number;
    currentIndex: number;
}

const StyledImgSlider = styled.div<SliderProps>`
    position: relative;
    display: flex;
    align-items: center;
    .leftArrow {
        left: 8px;
        background: url(${sprite2}) no-repeat;
        background-position: -129px -97px;
        display: ${(props) => props.currentIndex <= 0 && "none"};
    }
    .rightArrow {
        right: 8px;
        background: url(${sprite2}) no-repeat;
        background-position: -160px -97px;
        display: ${(props) => props.total <= props.currentIndex && "none"};
    }
    .leftArrow,
    .rightArrow {
        width: 30px;
        height: 30px;
        position: absolute;
        background-size: 440px 411px;
        cursor: pointer;
    }
    .img-dots {
        position: absolute;
        z-index: 0;
        width: 100%;
        display: flex;
        gap: 4px;
        justify-content: center;
        bottom: -15px;
        .img-dot {
            background-color: #a8a8a8;
            width: 6px;
            height: 6px;
            border-radius: 50%;
        }
        .img-dot:nth-of-type(${(props) => props.currentIndex + 1}) {
            background-color: ${(props) => props.theme.color.blue};
        }
    }

    .img-wrap {
        width: 100%;
        display: flex;
        align-items: center;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
        }
        .img-slider {
            display: flex;
            align-items: center;
            transition: transform 0.3s;
            img {
                width: 100%;
                scroll-snap-align: center;
            }
        }
    }
`;

const ArticleImgSlider = ({ imgs, onLike }: any) => {
    //slider state
    const [sliderIndex, setSliderIndex] = useState(0);
    const totalIndex = imgs.length - 1;
    const wrapRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const { current: slider } = sliderRef;
    const { current: wrap } = wrapRef;

    const leftArrowClickHandler = () => {
        if (slider === null) return;
        if (wrap === null) return;
        if (sliderIndex <= 0) return;
        const wrapWidth = wrap.clientWidth;
        wrap.scrollBy({
            left: -wrapWidth,
            behavior: "smooth",
        });
        detectScroll();
    };

    const rightArrowClickHandler = () => {
        if (slider === null) return;
        if (wrap === null) return;
        if (sliderIndex >= totalIndex) return;

        const wrapWidth = wrap.clientWidth;
        wrap.scrollBy({
            left: wrapWidth,
            behavior: "smooth",
        });
        detectScroll();
    };

    const detectScroll = () => {
        if (wrap === null) return;

        let timer = null;
        let scrollLeft = wrap.scrollLeft;
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            setSliderIndex(Math.round(scrollLeft / wrap.clientWidth));
        }, 150);
    };

    return (
        <StyledImgSlider
            onDoubleClick={onLike}
            total={totalIndex}
            currentIndex={sliderIndex}
        >
            <div className="img-wrap" ref={wrapRef} onScroll={detectScroll}>
                <div className="img-slider" ref={sliderRef}>
                    {imgs.map((url: string, index: string) => (
                        // id 추가되면 key 변경 예정
                        <img key={index} src={url} alt={index} />
                    ))}
                </div>
            </div>
            <div className="leftArrow" onClick={leftArrowClickHandler}></div>
            <div className="rightArrow" onClick={rightArrowClickHandler}></div>
            <div className="img-dots">
                {[...Array(totalIndex + 1)].map((a, index) => (
                    <div key={index} className="img-dot" />
                ))}
            </div>
        </StyledImgSlider>
    );
};

export default ArticleImgSlider;
