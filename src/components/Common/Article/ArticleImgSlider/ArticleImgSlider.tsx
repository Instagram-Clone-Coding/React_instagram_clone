import React, { useEffect, useRef, useState } from "react";
import sprite2 from "assets/Images/sprite2.png";
import styled from "styled-components";
import ArticleImgSliderUnit from "components/Common/Article/ArticleImgSlider/ArticleImgSliderUnit";

interface SliderProps {
    total: number;
    currentIndex: number;
}

const StyledImgSlider = styled.div<SliderProps>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    @keyframes whiteHeartAnimation {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        20% {
            transform: scale(1.2);
            opacity: 0.9;
        }
        30% {
            transform: scale(0.9);
            opacity: 0.9;
        }
        40% {
            transform: scale(1);
            opacity: 0.9;
        }
        75% {
            transform: scale(1);
            opacity: 0.9;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
    @-webkit-keyframes whiteHeartAnimation {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        20% {
            transform: scale(1.2);
            opacity: 0.9;
        }
        30% {
            transform: scale(0.9);
            opacity: 0.9;
        }
        40% {
            transform: scale(1);
            opacity: 0.9;
        }
        75% {
            transform: scale(1);
            opacity: 0.9;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
    .img-heart {
        position: absolute;
        z-index: 2;
        background: url(${sprite2}) no-repeat 2.584% 6.902%;
        background-size: 440px 411px;
        width: 111px;
        height: 100px;
        opacity: 0;
        animation: whiteHeartAnimation 1s;
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
        background-color: black;
        .img-slider {
            display: flex;
            align-items: center;
            transition: transform 0.3s;
        }
    }
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
        /* z-index: 999; */
    }
    .img-dots {
        position: absolute;
        z-index: 0;
        width: 100%;
        display: flex;
        gap: 4px;
        justify-content: center;
        bottom: ${(props) => (props.isInLargerArticle ? "15px" : "-15px")};
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
`;

interface SliderProps {
    total: number;
    currentIndex: number;
    isInLargerArticle: boolean;
}

interface ArticleImgSliderProps {
    imageDTOs: CommonType.PostImageDTOProps[];
    onLike: () => void;
    onResizeHeight?: (height: number) => void;
    isInLargerArticle?: boolean;
}

const ArticleImgSlider = ({
    imageDTOs,
    onLike,
    onResizeHeight,
    isInLargerArticle = false,
}: ArticleImgSliderProps) => {
    //slider state
    const [sliderIndex, setSliderIndex] = useState(0);
    const [doubleClicked, setDoubleClicked] = useState(false);
    const [unitWidth, setUnitWidth] = useState(0);
    const totalIndex = imageDTOs.length - 1;
    const wrapRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resizeHandler = () => {
            if (!wrapRef.current) return;
            setUnitWidth(wrapRef.current.offsetWidth);
            onResizeHeight && onResizeHeight(wrapRef.current.clientHeight);
        };
        wrapRef.current?.scrollBy({
            left: 0,
        });
        window.addEventListener("resize", resizeHandler);
        resizeHandler();
        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, [onResizeHeight]);

    const doubleClickLikeHandler = () => {
        setDoubleClicked(true);
        onLike();
    };

    const leftArrowClickHandler = (): undefined => {
        const { current: slider } = sliderRef;
        const { current: wrap } = wrapRef;
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

    const rightArrowClickHandler = (): undefined => {
        const { current: slider } = sliderRef;
        const { current: wrap } = wrapRef;
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

    const detectScroll = (): undefined => {
        const { current: wrap } = wrapRef;
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
            onDoubleClick={doubleClickLikeHandler} // 빨간 하트 애니메이션 효과는 redux 적용하면서 연결할 예정
            total={totalIndex}
            currentIndex={sliderIndex}
            isInLargerArticle={isInLargerArticle}
        >
            {doubleClicked && (
                <div
                    className="img-heart"
                    onAnimationEnd={() => setDoubleClicked(false)}
                ></div>
            )}
            <div className="img-wrap" ref={wrapRef} onScroll={detectScroll}>
                <div
                    className="img-slider"
                    ref={sliderRef}
                    style={{ width: imageDTOs.length * 100 + "%" }}
                >
                    {imageDTOs.map((imageDTO) => (
                        <ArticleImgSliderUnit
                            key={imageDTO.id}
                            imageDTO={imageDTO}
                            unitWidth={unitWidth}
                        />
                    ))}
                </div>
            </div>
            <div className="leftArrow" onClick={leftArrowClickHandler}></div>
            <div className="rightArrow" onClick={rightArrowClickHandler}></div>
            <div className="img-dots">
                {totalIndex > 0 &&
                    [...Array(totalIndex + 1)].map((a, index) => (
                        <div key={index} className="img-dot" />
                    ))}
            </div>
        </StyledImgSlider>
    );
};

export default React.memo(ArticleImgSlider);
