import ArticleCommentFormLayout from "components/Common/Article/ArticleCommentFormLayout";
import ArticleGap from "components/Common/Article/ArticleGap";
import ArticleHeader from "components/Common/Article/ArticleHeader";
import ArticleImgSlider from "components/Common/Article/ArticleImgSlider/ArticleImgSlider";
import ArticleMain from "components/Common/Article/ArticleMain";
import ArticleMainIcons from "components/Common/Article/ArticleMainIcons";
import { authorizedCustomAxios } from "customAxios";
import React, { useMemo, useState } from "react";
import styled from "styled-components";

const StyledLargerArticle = styled.div`
    display: flex;
    border: 1px solid ${(props) => props.theme.color.bd_gray};
    & > .largerArticle__imageSliderFlexBox {
        width: calc(100% - 340px);
    }
    & > .largerArticle__rightContent {
        min-width: 340px;
        width: 340px;
        display: flex;
        flex-direction: column;
        & > .largerArticle__mainLayout {
            padding: 16px;
            flex: 1;
            & > .largerArticle__comments {
            }
        }
    }
`;

interface LargerArticleProps {
    article: PostType.ArticleStateProps;
    onChangeIndex: (index: number) => void;
}

const LargerArticle = ({ article, onChangeIndex }: LargerArticleProps) => {
    const followingUserWhoLikesArticle =
        article.followingMemberUsernameLikedPost;
    const [isLiked, setIsLiked] = useState(article.postLikeFlag);
    const [likesCount, setLikesCount] = useState(article.postLikesCount);

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
        <StyledLargerArticle>
            <div className="largerArticle__imageSliderFlexBox">
                <ArticleImgSlider
                    imageDTOs={article.postImages}
                    onLike={changeToLikeHandler}
                    currentIndex={article.currentIndex}
                    isInLargerArticle={true}
                    onChangeIndex={onChangeIndex}
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
                        // comments={article.comments}
                    />
                    <div className="largerArticle__comments">comment 공간</div>
                </div>
                <ArticleMainIcons
                    isLiked={isLiked}
                    isBookmarked={article.postBookmarkFlag}
                    postId={article.postId}
                    onToggleLike={toggleLikeHandler}
                />
                <ArticleGap postUploadDate={article.postUploadDate} />
                {!article.commentOptionFlag && <ArticleCommentFormLayout />}
            </div>
        </StyledLargerArticle>
    );
};

export default LargerArticle;