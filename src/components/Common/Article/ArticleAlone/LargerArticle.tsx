import { paragraphActions } from "app/store/ducks/paragraph/paragraphSlice";
import { useAppDispatch } from "app/store/Hooks";
import ArticleCommentFormLayout from "components/Common/Article/ArticleCommentFormLayout";
import ArticleGap from "components/Common/Article/ArticleGap";
import ArticleHeader from "components/Common/Article/ArticleHeader";
import ArticleImgSlider from "components/Common/Article/ArticleImgSlider/ArticleImgSlider";
import ArticleMain from "components/Common/Article/ArticleMain";
import ArticleMainIcons from "components/Common/Article/ArticleMainIcons";
import { authorizedCustomAxios } from "customAxios";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

interface StyledLargerArticleProps {
    isModal: boolean;
}

const StyledLargerArticle = styled.div<StyledLargerArticleProps>`
    display: flex;
    border: 1px solid ${(props) => props.theme.color.bd_gray};
    & > .largerArticle__imageSliderFlexBox {
        width: calc(100% - ${(props) => (props.isModal ? "500px" : "340px")});
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    & > .largerArticle__rightContent {
        min-width: ${(props) => (props.isModal ? "500px" : "340px")};
        width: ${(props) => (props.isModal ? "500px" : "340px")};
        display: flex;
        flex-direction: column;
        & > .largerArticle__mainLayout {
            padding: 16px;
            flex: 1;
        }
    }
`;

interface LargerArticleProps {
    article: PostType.LargerArticleStateProps;
    isModal?: boolean;
}

interface GetCommentsResponseType extends AxiosType.ResponseType {
    data: {
        content: PostType.CommentType[];
        first: boolean;
        last: boolean;
    };
}

const LargerArticle = ({ article, isModal = false }: LargerArticleProps) => {
    const followingUserWhoLikesArticle =
        article.followingMemberUsernameLikedPost;
    const [isLiked, setIsLiked] = useState(article.postLikeFlag);
    const [likesCount, setLikesCount] = useState(article.postLikesCount);
    const [currentCommentPage, setCurrentCommentPage] = useState(1);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getComments = async () => {
            try {
                const {
                    data: {
                        data: { content },
                    },
                } = await authorizedCustomAxios.get<GetCommentsResponseType>(
                    `/comments/posts/${article.postId}`,
                    { params: { page: currentCommentPage } },
                );
                dispatch(paragraphActions.setCurrentComments(content));
                // setCurrentCommentPage((prev) => prev + 1);
            } catch (error) {
                console.log(error);
            }
        };
        getComments();
    }, [article.postId, currentCommentPage, dispatch]);

    const config = useMemo(
        () => ({
            params: {
                postId: article.postId,
            },
        }),
        [article.postId],
    );

    const dispatchPostLike = async () => {
        try {
            await authorizedCustomAxios.post("/posts/like", null, config);
        } catch (error) {
            setIsLiked(false);
            setLikesCount((prev) => prev - 1);
        }
    };

    const dispatchDeleteLike = async () => {
        try {
            await authorizedCustomAxios.delete("/posts/like", config);
        } catch (error) {
            setIsLiked(true);
            setLikesCount((prev) => prev + 1);
        }
    };

    const changeToLikeHandler = (): void => {
        if (isLiked) return;
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
        dispatchPostLike();
    };

    const toggleLikeHandler = (): void => {
        if (!isLiked) {
            setIsLiked(true);
            setLikesCount((prev) => prev + 1);
            dispatchPostLike();
        } else {
            setIsLiked(false);
            setLikesCount((prev) => prev - 1);
            dispatchDeleteLike();
        }
    };

    return (
        <StyledLargerArticle isModal={isModal}>
            <div className="largerArticle__imageSliderFlexBox">
                <ArticleImgSlider
                    imageDTOs={article.postImages}
                    onLike={changeToLikeHandler}
                    isInLargerArticle={true}
                />
            </div>
            <div className="largerArticle__rightContent">
                <ArticleHeader
                    memberImageUrl={article.member.image.imageUrl}
                    memberUsername={article.member.name} // 이지금
                    memberNickname={article.member.username} // dlwlram
                    postId={article.postId}
                    isFollowing={article.following}
                    followLoading={article.followLoading}
                />
                <div className="largerArticle__mainLayout">
                    <ArticleMain
                        followingUserWhoLikesArticle={
                            followingUserWhoLikesArticle
                        }
                        likesCount={likesCount}
                        memberImageUrl={article.member.image.imageUrl}
                        memberUsername={article.member.name} // 이지금
                        memberNickname={article.member.username} // dlwlram
                        content={article.postContent}
                        commentsCount={article.postCommentsCount}
                        mentions={article.mentionsOfContent}
                        hashtags={article.hashtagsOfContent}
                        likeOptionFlag={article.likeOptionFlag}
                        isInLargerArticle={true}
                        comments={article.comments}
                    />
                </div>
                <ArticleMainIcons
                    isLiked={isLiked}
                    isBookmarked={article.postBookmarkFlag}
                    postId={article.postId}
                    onToggleLike={toggleLikeHandler}
                />
                <ArticleGap postUploadDate={article.postUploadDate} />
                {!article.commentOptionFlag && (
                    <ArticleCommentFormLayout
                        postId={article.postId}
                        isInLargerArticle={true}
                    />
                )}
            </div>
        </StyledLargerArticle>
    );
};

export default LargerArticle;
