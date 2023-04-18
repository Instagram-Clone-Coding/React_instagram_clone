import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { ReactComponent as Emoji } from "assets/Svgs/direct-emoji-icon.svg";
import styled from "styled-components";
import { authorizedCustomAxios } from "customAxios";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { paragraphActions } from "app/store/ducks/paragraph/paragraphSlice";
import { useLocation } from "react-router-dom";
import { homeActions } from "app/store/ducks/home/homeSlice";
import EmojiPicker, { IEmojiData } from "emoji-picker-react";

interface FormProps {
    lineNumber: number;
}

const StyledCommentForm = styled.form<FormProps>`
    position: relative;
    width: 100%;
    .textarea__container {
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        & > textarea {
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
        & > button {
            padding: 0;
            display: flex;
            align-items: center;
        }
        & > button:first-child {
            padding: 2px;
        }
        & > button[type="submit"] {
            color: ${(props) => props.theme.color.blue};
        }
        & > button[type="submit"]:disabled {
            opacity: 0.3;
        }
    }
    & > aside {
        position: absolute;
        bottom: 150%;
    }
`;

interface CommentFormProps {
    postId: number;
    isInLargerArticle: boolean;
}

interface CommentUploadResponseType extends AxiosType.ResponseType {
    data: { comment: PostType.CommentType };
}

const CommentForm = ({ postId, isInLargerArticle }: CommentFormProps) => {
    const location = useLocation();
    const replyParentObj = useAppSelector(
        ({ paragraph }) => paragraph.replyParentObj,
    );
    const dispatch = useAppDispatch();
    const [text, setText] = useState("");
    const [isEmojiPickerOn, setIsEmojiPickerOn] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
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

    const emojiSelectHandler = (
        event: React.MouseEvent,
        emojiObj: IEmojiData,
    ) => {
        setText((prev) => prev + emojiObj.emoji);
        setIsEmojiPickerOn(false);
    };

    const commentSubmitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        // handling submitted comment
        try {
            setIsUploading(true);
            const {
                data: {
                    data: { comment },
                },
            } = await authorizedCustomAxios.post<
                null,
                { data: CommentUploadResponseType }
            >("/comments", {
                content: text.trim(),
                parentId: replyParentObj?.id || 0,
                postId,
            });
            setText("");
            if (location.pathname === "/") {
                // home이면
                return dispatch(
                    homeActions.updateRecentComments({ comment, postId }),
                );
            }
            return dispatch(
                paragraphActions.writeNewComment({
                    comment: comment,
                    parentId: replyParentObj?.id,
                }),
            );
        } catch (error) {
            console.log(error);
        } finally {
            setIsUploading(false);
        }
    };

    const enterHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        if (event.key !== "Enter") return;
        if (event.shiftKey) {
            setText((prev) => prev + "\n");
        } else {
            isValid && commentSubmitHandler(event);
        }
    };

    return (
        <StyledCommentForm
            lineNumber={lineNumber}
            onSubmit={commentSubmitHandler}
        >
            {isEmojiPickerOn && (
                <EmojiPicker
                    pickerStyle={{ width: "80%" }}
                    onEmojiClick={emojiSelectHandler}
                />
            )}
            <div className="textarea__container">
                <button
                    onClick={() => setIsEmojiPickerOn((prev) => !prev)}
                    type="button"
                >
                    <Emoji />
                </button>
                <textarea
                    placeholder="댓글 달기..."
                    value={text}
                    onChange={commentValueHandler}
                    autoComplete={"off"}
                    ref={textareaRef}
                    onKeyDown={enterHandler}
                />
                <button type="submit" disabled={!isValid || isUploading}>
                    게시
                </button>
            </div>
        </StyledCommentForm>
    );
};

export default CommentForm;
