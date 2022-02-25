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

const SingleContent = () => {
    return (
        <SingleContentContainer>
            <img
                src="https://user-images.githubusercontent.com/69495129/155657560-916152aa-827a-4c06-85c8-1f9caacc99e2.png"
                alt="content" className="single-content" />
        </SingleContentContainer>
    );
};

export default SingleContent;