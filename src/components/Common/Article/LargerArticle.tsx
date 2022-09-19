import ArticleCommentFormLayout from "components/Home/Article/ArticleCommentFormLayout";
import ArticleGap from "components/Home/Article/ArticleGap";
import ArticleHeader from "components/Home/Article/ArticleHeader";
import ArticleImgSlider from "components/Home/Article/ArticleImgSlider";
import ArticleMain from "components/Home/Article/ArticleMain";
import ArticleMainIcons from "components/Home/Article/ArticleMainIcons";
import React, { useState } from "react";
import styled from "styled-components";

const StyledLargerArticle = styled.div`
    display: flex;
    max-width: 935px;
    /* width: calc(100% - 40px); */
    & > .largerArticle__imageSliderFlexBox {
        width: calc(100% - 340px);
    }
    & > .largerArticle__rightContent {
        min-width: 340px;
        width: 340px;
        display: flex;
        flex-direction: column;
        & > .largerArticle__comments {
            flex: 1;
        }
    }
`;

interface LargerArticleProps {
    article: PostType.ArticleStateProps;
}

const LargerArticle = ({ article }: LargerArticleProps) => {
    const followingUserWhoLikesArticle =
        article.followingMemberUsernameLikedPost;
    const [isLiked, setIsLiked] = useState(article.postLikeFlag);
    const [likesCount, setLikesCount] = useState(article.postLikesCount);
    return (
        <StyledLargerArticle>
            <div className="largerArticle__imageSliderFlexBox">
                <ArticleImgSlider
                    imageDTOs={article.postImages}
                    onLike={() => undefined}
                />
            </div>
            <div className="largerArticle__rightContent">
                <ArticleHeader
                    memberImageUrl={article.member.image.imageUrl}
                    memberUsername={article.member.name} // 이지금
                    memberNickname={article.member.username} // dlwlram
                    postId={article.postId}
                    isFollowing={article.isFollowing}
                    followLoading={article.followLoading}
                />
                <ArticleMain
                    followingUserWhoLikesArticle={followingUserWhoLikesArticle}
                    likesCount={likesCount}
                    memberImageUrl={article.member.image.imageUrl}
                    memberUsername={article.member.name} // 이지금
                    memberNickname={article.member.username} // dlwlram
                    content={article.postContent}
                    commentsCount={article.postCommentsCount}
                    mentions={article.mentionsOfContent}
                    hashtags={article.hashtagsOfContent}
                    likeOptionFlag={article.likeOptionFlag}
                    // comments={article.comments}
                />
                <div className="largerArticle__comments">comment 공간</div>
                <ArticleMainIcons
                    isLiked={isLiked}
                    isBookmarked={article.postBookmarkFlag}
                    postId={article.postId}
                    onToggleLike={() => {}}
                />
                <ArticleGap postUploadDate={article.postUploadDate} />
                {!article.commentOptionFlag && <ArticleCommentFormLayout />}
            </div>
        </StyledLargerArticle>
    );
};

export default LargerArticle;
