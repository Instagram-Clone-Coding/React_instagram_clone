import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as SmileFace } from "../../../assets/Svgs/smileFace.svg";
import styled from "styled-components";
import { authorizedCustomAxios } from "customAxios";
import { useAppSelector } from "app/store/Hooks";

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
    isInLargerArticle: boolean;
}

interface CommentUploadResponseType extends AxiosType.ResponseType {
    data: { commentId: number }; // 나중에 댓글 객체로 변환할 것
}

const CommentForm = ({ postId, isInLargerArticle }: CommentFormProps) => {
    const replyParentObj = useAppSelector(
        ({ paragraph }) => paragraph.replyParentObj,
    );
    const [text, setText] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
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

    useEffect(() => {
        if (!isInLargerArticle) return;
        if (replyParentObj) {
            setText(`@${replyParentObj.username} `);
            textareaRef.current?.focus();
        } else {
            setText("");
        }
    }, [replyParentObj, isInLargerArticle]);

    const commentSubmitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        // handling submitted comment
        try {
            const { data } = await authorizedCustomAxios.post<
                null,
                CommentUploadResponseType
            >("/comments", {
                content: text,
                parentId: replyParentObj?.id || 0,
                postId,
            });
            console.log("업로드된 댓글 id:", data.commentId);
            // if (!replyParentObj?.id)
            //     return dispatch(paragraphActions.writeNewComments());
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
                ref={textareaRef}
            />
            <button type="submit" disabled={!isValid}>
                게시
            </button>
        </StyledCommentForm>
    );
};

export default CommentForm;
