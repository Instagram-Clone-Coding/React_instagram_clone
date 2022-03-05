import React from "react";
import styled from "styled-components";
import SingleRow from "./SingleRow";
import { useAppSelector } from "app/store/Hooks";

const ArticleContainer = styled.main`
  display: flex;
  flex-direction: column;

  article {
  }

  @media (min-width: 736px) {
  }
`;

function Article() {
    const posts = useAppSelector(state => state.profile.posts);


    return (
        <ArticleContainer>
            {[...Array(posts.length / 3)].map((a, index) => (
                <SingleRow key={index} posts={[posts[index * 3], posts[index * 3 + 1], posts[index * 3 + 2]]}
                           isObserving={(posts.length / 3) - 2 === index}
                />
            ))}
        </ArticleContainer>
    );
}

export default Article;