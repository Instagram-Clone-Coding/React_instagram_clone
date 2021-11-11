import PopHeart from "components/Common/PopHeart";
import React, { useState } from "react";
import styled from "styled-components";

const StyledMain = styled.div`
    padding: 0 16px;

    .article-textBox {
        margin-bottom: 4px;
        button {
            font-weight: normal;
        }
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
    .article-text-username,
    .article-recent-comment .comment-username {
        font-weight: ${(props) => props.theme.font.bold};
    }
    .article-text button,
    .article-commentsBox .article-commentsNum {
        color: ${(props) => props.theme.font.gray};
    }
`;

interface MainProps {
    owner: {
        username: string;
        avatarUrl: string;
    };
    text: string;
    comments: {
        username: string;
        comment: string;
    }[];
}

const ArticleMain = ({ owner, text, comments }: MainProps) => {
    const [isComment1Liked, setIsComment1Liked] = useState(false); // 백엔드에서 이 코멘트 좋아요 한 사람이 있는지 확인
    const [isComment2Liked, setIsComment2Liked] = useState(false); // 백엔드에서 이 코멘트 좋아요 한 사람이 있는지 확인
    const [isFullText, setIsFullText] = useState(false);
    const [isHeart1Animation, setIsHeart1Animation] = useState(false);
    const [isHeart2Animation, setIsHeart2Animation] = useState(false);
    const isTextLineBreak = text.includes("\n");
    const textArray = isTextLineBreak ? text.split("\n") : [text];

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
    const comment1LikeHandler = () => {
        setIsHeart1Animation(true);
        setIsComment1Liked((prev) => !prev);
        // 백엔드 수행
    };
    const comment2LikeHandler = () => {
        setIsHeart2Animation(true);
        setIsComment2Liked((prev) => !prev);
        // 백엔드 수행
    };

    const getFullText = () => setIsFullText(true);
    return (
        <StyledMain>
            <div className="article-textBox">
                <span className="article-text-username">
                    {owner.username}&nbsp;
                </span>
                <span className="article-text">
                    <>
                        {textSpan}
                        {isTextLineBreak && !isFullText && (
                            <>
                                ...&nbsp;
                                <button onClick={getFullText}>더 보기</button>
                            </>
                        )}
                    </>
                </span>
            </div>
            <div className="article-commentsBox">
                <div className="article-commentsNum">
                    댓글 {comments.length}개 모두 보기
                </div>
                <div className="article-recent-comment">
                    <span>
                        <span className="comment-username">
                            {comments[0].username}
                        </span>
                        &nbsp;
                        {comments[0].comment}
                    </span>
                    <PopHeart
                        size={17}
                        isLiked={isComment1Liked}
                        onToggleLike={comment1LikeHandler}
                        isAnimation={isHeart1Animation}
                        resetAnimation={() => setIsHeart1Animation(false)}
                    />
                </div>
                <div className="article-recent-comment">
                    <span>
                        <span className="comment-username">
                            {comments[1].username}
                        </span>
                        &nbsp;
                        {comments[1].comment}
                    </span>

                    <PopHeart
                        size={17}
                        isLiked={isComment2Liked}
                        onToggleLike={comment2LikeHandler}
                        isAnimation={isHeart2Animation}
                        resetAnimation={() => setIsHeart2Animation(false)}
                    />
                </div>
            </div>
        </StyledMain>
    );
};

export default React.memo(ArticleMain);
