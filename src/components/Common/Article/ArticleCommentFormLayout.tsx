import CommentForm from "components/Common/Article/CommentForm";
import React from "react";
import styled from "styled-components";

const StyledAricleCommentFormLayout = styled.div`
    padding: 6px 16px;
    display: flex;
    align-items: center;
    border-top: 1px solid ${(props) => props.theme.color.bd_gray};
    form {
        width: 100%;
    }
`;

const ArticleCommentFormLayout = () => {
    return (
        <StyledAricleCommentFormLayout>
            <CommentForm />
        </StyledAricleCommentFormLayout>
    );
};

export default React.memo(ArticleCommentFormLayout);
