import PopHeart from "components/Common/PopHeart";
import Username from "components/Common/Username";
import React, { useState } from "react";
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
    const commentLikeHandler = () => {
        setIsLiked((prev) => !prev);
        // 백엔드 수행
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
