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
import { getExtraArticle } from "app/store/ducks/home/homThunk";

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
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0MjQxODcxMH0.a54MJzWdP3Mjs1yXG33v7ti0SpHcN7IzqfwQ9nFdVSjmhriTcFA_tc5yHFWyLA_PRCH3A_TUk0WPRQ_0dEacjw",
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
    const gapText = `${useGapText(article.postUploadDate)} 전`;
    const articleRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnView(articleRef);
    const extraArticlesCount = useAppSelector(
        ({ home }) => home.extraArticlesCount,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        const dispatchExtraArticle = async () => {
            console.log("start");
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

    const toggleLikeHandler = (): void => {
        setIsliked((prev: boolean) => !prev);
    };

    const changeToLikeHandler = (): undefined => {
        if (isLiked) return;
        setIsliked(true);
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
                likesCount={article.postLikesCount}
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
