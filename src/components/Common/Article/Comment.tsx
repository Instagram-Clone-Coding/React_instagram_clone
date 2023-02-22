import PopHeart from "components/Common/PopHeart";
import Username from "components/Common/Username";
import { authorizedCustomAxios } from "customAxios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const StyledComment = styled.div`
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    & > span {
        flex: 1 1 auto;
    }
`;
interface CommentProps {
    commentObj: PostType.CommentType;
    onMouseEnter: (
        event:
            | React.MouseEvent<HTMLSpanElement>
            | React.MouseEvent<HTMLDivElement>,
    ) => void;
    onMouseLeave: () => void;
}

const Comment = ({ commentObj, onMouseEnter, onMouseLeave }: CommentProps) => {
    const [isLiked, setIsLiked] = useState(commentObj.commentLikeFlag);
    const history = useHistory();
    const commentLikeHandler = async () => {
        try {
            if (!isLiked) {
                setIsLiked(true);
                const { data } =
                    await authorizedCustomAxios.post<AxiosType.ResponseType>(
                        "/comments/like",
                        null,
                        { params: { commentId: commentObj.id } },
                    );
                if (data.status === 200) throw new Error();
            } else {
                setIsLiked(false);
                const { data } = await authorizedCustomAxios.delete(
                    "/comments/like",
                    {
                        params: { commentId: commentObj.id },
                    },
                );
                if (data.status === 200) throw new Error();
            }
        } catch (error) {
            setIsLiked((prev) => !prev);
            history.goBack();
        }
    };
    return (
        <StyledComment>
            <span>
                <Username
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    {commentObj.member.username}
                </Username>
                &nbsp;
                {commentObj.content}
            </span>
            <PopHeart
                size={17}
                isLiked={isLiked}
                onToggleLike={commentLikeHandler}
            />
        </StyledComment>
    );
};

export default Comment;
