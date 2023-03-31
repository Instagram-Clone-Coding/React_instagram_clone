import CommentForm from "components/Common/Article/CommentForm";
import React from "react";
import styled from "styled-components";

const StyledAricleCommentFormLayout = styled.div`
    padding: 6px 16px;
    display: flex;
    align-items: center;
    border-top: 1px solid ${(props) => props.theme.color.bd_gray};
`;

interface ArticleCommentFormLayoutProps {
    postId: number;
    isInLargerArticle: boolean;
}

const ArticleCommentFormLayout = ({
    postId,
    isInLargerArticle,
}: ArticleCommentFormLayoutProps) => {
    return (
        <StyledAricleCommentFormLayout>
            <CommentForm
                postId={postId}
                isInLargerArticle={isInLargerArticle}
            />
        </StyledAricleCommentFormLayout>
    );
};

export default React.memo(ArticleCommentFormLayout);
