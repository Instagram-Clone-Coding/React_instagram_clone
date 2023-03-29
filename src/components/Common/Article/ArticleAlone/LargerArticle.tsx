import ArticleCommentFormLayout from "components/Common/Article/ArticleCommentFormLayout";
import ArticleGap from "components/Common/Article/ArticleGap";
import ArticleHeader from "components/Common/Article/ArticleHeader";
import ArticleImgSlider from "components/Common/Article/ArticleImgSlider/ArticleImgSlider";
import ArticleMain from "components/Common/Article/ArticleMain";
import ArticleMainIcons from "components/Common/Article/ArticleMainIcons";
import { authorizedCustomAxios } from "customAxios";
import { useMemo, useState } from "react";
import styled from "styled-components";

interface StyledLargerArticleProps {
    isModal: boolean;
    heightWithoutBorder: number;
}

const MIN_HEIGHT = 450;
const HEADER_HEIGHT = 60;
const MAIN_ICON_HEIGHT = 37;
const ARTICLE_GAP_HEIGHT = 34;
const COMMENT_HEIGHT = 37;

const StyledLargerArticle = styled.div<StyledLargerArticleProps>`
    display: flex;
    border: 1px solid ${(props) => props.theme.color.bd_gray};
    min-height: ${MIN_HEIGHT}px;
    & > .largerArticle__imageSliderFlexBox {
        width: calc(100% - ${(props) => (props.isModal ? "500px" : "340px")});
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    & > .largerArticle__rightContent {
        background-color: white;
        min-width: ${(props) => (props.isModal ? "500px" : "340px")};
        width: ${(props) => (props.isModal ? "500px" : "340px")};
        height: ${(props) => `${props.heightWithoutBorder}px`};
        display: flex;
        flex-direction: column;
        & > .largerArticle__mainLayout {
            padding: 16px;
            flex: 1;
            height: ${(props) =>
                `${
                    props.heightWithoutBorder -
                    HEADER_HEIGHT -
                    MAIN_ICON_HEIGHT -
                    ARTICLE_GAP_HEIGHT -
                    COMMENT_HEIGHT
                }px`};
            overflow-y: auto;
            &::-webkit-scrollbar {
                display: none;
            }
            & > ul {
                & > button {
                    width: 100%;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
`;

interface LargerArticleProps {
    article: PostType.LargerArticleStateProps;
    isModal?: boolean;
}

const LargerArticle = ({ article, isModal = false }: LargerArticleProps) => {
    const followingUserWhoLikesArticle =
        article.followingMemberUsernameLikedPost;
    const [isLiked, setIsLiked] = useState(article.postLikeFlag);
    const [likesCount, setLikesCount] = useState(article.postLikesCount);
    const [heightWithoutBorder, setHeightWithoutBorder] = useState(0);

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
        <StyledLargerArticle
            isModal={isModal}
            heightWithoutBorder={heightWithoutBorder}
        >
            <div className="largerArticle__imageSliderFlexBox">
                <ArticleImgSlider
                    imageDTOs={article.postImages}
                    onLike={changeToLikeHandler}
                    isInLargerArticle={true}
                    onResizeHeight={(height) =>
                        setHeightWithoutBorder(Math.max(height, MIN_HEIGHT))
                    }
                />
            </div>
            <div className="largerArticle__rightContent">
                <ArticleHeader
                    memberImageUrl={article.member.image.imageUrl}
                    memberUsername={article.member.username} // 이지금
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
                        memberUsername={article.member.username} // dlwlram
                        content={article.postContent}
                        commentsCount={article.postCommentsCount}
                        mentions={article.mentionsOfContent}
                        hashtags={article.hashtagsOfContent}
                        likeOptionFlag={article.likeOptionFlag}
                        isInLargerArticle={true}
                        comments={article.comments}
                        postId={article.postId}
                    />
                </div>
                <ArticleMainIcons
                    isLiked={isLiked}
                    isBookmarked={article.postBookmarkFlag}
                    postId={article.postId}
                    onToggleLike={toggleLikeHandler}
                />
                <ArticleGap postUploadDate={article.postUploadDate} />
                {article.commentOptionFlag && (
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
