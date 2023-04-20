import useGapText from "hooks/useGapText";
import React from "react";
import styled from "styled-components";

interface StyledArticleGapProps {
    isAboutComment: boolean;
}

const StyledArticleGap = styled.time<StyledArticleGapProps>`
    padding-left: ${({ isAboutComment }) => (isAboutComment ? "0px" : "16px")};
    margin-right: 12px;
    margin-bottom: 16px;
    color: ${(props) => props.theme.font.gray};
    font-size: ${({ isAboutComment }) => (isAboutComment ? "12px" : "10px")};
`;

interface ArticleGapProps {
    postUploadDate: string;
    isAboutComment?: boolean;
}

const ArticleGap = ({
    postUploadDate,
    isAboutComment = false,
}: ArticleGapProps) => {
    const gapText = `${useGapText(postUploadDate)} ${
        isAboutComment ? "" : "전"
    }`;

    return (
        <StyledArticleGap isAboutComment={isAboutComment}>
            {gapText}
        </StyledArticleGap>
    );
};

export default React.memo(ArticleGap);
