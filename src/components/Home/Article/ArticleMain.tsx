import PopHeart from "components/Common/PopHeart";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import FollowingModal from "../Modals/FollowingModal";
import HoverModal from "../Modals/HoverModal";
import Username from "../../Common/Username";

const StyledMain = styled.div`
    padding: 0 16px;
    .article-likeInfo {
        margin-bottom: 8px;
        span {
            font-weight: ${(props) => props.theme.font.bold};
        }
    }
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
    .article-text button,
    .article-commentsBox .article-commentsNum {
        color: ${(props) => props.theme.font.gray};
    }
`;

interface MainProps {
    followingUserWhoLikesArticle: null | string;
    likesCount: number;
    memberNickname: string;
    memberImageUrl: string;
    content: string;
    commentsCount: number;
    comments?: {
        // 없거나 있으면 보내주거나 해야 할 듯
        username: string;
        comment: string;
    }[];
}

const ArticleMain = ({
    followingUserWhoLikesArticle,
    likesCount,
    memberNickname,
    memberImageUrl,
    content,
    commentsCount,
    comments,
}: MainProps) => {
    // like state
    const [isComment1Liked, setIsComment1Liked] = useState(false); // 백엔드에서 이 코멘트 좋아요 한 사람 중 내가 있는지 확인
    const [isComment2Liked, setIsComment2Liked] = useState(false); // 백엔드에서 이 코멘트 좋아요 한 사람 중 내가 있는지 확인
    // content state
    const [isFullText, setIsFullText] = useState(false);
    // modal state
    const [isHoverModalActivated, setIsHoverModalActivated] = useState(false);
    const [isFollowingModalActivated, setIsFollowingModalActivated] =
        useState(false);
    const [modalPositionObj, setModalPositionObj] = useState<DOMRect>();
    const [hoveredUsername, setHoveredUsername] = useState("");
    const [ishoveredUserFollowing, setIsHoveredUserFollowing] = useState(false); // hover한 데이터 가져와서 적용
    const isTextLineBreak = useMemo(() => content.includes("\n"), [content]);
    const textArray = useMemo(
        () => (isTextLineBreak ? content.split("\n") : [content]),
        [content, isTextLineBreak],
    );

    const textSpan = useMemo(
        () =>
            !isFullText ? (
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
            ),
        [isFullText, textArray],
    );
    const comment1LikeHandler = () => {
        setIsComment1Liked((prev) => !prev);
        // 백엔드 수행
    };
    const comment2LikeHandler = () => {
        setIsComment2Liked((prev) => !prev);
        // 백엔드 수행
    };

    const mouseEnterHandler = (
        event:
            | React.MouseEvent<HTMLSpanElement>
            | React.MouseEvent<HTMLDivElement>,
    ) => {
        setHoveredUsername(event.currentTarget.innerText);
        setModalPositionObj(event?.currentTarget.getBoundingClientRect());
        setIsHoverModalActivated(true);
    };

    const mouseLeaveHandler = () => {
        setIsHoverModalActivated(false);
    };

    const getFullText = () => setIsFullText(true);
    return (
        <StyledMain>
            {isHoverModalActivated && (
                <HoverModal
                    isFollowing={ishoveredUserFollowing} // hover username 데이터 가져오면 필요 없음
                    onFollowChange={(a: boolean) =>
                        setIsHoveredUserFollowing(a)
                    }
                    username={hoveredUsername}
                    modalPosition={modalPositionObj}
                    onMouseEnter={() => setIsHoverModalActivated(true)}
                    onMouseLeave={() => setIsHoverModalActivated(false)}
                    onFollowingModalOn={() =>
                        setIsFollowingModalActivated(true)
                    }
                />
            )}
            {ishoveredUserFollowing && isFollowingModalActivated && (
                <FollowingModal
                    onUnfollow={() => {
                        setIsHoveredUserFollowing(false);
                    }}
                    onModalOn={() => setIsFollowingModalActivated(true)}
                    onModalOff={() => setIsFollowingModalActivated(false)}
                    username={hoveredUsername}
                    avatarUrl={memberImageUrl} // 원래 FollowingModal 내부에서 username에 따라 받아와야 함.
                />
            )}
            <div className="article-likeInfo">
                {followingUserWhoLikesArticle ? (
                    <div>
                        {/* 임의로 첫 번째 인덱스 선택 */}
                        <Username
                            onMouseEnter={mouseEnterHandler}
                            onMouseLeave={mouseLeaveHandler}
                        >
                            {followingUserWhoLikesArticle}
                        </Username>
                        님 외<span>{likesCount - 1}명</span>이 좋아합니다
                    </div>
                ) : (
                    <span>좋아요 {likesCount}개</span>
                )}
            </div>
            <div className="article-textBox">
                <Username
                    onMouseEnter={mouseEnterHandler}
                    onMouseLeave={mouseLeaveHandler}
                    className="article-text-username"
                >
                    {memberNickname}&nbsp;
                </Username>
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
            {comments && (
                <div className="article-commentsBox">
                    <div className="article-commentsNum">
                        댓글 {commentsCount}개 모두 보기
                    </div>
                    <div className="article-recent-comment">
                        <span>
                            <Username
                                onMouseEnter={mouseEnterHandler}
                                onMouseLeave={mouseLeaveHandler}
                                className="comment-username"
                            >
                                {comments[0].username}
                            </Username>
                            &nbsp;
                            {comments[0].comment}
                        </span>
                        <PopHeart
                            size={17}
                            isLiked={isComment1Liked}
                            onToggleLike={comment1LikeHandler}
                        />
                    </div>
                    <div className="article-recent-comment">
                        <span>
                            <Username
                                onMouseEnter={mouseEnterHandler}
                                onMouseLeave={mouseLeaveHandler}
                                className="comment-username"
                            >
                                {comments[1].username}
                            </Username>
                            &nbsp;
                            {comments[1].comment}
                        </span>

                        <PopHeart
                            size={17}
                            isLiked={isComment2Liked}
                            onToggleLike={comment2LikeHandler}
                        />
                    </div>
                </div>
            )}
        </StyledMain>
    );
};

export default React.memo(ArticleMain);
