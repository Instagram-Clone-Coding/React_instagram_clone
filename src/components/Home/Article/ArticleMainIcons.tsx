import PopHeart from "components/Common/PopHeart";
import { useState } from "react";
import { ReactComponent as CommentBubble } from "../../../assets/Svgs/commentBubble.svg";
import { ReactComponent as PaperAirplane } from "../../../assets/Svgs/paperAirplane.svg";
import { ReactComponent as EmptyBookmark } from "../../../assets/Svgs/emptyBookmark.svg";
import { ReactComponent as FilledBookmark } from "../../../assets/Svgs/filledBookmark.svg";
import styled from "styled-components";

const StyledMainIcons = styled.div`
    display: flex;
    z-index: 101;
    padding: 6px 16px 8px 16px;
    margin-top: 2px;
    margin-left: -8px;
    .heart,
    .comment,
    .share,
    .save {
        width: 26px;
        height: 22px;
        display: flex;
        justify-content: center;
        cursor: pointer;
        svg {
            width: 24px;
            height: 20px;
        }
    }
    .comment:hover,
    .share:hover,
    .save:hover {
        opacity: 0.6;
    }

    .save {
        margin-right: -10px;
        margin-left: auto;
    }
`;

interface likePropsType {
    isLiked: boolean;
    onToggleLike: () => void;
}

const ArticleMainIcons = ({ isLiked, onToggleLike }: likePropsType) => {
    const [isSaved, setIsSaved] = useState(false);
    // 로그인 된 유저의 saved articles에 이 document id가 있는 지 확인하여 결정
    const toggleSave = () => {
        setIsSaved((prev) => !prev);
    };

    return (
        <StyledMainIcons>
            <PopHeart
                className={"heart"}
                size={24}
                isLiked={isLiked}
                onToggleLike={onToggleLike}
            />
            <div className="comment">
                {/* <Link to={`/p/${document.id}`} className="comment"> */}
                <CommentBubble />
            </div>
            <div className="share">
                <PaperAirplane />
            </div>
            <div onClick={toggleSave} className="save">
                {isSaved ? <FilledBookmark /> : <EmptyBookmark />}
            </div>
        </StyledMainIcons>
    );
};

export default ArticleMainIcons;
