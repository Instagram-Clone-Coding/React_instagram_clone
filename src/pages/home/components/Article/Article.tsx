import styled from "styled-components";
import Card from "UI/Card/Card";
import Username from "../Username";
import sprite2 from "../../../../img/sprite2.png";
import { useEffect, useRef, useState } from "react";

interface ArticleProps {
    total: number;
    currentIndex: number;
}

const ArticleCard = styled(Card)<ArticleProps>`
    margin-bottom: 24px;
    header {
        height: 60px;
        padding: 16px;
        display: flex;
        position: relative;
        img {
            min-width: 32px;
            min-height: 32px;
            border-radius: 50%;
            cursor: pointer;
        }
        .header-content {
            margin-left: 14px;
            flex: 1;
            div:nth-child(2) {
                font-size: 12px;
                line-height: 15px;
                cursor: pointer;
            }
        }
        .header-dots {
            position: absolute;
            right: 4px;
            top: 50%;
            transform: translateY(-50%);
            width: 24px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            div {
                background: url(${sprite2}) no-repeat -524px -483px;
                width: 15px;
                height: 3px;
                transform: scale(0.8);
            }
        }
    }
    .img-relative {
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
    }
`;

const Article = ({ article }: any) => {
    const [sliderIndex, setSliderIndex] = useState(0);
    const [totalIndex, setTotalIndex] = useState(0);
    const wrapRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const { current: slider } = sliderRef;
    const { current: wrap } = wrapRef;

    useEffect(() => {
        // get article's number
        setTotalIndex(article.imgs.length - 1);
    }, [article.imgs.length]);

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
        <ArticleCard as="article" total={totalIndex} currentIndex={sliderIndex}>
            <header>
                <img
                    src={article.owner.avatarUrl}
                    alt={article.owner.username}
                />
                <div className="header-content">
                    <Username>{article.owner.username}</Username>
                    <div>{article.location}</div>
                </div>
                <div className="header-dots">
                    <div></div>
                </div>
            </header>
            <div className="img-relative">
                <div className="img-wrap" ref={wrapRef} onScroll={detectScroll}>
                    <div className="img-slider" ref={sliderRef}>
                        {article.imgs.map((url: string, index: string) => (
                            <img key={index} src={url} alt={index} />
                        ))}
                    </div>
                </div>
                <div
                    className="leftArrow"
                    onClick={leftArrowClickHandler}
                ></div>
                <div
                    className="rightArrow"
                    onClick={rightArrowClickHandler}
                ></div>
                <div className="img-dots">
                    {[...Array(totalIndex + 1)].map((a, index) => (
                        <div key={index} className="img-dot" />
                    ))}
                </div>
            </div>
        </ArticleCard>
    );
};

export default Article;
