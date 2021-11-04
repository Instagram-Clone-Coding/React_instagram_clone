import React, { useState } from "react";
import styled from "styled-components";

const StyledCommentForm = styled.form<FormProps>`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    textarea {
        // reset
        border: none;
        overflow: auto;
        outline: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        resize: none;
        //style
        flex: 1;
        height: ${(props) =>
            props.lineNumber < 5 ? props.lineNumber * 18 : 5 * 18}px;
        background: none;
    }
    button {
        padding: 0;
        display: flex;
        align-items: center;
    }
    & > button:first-child {
        padding: 2px;
    }
    button[type="submit"] {
        color: ${(props) => props.theme.color.blue};
    }
    button[type="submit"]:disabled {
        opacity: 0.3;
    }
`;

interface FormProps {
    lineNumber: number;
}

const CommentForm = () => {
    const [text, setText] = useState("");
    const isValid = text.trim() !== "";
    const lineNumber = text.split("\n").length;
    const commentValueHandler = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const {
            target: { value },
        } = event;
        setText(value);
    };

    const commentSubmitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        // handling submitted comment
    };

    return (
        <StyledCommentForm
            lineNumber={lineNumber}
            onSubmit={commentSubmitHandler}
        >
            <button onClick={() => {}}>
                <svg
                    aria-label="이모티콘"
                    color="#262626"
                    fill="#262626"
                    height="20"
                    role="img"
                    viewBox="0 0 48 48"
                    width="20"
                >
                    <path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path>
                    <path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path>
                </svg>
            </button>
            <textarea
                placeholder="댓글 달기..."
                value={text}
                onChange={commentValueHandler}
                autoComplete={"off"}
            />
            <button type="submit" disabled={!isValid}>
                게시
            </button>
        </StyledCommentForm>
    );
};

export default CommentForm;
