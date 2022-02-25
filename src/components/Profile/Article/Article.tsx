import React from "react";
import styled from "styled-components";
import SingleRow from "./SingleRow";


const ArticleContainer = styled.main`
  display: flex;
  flex-direction: column;
  article {
  }
  
  @media (min-width: 736px){
  }
`

function Article() {
    return (
        <ArticleContainer>
            <SingleRow/>
            <SingleRow/>
            <SingleRow/>
            <SingleRow/>
            <SingleRow/>
            <SingleRow/>
            <SingleRow/>

        </ArticleContainer>
    );
}

export default Article;