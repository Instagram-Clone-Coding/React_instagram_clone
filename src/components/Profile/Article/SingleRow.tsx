import React from "react";
import styled from "styled-components";
import SingleContent from "./SingleContent";

const SingleRowContainer = styled.div`

  display: flex;

  @media (min-width: 736px) {
    margin-bottom: 28px;
  }
`;

interface SingleRowProps {
    posts: Profile.PostType[];
}

const SingleRow = ({ posts }: SingleRowProps) => {
    return (
        <SingleRowContainer>
            {
                posts.map(post => (
                    <SingleContent post={post}/>
                ))
            }
        </SingleRowContainer>
    );
};

export default SingleRow;