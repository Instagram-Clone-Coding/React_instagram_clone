import ArticleCommentFormLayout from "components/Common/Article/ArticleCommentFormLayout";
import ArticleGap from "components/Common/Article/ArticleGap";
import ArticleHeader from "components/Common/Article/ArticleHeader";
import ArticleImgSlider from "components/Common/Article/ArticleImgSlider/ArticleImgSlider";
import ArticleMain from "components/Common/Article/ArticleMain";
import ArticleMainIcons from "components/Common/Article/ArticleMainIcons";
import React, { useState } from "react";
import styled from "styled-components";

const StyledLargerArticle = styled.div`
    display: flex;
    max-width: 935px;
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
                    isInLargerArticle={true}
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
                    onToggleLike={() => {}}
                />
                <ArticleGap postUploadDate={article.postUploadDate} />
                {!article.commentOptionFlag && <ArticleCommentFormLayout />}
            </div>
        </StyledLargerArticle>
    );
};

export default LargerArticle;
