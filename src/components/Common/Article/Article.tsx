import styled from "styled-components";
import Card from "styles/UI/Card";
import { useEffect, useRef, useState } from "react";
import useOnView from "hooks/useOnView";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import {
    deleteLike,
    getExtraArticle,
    postLike,
} from "app/store/ducks/home/homThunk";
import ArticleHeader from "components/Common/Article/ArticleHeader";
import ArticleImgSlider from "components/Common/Article/ArticleImgSlider";
import ArticleMainIcons from "components/Common/Article/ArticleMainIcons";
import ArticleMain from "components/Common/Article/ArticleMain";
import ArticleGap from "components/Common/Article/ArticleGap";
import ArticleCommentFormLayout from "components/Common/Article/ArticleCommentFormLayout";

interface ArticleCardProps {
    isModal: boolean;
}

const ArticleCard = styled(Card)<ArticleCardProps>`
    margin-bottom: ${({ isModal }) => (isModal ? 0 : "24px")};
`;

interface ArticleComponentPros {
    article: PostType.ArticleStateProps;
    isObserving: boolean;
    isModal?: boolean;
}

// 아마 여기 articleData는 상위 HomeSection 컴포넌트에서 가져와야 하지 않을까
const Article = ({
    article,
    isObserving,
    isModal = false,
}: ArticleComponentPros) => {
    // data state
    const followingUserWhoLikesArticle =
        article.followingMemberUsernameLikedPost;
    // like state
    const [isLiked, setIsliked] = useState(article.postLikeFlag);
    const [likesCount, setLikesCount] = useState(article.postLikesCount);
    const articleRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnView(articleRef);
    const { extraArticlesCount } = useAppSelector(({ home }) => home);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const dispatchExtraArticle = async () => {
            try {
                await dispatch(
                    getExtraArticle({
                        page: extraArticlesCount + 1,
                    }),
                );
            } catch (error) {
                console.log(error);
            }
        };

        isObserving && isVisible && dispatchExtraArticle(); // 이 때 비동기 작업 및 무한 스크롤
    }, [isObserving, isVisible, dispatch]);

    const dispatchPostLike = async () => {
        try {
            await dispatch(postLike({ postId: article.postId })).unwrap();
        } catch (error) {
            setIsliked(false);
            setLikesCount((prev) => prev - 1);
        }
    };

    const dispatchDeleteLike = async () => {
        try {
            await dispatch(
                deleteLike({
                    postId: article.postId,
                }),
            ).unwrap();
        } catch (error) {
            setIsliked(true);
            setLikesCount((prev) => prev + 1);
        }
    };

    const toggleLikeHandler = (): void => {
        if (!isLiked) {
            setIsliked(true);
            setLikesCount((prev) => prev + 1);
            dispatchPostLike();
        } else {
            setIsliked(false);
            setLikesCount((prev) => prev - 1);
            dispatchDeleteLike();
        }
    };

    const changeToLikeHandler = (): undefined => {
        if (isLiked) return;
        setIsliked(true);
        setLikesCount((prev) => prev + 1);
        dispatchPostLike();
    };

    return (
        <ArticleCard as="article" ref={articleRef} isModal={isModal}>
            <ArticleHeader
                memberImageUrl={article.member.image.imageUrl}
                memberUsername={article.member.username} // dlwlrma
                postId={article.postId}
                isFollowing={article.following}
                followLoading={article.followLoading}
            />
            <ArticleImgSlider
                imageDTOs={article.postImages}
                onLike={changeToLikeHandler}
            />
            <ArticleMainIcons
                isLiked={isLiked}
                isBookmarked={article.postBookmarkFlag}
                postId={article.postId}
                onToggleLike={toggleLikeHandler}
            />
            <ArticleMain
                followingUserWhoLikesArticle={followingUserWhoLikesArticle}
                likesCount={likesCount}
                memberImageUrl={article.member.image.imageUrl}
                memberUsername={article.member.username} // dlwlram
                content={article.postContent}
                commentsCount={article.postCommentsCount}
                mentions={article.mentionsOfContent}
                hashtags={article.hashtagsOfContent}
                likeOptionFlag={article.likeOptionFlag}
                comments={article.recentComments}
                postId={article.postId}
            />
            <ArticleGap postUploadDate={article.postUploadDate} />
            {article.commentOptionFlag && (
                <ArticleCommentFormLayout
                    postId={article.postId}
                    isInLargerArticle={false}
                />
            )}
        </ArticleCard>
    );
};

export default Article;
