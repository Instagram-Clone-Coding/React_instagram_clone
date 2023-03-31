import { authAction } from "app/store/ducks/auth/authSlice";
import PopHeart from "components/Common/PopHeart";
import StringFragmentWithMentionOrHashtagLink from "components/Common/StringFragmentWithMentionOrHashtagLink";
import ArticleGap from "components/Common/Article/ArticleGap";
import Username from "components/Common/Username";
import { authorizedCustomAxios } from "customAxios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import StoryCircle from "components/Common/StoryCircle";
import { paragraphActions } from "app/store/ducks/paragraph/paragraphSlice";
import { useAppSelector } from "app/store/Hooks";
import Loading from "components/Common/Loading";
import { ReactComponent as ThreeDots } from "assets/Svgs/threeDots.svg";
import { modalActions } from "app/store/ducks/modal/modalSlice";

type CommentType = "comment" | "reply" | "recent";

interface StyledCommentProps {
    commentType: CommentType;
}

const StyledComment = styled.li<StyledCommentProps>`
    margin-bottom: ${({ commentType }) =>
        commentType === "recent" ? "4px" : "16px"};
    padding-top: ${({ commentType }) =>
        commentType === "recent" ? "0" : "12px"};

    & > .comment__main {
        width: 100%;
        display: flex;
        &:hover > .comment__middle > .comment__info > .comment__menu {
            display: flex;
        }
        & > .comment__avatar {
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 18px;
        }
        & > .comment__middle {
            flex: 1;
            & > .comment__info {
                margin: 8px 0 4px 0;
                display: flex;
                height: 13px;
                align-items: center;
                & > button {
                    height: 100%;
                    font-weight: 600;
                    margin-right: 12px;
                    display: flex;
                    align-items: center;
                }
                & > .comment__menu {
                    display: none;
                }
                & > time {
                    margin-bottom: 0;
                }
            }
        }
        & > .comment__popHeartLayout {
            margin-left: 12px;
            margin-top: ${({ commentType }) =>
                commentType === "recent" ? "0px" : "12px"};
        }
    }
    & > .comment__replyLayout {
        margin-top: 16px;
        margin-left: 54px;
        & > button {
            display: flex;
            align-items: center;
            margin-right: 6px;
            & > div {
                width: 24px;
                border-bottom: 1px solid ${(props) => props.theme.font.gray};
                margin-right: 16px;
            }
        }
    }
    & > .comment__main > .comment__middle > .comment__info *,
    & > .comment__replyLayout > button {
        color: ${(props) => props.theme.font.gray};
        font-size: 12px;
    }
`;
interface CommentProps {
    parentCommentId?: number;
    commentObj: PostType.CommentType;
    onMouseEnter: (
        event:
            | React.MouseEvent<HTMLSpanElement>
            | React.MouseEvent<HTMLDivElement>,

        memberUsername: string,
    ) => void;
    onMouseLeave: () => void;
    commentType: CommentType;
}

interface GetReplyProps extends AxiosType.ResponseType {
    data: {
        content: PostType.CommentType[];
        last: boolean;
    };
}

const Comment = ({
    parentCommentId,
    commentObj,
    onMouseEnter,
    onMouseLeave,
    commentType,
}: CommentProps) => {
    const [isLiked, setIsLiked] = useState(commentObj.commentLikeFlag);
    const [likesCount, setLikesCount] = useState(commentObj.commentLikesCount);
    const [isReplyOn, setIsReplyOn] = useState(false);
    const [isLastReply, setIsLastReply] = useState(
        (commentObj.replies &&
            commentObj.replies.length <= 10 &&
            commentObj.repliesCount <= 10) ||
            false,
    );
    const [isReplyFetching, setIsReplyFetching] = useState(false);
    const [replyPage, setReplyPage] = useState(1);
    const replyParentObj = useAppSelector(
        ({ paragraph }) => paragraph.replyParentObj,
    );
    const myUsername = useAppSelector(
        ({ auth }) => auth.userInfo?.memberUsername,
    );
    const dispatch = useDispatch();

    const replyHandler = async () => {
        if (isLastReply) return setIsReplyOn((prev) => !prev);
        try {
            setIsReplyFetching(true);
            const {
                data: {
                    data: { content: replies, last },
                },
            } = await authorizedCustomAxios.get<GetReplyProps>(
                `/comments/${commentObj.id}?page=${replyPage}`,
            );
            dispatch(
                paragraphActions.setReplies({
                    replies,
                    parentId: commentObj.id,
                }),
            );
            setIsLastReply(last);
            setIsReplyOn(true);
            setReplyPage((prev) => prev++);
        } catch (error) {
            setIsReplyOn(false);
        } finally {
            setIsReplyFetching(false);
        }
    };

    const commentLikeHandler = async () => {
        try {
            if (!isLiked) {
                setIsLiked(true);
                setLikesCount((prev) => prev + 1);
                const { data } =
                    await authorizedCustomAxios.post<AxiosType.ResponseType>(
                        "/comments/like",
                        null,
                        { params: { commentId: commentObj.id } },
                    );
                if (data.status !== 200) throw new Error();
            } else {
                setIsLiked(false);
                setLikesCount((prev) => prev - 1);
                const { data } = await authorizedCustomAxios.delete(
                    "/comments/like",
                    {
                        params: { commentId: commentObj.id },
                    },
                );
                if (data.status !== 200) throw new Error();
            }
        } catch (error) {
            setIsLiked((prev) => !prev);
            dispatch(authAction.logout());
        }
    };

    const toggleReplyHandler = (commentId: number) => {
        if (replyParentObj?.id === commentId)
            return dispatch(paragraphActions.finishReply());

        return dispatch(
            paragraphActions.startReply({
                id: parentCommentId || commentObj.id,
                username: commentObj.member.username,
            }),
        );
    };

    const commentMenuBtnClickHandler = () => {
        dispatch(modalActions.changeActivatedModal("commentMenu"));
        dispatch(modalActions.setCommentId({ commentId: commentObj.id }));
    };

    return (
        <StyledComment commentType={commentType}>
            <div className="comment__main">
                {commentType !== "recent" && (
                    <div className="comment__avatar">
                        <StoryCircle
                            type="default"
                            avatarUrl={commentObj.member.image.imageUrl}
                            username={commentObj.member.username}
                            scale={42 / 64}
                            onMouseEnter={(event) =>
                                onMouseEnter(event, commentObj.member.username)
                            }
                            onMouseLeave={onMouseLeave}
                        />
                    </div>
                )}
                <div className="comment__middle">
                    <span>
                        <Username
                            onMouseEnter={(event) =>
                                onMouseEnter(event, commentObj.member.username)
                            }
                            onMouseLeave={onMouseLeave}
                        >
                            {commentObj.member.username}
                        </Username>
                        &nbsp;
                        <StringFragmentWithMentionOrHashtagLink
                            str={commentObj.content}
                            mentions={commentObj.mentionsOfContent}
                            hashtags={commentObj.hashtagsOfContent}
                        />
                    </span>
                    {commentType !== "recent" && (
                        <>
                            <div className="comment__info">
                                <ArticleGap
                                    postUploadDate={commentObj.uploadDate}
                                    isAboutComment={true}
                                />
                                {likesCount > 0 && (
                                    <button>좋아요 {likesCount}개</button>
                                )}
                                <button
                                    onClick={() =>
                                        toggleReplyHandler(commentObj.id)
                                    }
                                >
                                    {commentObj.id !== replyParentObj?.id
                                        ? "답글 달기"
                                        : "답글 취소"}
                                </button>
                                {commentObj.member.username === myUsername && ( // '신고' 기능이 없으면 자기 댓글이 아닌 경우에 모달에 보여줄 메뉴가 없어서 아예 버튼 비활성화
                                    <button
                                        className="comment__menu"
                                        onClick={commentMenuBtnClickHandler}
                                    >
                                        <ThreeDots />
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
                <div className="comment__popHeartLayout">
                    <PopHeart
                        size={12}
                        isLiked={isLiked}
                        onToggleLike={commentLikeHandler}
                    />
                </div>
            </div>
            {commentType !== "recent" && commentObj.repliesCount > 0 && (
                <div className="comment__replyLayout">
                    <button onClick={replyHandler} disabled={isReplyFetching}>
                        <div></div>
                        <span>
                            {isLastReply && isReplyOn
                                ? "답글 숨기기"
                                : `답글 보기(${
                                      !isReplyOn
                                          ? commentObj.repliesCount
                                          : commentObj.repliesCount -
                                            (commentObj.replies?.length || 0)
                                  }개)`}
                        </span>
                    </button>
                    {isReplyFetching && <Loading size={14} />}
                    {isReplyOn && commentObj.replies && (
                        <ul>
                            {commentObj.replies.map((replyObj) => (
                                <Comment
                                    parentCommentId={commentObj.id}
                                    key={replyObj.id}
                                    commentType="reply"
                                    commentObj={replyObj}
                                    onMouseEnter={onMouseEnter}
                                    onMouseLeave={onMouseLeave}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </StyledComment>
    );
};

export default Comment;
