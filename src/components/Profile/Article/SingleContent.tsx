import React from "react";
import styled from "styled-components";

const SingleContentContainer = styled.div`
  margin-right: 30px;

  img {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 736px) {
    margin-right: 30px;

    &:last-child {
      margin-right: 0px;
    }
    img {

    }

    img:last-child {
    }
  }
`;

interface SingleContentContainer {
    post:Profile.PostType
}
const SingleContent = ({post}:SingleContentContainer) => {
    console.log(
        post
    );
    return (
        <SingleContentContainer>
            <img
                src={post.postImageUrl}
                alt="content" className="single-content" />
        </SingleContentContainer>
    );
};

export default SingleContent;