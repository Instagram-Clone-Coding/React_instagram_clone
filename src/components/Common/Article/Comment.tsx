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

type CommentType = "comment" | "reply" | "recent";

interface StyledCommentProps {
    commentType: CommentType;
}

const StyledComment = styled.ul<StyledCommentProps>`
    margin-bottom: ${({ commentType }) =>
        commentType === "recent" ? "4px" : "16px"};
    margin-left: ${({ commentType }) =>
        commentType === "reply" ? "54px" : "0"};
    display: flex;
    & > #comment__main {
        width: 100%;
        display: flex;
        & > #comment__avatar {
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 18px;
        }
        & > #comment__middle {
            & > #comment__info {
                margin: 8px 0 4px 0;
                & > button {
                    margin-right: 12px;
                    color: ${(props) => props.theme.font.gray};
                    font-size: 12px;
                    font-weight: normal;
                }
            }
        }
    }
    & > #comment__popHeartLayout {
        margin-top: ${({ commentType }) =>
            commentType === "recent" ? "0px" : "12px"};
    }
`;
interface CommentProps {
    commentObj: PostType.CommentType;
    onMouseEnter: (
        event:
            | React.MouseEvent<HTMLSpanElement>
            | React.MouseEvent<HTMLDivElement>,

        memberNickname: string,
    ) => void;
    onMouseLeave: () => void;
    commentType: CommentType;
}

const Comment = ({
    commentObj,
    onMouseEnter,
    onMouseLeave,
    commentType,
}: CommentProps) => {
    const [isLiked, setIsLiked] = useState(commentObj.commentLikeFlag);
    const dispatch = useDispatch();
    const commentLikeHandler = async () => {
        try {
            if (!isLiked) {
                setIsLiked(true);
                const { data } =
                    await authorizedCustomAxios.post<AxiosType.ResponseType>(
                        "/comments/like",
                        null,
                        { params: { commentId: commentObj.id } },
                    );
                if (data.status !== 200) throw new Error();
            } else {
                setIsLiked(false);
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

    return (
        <StyledComment commentType={commentType}>
            <div id="comment__main">
                {commentType !== "recent" && (
                    <div id="comment__avatar">
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
                <div id="comment__middle">
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
                        <div id="comment__info">
                            <ArticleGap
                                postUploadDate={commentObj.uploadDate}
                                isAboutComment={true}
                            />
                            {commentObj.commentLikesCount === 0 && (
                                <button>
                                    좋아요 {commentObj.commentLikesCount}개
                                </button>
                            )}
                            <button>답글 달기</button>
                        </div>
                    )}
                </div>
            </div>
            <div id="comment__popHeartLayout">
                <PopHeart
                    size={12}
                    isLiked={isLiked}
                    onToggleLike={commentLikeHandler}
                />
            </div>
        </StyledComment>
    );
};

export default Comment;
