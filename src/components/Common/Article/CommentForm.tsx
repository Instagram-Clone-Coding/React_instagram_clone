import React, { useState } from "react";
import { ReactComponent as SmileFace } from "../../../assets/Svgs/smileFace.svg";
import styled from "styled-components";
import { authorizedCustomAxios } from "customAxios";

interface FormProps {
    lineNumber: number;
}

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

interface CommentFormProps {
    postId: number;
    isReply?: boolean;
}

const CommentForm = ({ postId, isReply = false }: CommentFormProps) => {
    const [text, setText] = useState("");
    const isValid = text.trim() !== "";
    const lineNumber = text.split("\n").length;
    const commentValueHandler = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const {
            target: { value },
        } = event;
        setText(value);
    };

    const commentSubmitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        // handling submitted comment
        try {
            const { data } = await authorizedCustomAxios.post("/comments", {
                content: text,
                parentId: 0,
                postId,
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <StyledCommentForm
            lineNumber={lineNumber}
            onSubmit={commentSubmitHandler}
        >
            <button onClick={() => {}}>
                <SmileFace />
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
