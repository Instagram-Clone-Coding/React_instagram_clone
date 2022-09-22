import ImageSprite from "components/Common/ImageSprite";
import React from "react";
import styled from "styled-components";

const NoArticleContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 100px auto;
    h2 {
        font-weight: 300;
        font-size: 28px;
        line-height: 32px;
        color: #262626;
        margin: 30px;
    }
    p {
        width: 350px;
        text-align: center;
        line-height: 1.2rem;
    }
`;

interface NoArticleProps {
    imageSprite: CommonType.ImageProps;
    content: string;
    description?: string;
}
const NoArticle = ({ imageSprite, content, description }: NoArticleProps) => {
    return (
        <NoArticleContainer>
            <ImageSprite {...imageSprite} />
            <h2>{content}</h2>
            {description && <p>{description}</p>}
        </NoArticleContainer>
    );
};

export default NoArticle;
