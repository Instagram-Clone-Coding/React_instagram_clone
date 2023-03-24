import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Username from "../Username";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { modalActions } from "app/store/ducks/modal/modalSlice";
import { getMiniProfile } from "app/store/ducks/modal/modalThunk";
import StringFragmentWithMentionOrHashtagLink from "components/Common/StringFragmentWithMentionOrHashtagLink";
import Comment from "components/Common/Article/Comment";

interface StyledMainProps {
    isInLargerArticle: boolean;
}

const StyledMain = styled.div<StyledMainProps>`
    padding: 0 ${(props) => (props.isInLargerArticle ? 0 : "16px")};
    .article-likeInfo {
        margin-bottom: 8px;
        span {
            font-weight: ${(props) => props.theme.font.bold};
        }
    }
    .article-textBox {
        margin-bottom: ${({ isInLargerArticle }) =>
            isInLargerArticle ? "20px" : "4px"};
        button {
            font-weight: normal;
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
    memberUsername: string;
    memberImageUrl: string;
    content: string;
    commentsCount: number;
    mentions: string[];
    hashtags: string[];
    likeOptionFlag: boolean;
    isInLargerArticle?: boolean;
    comments: PostType.CommentType[];
}

const ArticleMain = ({
    followingUserWhoLikesArticle,
    likesCount,
    memberUsername,
    memberImageUrl,
    content,
    commentsCount,
    mentions,
    hashtags,
    likeOptionFlag,
    isInLargerArticle = false,
    comments,
}: MainProps) => {
    // content state
    const [isFullText, setIsFullText] = useState(
        isInLargerArticle ? true : false,
    );
    const miniProfile = useAppSelector(({ modal }) => modal.miniProfile);
    const myUsername = useAppSelector(
        ({ auth }) => auth.userInfo?.memberUsername,
    );
    const dispatch = useAppDispatch();
    const isTextLineBreak = useMemo(() => content.includes("\n"), [content]);
    const textArray = useMemo(
        () => (isTextLineBreak ? content.split("\n") : [content]),
        [content, isTextLineBreak],
    );

    const textSpan = useMemo(
        () =>
            !isFullText ? (
                <span>
                    <StringFragmentWithMentionOrHashtagLink
                        str={textArray[0]}
                        mentions={mentions}
                        hashtags={hashtags}
                    />
                </span>
            ) : (
                textArray.map((line: string, index: number) => {
                    return (
                        <span key={index}>
                            <StringFragmentWithMentionOrHashtagLink
                                str={line}
                                mentions={mentions}
                                hashtags={hashtags}
                            />
                            <br />
                        </span>
                    );
                })
            ),
        [isFullText, textArray, mentions, hashtags],
    );

    const fetchMiniProfile = async ({
        top,
        bottom,
        left,
        memberUsername,
    }: ModalType.FetchMiniProfileProps) => {
        await dispatch(
            getMiniProfile({
                memberUsername,
                modalPosition: { top, bottom, left },
            }),
        );
    };

    const mouseEnterHandler = (
        event:
            | React.MouseEvent<HTMLSpanElement>
            | React.MouseEvent<HTMLDivElement>,
        memberUsername: string,
    ) => {
        const { top, bottom, left } =
            event.currentTarget.getBoundingClientRect();
        if (!event) return;
        dispatch(modalActions.changeHoverModalPosition({ top, bottom, left }));
        dispatch(modalActions.mouseOnHoverModal());

        miniProfile?.memberUsername !== memberUsername &&
            fetchMiniProfile({
                top,
                bottom,
                left,
                memberUsername,
            });
    };

    const mouseLeaveHandler = () => {
        dispatch(modalActions.mouseNotOnHoverModal());
        setTimeout(() => dispatch(modalActions.checkMouseOnHoverModal()), 100);
    };

    const getFullText = () => setIsFullText(true);

    const LikeText = ({
        followingUserWhoLikesArticle,
        likesCount,
    }: {
        followingUserWhoLikesArticle: string | null;
        likesCount: number;
    }) => {
        if (followingUserWhoLikesArticle) {
            return (
                <div>
                    <Username
                        onMouseEnter={(event) =>
                            mouseEnterHandler(
                                event,
                                followingUserWhoLikesArticle,
                            )
                        }
                        onMouseLeave={mouseLeaveHandler}
                    >
                        {followingUserWhoLikesArticle}
                    </Username>
                    님
                    {likesCount > 1 &&
                        `외 ${(<span>{likesCount - 1}명</span>)}`}
                    이 좋아합니다
                </div>
            );
        } else {
            return <span>좋아요 {likesCount}개</span>;
        }
    };

    return (
        <>
            <StyledMain isInLargerArticle={isInLargerArticle}>
                {(likeOptionFlag || myUsername === memberUsername) && (
                    <div className="article-likeInfo">
                        <LikeText
                            followingUserWhoLikesArticle={
                                followingUserWhoLikesArticle
                            }
                            likesCount={likesCount}
                        />
                    </div>
                )}
                <div className="article-textBox">
                    <Username
                        onMouseEnter={(event) =>
                            mouseEnterHandler(event, memberUsername)
                        }
                        onMouseLeave={mouseLeaveHandler}
                        className="article-text-username"
                    >
                        {memberUsername}
                    </Username>
                    &nbsp;
                    <span className="article-text">
                        <>
                            {textSpan}
                            {isTextLineBreak && !isFullText && (
                                <>
                                    ...&nbsp;
                                    <button onClick={getFullText}>
                                        더 보기
                                    </button>
                                </>
                            )}
                        </>
                    </span>
                </div>
                {isInLargerArticle || (
                    <ul className="article-commentsBox">
                        {comments.map((comment) => (
                            <Comment
                                key={comment.id}
                                commentObj={comment}
                                onMouseEnter={mouseEnterHandler}
                                onMouseLeave={mouseLeaveHandler}
                                commentType="recent"
                            />
                        ))}
                    </ul>
                )}
            </StyledMain>
            <div className="article__comments">
                {isInLargerArticle &&
                    comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            commentObj={comment}
                            onMouseEnter={mouseEnterHandler}
                            onMouseLeave={mouseLeaveHandler} // 임시
                            commentType="comment"
                        />
                    ))}
            </div>
        </>
    );
};

export default React.memo(ArticleMain);
