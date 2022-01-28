import styled from "styled-components";
import Card from "styles/UI/Card";
import { useEffect, useRef, useState } from "react";
import ArticleHeader from "components/Home/Article/ArticleHeader";
import ArticleImgSlider from "components/Home/Article/ArticleImgSlider";
import ArticleMainIcons from "components/Home/Article/ArticleMainIcons";
import ArticleMain from "components/Home/Article/ArticleMain";
import CommentForm from "components/Home/Article/CommentForm";
import { HomeType } from "@type";
import useGapText from "hooks/useGapText";
import useOnView from "hooks/useOnView";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import {
    deleteLike,
    getExtraArticle,
    postLike,
} from "app/store/ducks/home/homThunk";

const ArticleCard = styled(Card)`
    margin-bottom: 24px;
    .article-createdAt {
        padding-left: 16px;
        margin-bottom: 16px;
        color: ${(props) => props.theme.font.gray};
        font-size: 10px;
    }
    .article-form-layout {
        padding: 6px 16px;
        display: flex;
        align-items: center;
        border-top: 1px solid #efefef;
        form {
            width: 100%;
        }
    }
`;

const token = {
    accessToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0MzM5MjIyMn0.hmbdXM_VNZNHvzp1Byts6GHQxhvvOHADwYF7KhNGFBVUIDQx1CZpUQYVYUD5VvAgmRMz9sdDO0qJYn_pPlAV5Q",
    refreshToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNjQyNzQxNDY4fQ.8mHe22G6uu6F_HB-5G8A7voUNLb5oRAuX84xlKWFUZeccsi_Y3DHMh1fC7w3uEG3UATvNc5U9PBPvF6hW1vpZw",
};

interface ArticleComponentPros {
    article: HomeType.ArticleProps;
    isObserving: boolean;
    isLast: boolean;
}

// 아마 여기 articleData는 상위 HomeSection 컴포넌트에서 가져와야 하지 않을까
const Article = ({ article, isObserving, isLast }: ArticleComponentPros) => {
    // data state
    const followingUserWhoLikesArticle =
        article.followingMemberUsernameLikedPost;
    // like state
    const [isLiked, setIsliked] = useState(article.postLikeFlag);
    const [likesCount, setLikesCount] = useState(article.postLikesCount);
    const gapText = useGapText(article.postUploadDate);
    const articleRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnView(articleRef);
    const extraArticlesCount = useAppSelector(
        ({ home }) => home.extraArticlesCount,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        const dispatchExtraArticle = async () => {
            try {
                await dispatch(
                    getExtraArticle({
                        token: token.accessToken,
                        page: extraArticlesCount + 1,
                    }),
                );
            } catch (error) {
                console.log(error);
            }
        };

        isObserving && isVisible && dispatchExtraArticle(); // 이 때 비동기 작업 및 무한 스크롤
        // isLast && isVisible && dispatchExtraArticle();
    }, [isObserving, isVisible, dispatch]);

    const dispatchPostLike = async () => {
        try {
            await dispatch(
                postLike({ token: token.accessToken, postId: article.postId }),
            ).unwrap();
        } catch (error) {
            setIsliked(false);
            setLikesCount((prev) => prev - 1);
        }
    };

    const dispatchDeleteLike = async () => {
        try {
            await dispatch(
                deleteLike({
                    token: token.accessToken,
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
        <ArticleCard as="article" ref={articleRef}>
            <ArticleHeader
                memberImageUrl={article.memberImageUrl}
                memberNickname={article.memberNickname}
            />
            <ArticleImgSlider
                imageDTOs={article.postImageDTOs}
                onLike={changeToLikeHandler}
            />
            <ArticleMainIcons
                isLiked={isLiked}
                onToggleLike={toggleLikeHandler}
            />
            <ArticleMain
                followingUserWhoLikesArticle={followingUserWhoLikesArticle}
                likesCount={likesCount}
                memberImageUrl={article.memberImageUrl}
                memberNickname={article.memberNickname}
                content={article.postContent}
                commentsCount={article.postCommentsCount}
                // comments={article.comments}
            />
            <div className="article-createdAt">{gapText}</div>
            <div className="article-form-layout">
                <CommentForm />
            </div>
        </ArticleCard>
    );
};

export default Article;
