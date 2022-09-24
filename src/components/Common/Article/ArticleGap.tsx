import useGapText from "hooks/useGapText";
import React from "react";
import styled from "styled-components";

const StyledArticleGap = styled.div`
    padding-left: 16px;
    margin-bottom: 16px;
    color: ${(props) => props.theme.font.gray};
    font-size: 10px;
`;

interface ArticleGapProps {
    postUploadDate: string;
}

const ArticleGap = ({ postUploadDate }: ArticleGapProps) => {
    const gapText = `${useGapText(postUploadDate)} 전`;

    return <StyledArticleGap>{gapText}</StyledArticleGap>;
};

export default React.memo(ArticleGap);
