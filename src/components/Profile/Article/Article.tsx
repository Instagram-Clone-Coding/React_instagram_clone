import React from "react";
import styled from "styled-components";
import SingleRow from "./SingleRow";
import { useAppSelector } from "app/store/Hooks";
import Loading from "components/Common/Loading";
import sprite3 from "assets/Images/sprite3.png";
import sprite2 from "assets/Images/sprite2.png";
import NoArticle from "./NoArticle";

const ArticleContainer = styled.main`
    display: flex;
    flex-direction: column;

    article {
    }

    @media (min-width: 736px) {
    }
`;

const noArticleImage: CommonType.ImageProps = {
    width: 24,
    height: 24,
    position: `-252px -426px`,
    url: sprite3,
    size: `569px 521px`,
};

const noTagImage: CommonType.ImageProps = {
    width: 62,
    height: 62,
    position: `-189px -288px`,
    url: sprite2,
    size: `440px 411px`,
};
const noSaveImage: CommonType.ImageProps = {
    width: 62,
    height: 62,
    position: `-126px -288px`,
    url: sprite2,
    size: `440px 411px`,
};

function Article() {
    const posts = useAppSelector((state) => state.profile.posts);
    const isExtraPostLoading = useAppSelector(
        (state) => state.profile.isExtraPostLoading,
    );
    const currentCategory = useAppSelector(
        (state) => state.profile.currentCategory,
    );

    return (
        <ArticleContainer>
            {[...Array(Math.ceil(posts.length / 3))].map((a, index) => (
                <SingleRow
                    key={index}
                    posts={[
                        posts[index * 3],
                        posts[index * 3 + 1],
                        posts[index * 3 + 2],
                    ]}
                    isObserving={posts.length / 3 - 2 === index}
                />
            ))}
            {isExtraPostLoading && <Loading size={32} />}
            {posts.length === 0 && currentCategory === "uploaded" && (
                <NoArticle imageSprite={noArticleImage} content="게시물 없음" />
            )}
            {posts.length === 0 && currentCategory === "tagged" && (
                <NoArticle imageSprite={noTagImage} content="사진 없음" />
            )}
            {posts.length === 0 && currentCategory === "saved" && (
                <NoArticle
                    imageSprite={noSaveImage}
                    content="저장"
                    description="다시 보고 싶은 사진과 동영상을 저장하세요. 콘텐츠를 저장해도 다른 사람에게 알림이 전송되지 않으며, 저장된 콘텐츠는 회원님만 볼 수 있습니다."
                />
            )}
        </ArticleContainer>
    );
}

export default Article;
