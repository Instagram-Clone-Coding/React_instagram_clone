import React from "react";
import styled from "styled-components";
import SingleRow from "./SingleRow";
import { useAppSelector } from "app/store/Hooks";
import Loading from "components/Common/Loading";

const ArticleContainer = styled.main`
    display: flex;
    flex-direction: column;

    article {
    }

    @media (min-width: 736px) {
    }
`;

function Article() {
    const posts = useAppSelector((state) => state.profile.posts);
    const isExtraPostLoading = useAppSelector(
        (state) => state.profile.isExtraPostLoading,
    );

    return (
        <ArticleContainer>
            {[...Array(posts.length / 3)].map((a, index) => (
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
        </ArticleContainer>
    );
}

export default Article;
