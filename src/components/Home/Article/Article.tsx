import styled from "styled-components";
import Card from "UI/Card/Card";
import Username from "../Username";
import sprite2 from "../../../img/sprite2.png";
import { useEffect, useRef, useState } from "react";
import ArticleMainIcons from "./ArticleMainIcons";

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
    }
    .article-likeInfo {
        padding: 0 16px;
        margin-bottom: 8px;
    }
    .article-main {
        padding: 0 16px;
        .article-textBox {
            margin-bottom: 4px;
        }
        .article-commentsBox {
            & > div {
                margin-bottom: 4px;
            }
            .article-recent-comment {
                display: flex;
                align-items: center;
                span {
                    flex: 1 1 auto;
                }
            }
        }
    }
    .article-createdAt {
        padding-left: 16px;
        margin-bottom: 4px;
    }
    .article-write {
        padding: 0 16px;
        margin-top: 4px;
        display: flex;
        align-items: center;
        border-top: 1px solid #efefef;
        min-height: 56px;
        form {
            width: 100%;
        }
    }
`;

// 아마 여기 articleData는 상위 HomeSection 컴포넌트에서 가져와야 하지 않을까
const Article = ({ article }: any) => {
    // data state
    const [myFollowersLiked, setMyFollowersLiked] = useState([]);
    const [isMyFollowerLiked, setIsMyFollowerLiked] = useState(false);
    //slider state
    const [sliderIndex, setSliderIndex] = useState(0);
    const [totalIndex, setTotalIndex] = useState(0);
    const [isLiked, setIsliked] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const { current: slider } = sliderRef;
    const { current: wrap } = wrapRef;

    //text split
    const [textArray, setTextArray] = useState([]);
    const [isFullText, setIsFullText] = useState(false);
    const isTextLineBreak = article.text.includes("\n");

    useEffect(() => {
        // get article's number
        setTotalIndex(article.imgs.length - 1);
        // toggle likes
        // 내 팔로워 중 한 명이 좋아요 눌렀는지 확인(여기서 일단 내 팔로워가 like2라 가정)
        const getMyFollowerLiked = article.likes.filter(
            (username: string) => username === "like2"
        );
        setMyFollowersLiked(getMyFollowerLiked);
        setIsMyFollowerLiked(getMyFollowerLiked !== []);

        const splitedTexts = isTextLineBreak ? article.text.split("\n") : [];
        if (splitedTexts !== []) setTextArray(splitedTexts);
    }, [article, isTextLineBreak]);

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

    const toggleLike = () => setIsliked((prev: boolean) => !prev);
    const changeToLike = () => {
        if (isLiked) return;
        setIsliked(true);
        setIsChanged(true);
    };

    const textSpan = !isFullText ? (
        <span>{textArray[0]}</span>
    ) : (
        textArray.map((line: string, index: number) => {
            return (
                <span key={index}>
                    {line}
                    <br />
                </span>
            );
        })
    );
    const getFullText = () => setIsFullText(true);

    const calculateTerm = (createdAt: number): string => {
        const gap = Date.now() - createdAt;
        if (gap >= 604800000) {
            return `${Math.floor(gap / 604800000)}주 전`;
        } else if (gap >= 86400000) {
            return `${Math.floor(gap / 86400000)}일 전`;
        } else if (gap >= 3600000) {
            return `${Math.floor(gap / 3600000)}시간 전`;
        } else if (gap >= 60000) {
            return `${Math.floor(gap / 60000)}분 전`;
        } else {
            return "방금 전";
        }
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
            <div className="img-relative" onDoubleClick={changeToLike}>
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
            <ArticleMainIcons
                isLiked={isLiked}
                isChanged={isChanged}
                onToggleLike={toggleLike}
                onToggleChange={setIsChanged}
            />
            <div className="article-likeInfo">
                {isMyFollowerLiked ? (
                    <div>
                        {/* 임의로 첫 번째 인덱스 선택 */}
                        {myFollowersLiked[0]}님 외{" "}
                        <span>{article.likes.length - 1}명</span>이 좋아합니다
                    </div>
                ) : (
                    <span>좋아요 {article.likes.length}개</span>
                )}
            </div>
            <div className="article-main">
                <div className="article-textBox">
                    <span className="article-text-username">
                        {article.owner.username}&nbsp;
                    </span>
                    <span className="article-text">
                        {isTextLineBreak ? (
                            <>
                                {textSpan}
                                {!isFullText && (
                                    <>
                                        ...&nbsp;
                                        <button onClick={getFullText}>
                                            더 보기
                                        </button>
                                    </>
                                )}
                            </>
                        ) : (
                            <span>{article.text}</span>
                        )}
                    </span>
                </div>
                <div className="article-commentsBox">
                    <div className="article-commentsNum">
                        댓글 {article.comments.length}개 모두 보기
                    </div>
                    <div className="article-recent-comment">
                        <span>
                            {article.comments[0].username}&nbsp;
                            {article.comments[0].comment}
                        </span>
                        <svg
                            aria-label="좋아요"
                            color="#262626"
                            fill="#262626"
                            height="12"
                            role="img"
                            viewBox="0 0 48 48"
                            width="12"
                        >
                            <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                        </svg>
                    </div>
                    <div className="article-recent-comment">
                        <span>
                            {article.comments[1].username}&nbsp;
                            {article.comments[1].comment}
                        </span>
                        <svg
                            aria-label="좋아요"
                            color="#262626"
                            fill="#262626"
                            height="12"
                            role="img"
                            viewBox="0 0 48 48"
                            width="12"
                        >
                            <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="article-createdAt">
                {calculateTerm(article.createdAt)}
            </div>
            <div className="article-write">
                <form>
                    <button>
                        <svg
                            aria-label="이모티콘"
                            color="#262626"
                            fill="#262626"
                            height="24"
                            role="img"
                            viewBox="0 0 48 48"
                            width="24"
                        >
                            <path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path>
                            <path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path>
                        </svg>
                    </button>
                    <input type="text" placeholder="댓글 달기" />
                    <button type="submit"></button>
                </form>
            </div>
        </ArticleCard>
    );
};

export default Article;
