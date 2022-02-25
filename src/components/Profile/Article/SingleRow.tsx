import React from "react";
import styled from "styled-components";
import SingleContent from "./SingleContent";

const SingleRowContainer = styled.div`

  display: flex;
  
  @media(min-width: 736px){
    margin-bottom: 28px;
  }
`

const SingleRow = () => {
    return (
        <SingleRowContainer>
            <SingleContent/>
            <SingleContent/>
            <SingleContent/>
        </SingleRowContainer>
    );
};

export default SingleRow;