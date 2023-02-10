import PopHeart from "components/Common/PopHeart";
import { memo, useState } from "react";
import { ReactComponent as CommentBubble } from "assets/Svgs/commentBubble.svg";
import { ReactComponent as PaperAirplane } from "assets/Svgs/paperAirplane.svg";
import { ReactComponent as EmptyBookmark } from "assets/Svgs/emptyBookmark.svg";
import { ReactComponent as FilledBookmark } from "assets/Svgs/filledBookmark.svg";
import styled from "styled-components";
import { useAppDispatch } from "app/store/Hooks";
import {
    deleteSaveArticle,
    postSaveArticle,
} from "app/store/ducks/Article/articleThunk";

const StyledMainIcons = styled.div`
    display: flex;
    border-top: 1px solid ${(props) => props.theme.color.bd_gray};
    padding: 6px 16px 8px 8px;
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

    .save.saved:hover {
        opacity: 1;
    }
`;

interface likePropsType {
    isLiked: boolean;
    isBookmarked: boolean;
    postId: number;
    onToggleLike: () => void;
}

const ArticleMainIcons = ({
    isLiked,
    isBookmarked,
    postId,
    onToggleLike,
}: likePropsType) => {
    const [isSaved, setIsSaved] = useState(isBookmarked);
    const dispatch = useAppDispatch();
    // 로그인 된 유저의 saved articles에 이 document id가 있는 지 확인하여 결정
    const saveArticle = async () => {
        try {
            setIsSaved(true);
            await dispatch(postSaveArticle({ postId })).unwrap();
        } catch (error) {
            setIsSaved(false);
        }
    };

    const cancelSavedArticle = async () => {
        try {
            setIsSaved(false);
            await dispatch(deleteSaveArticle({ postId })).unwrap();
        } catch (error) {
            setIsSaved(true);
        }
    };
    const saveClickHandler = () => {
        isSaved ? cancelSavedArticle() : saveArticle();
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
            <div
                onClick={saveClickHandler}
                className={`save ${isSaved ? "saved" : ""}`}
            >
                {isSaved ? <FilledBookmark /> : <EmptyBookmark />}
            </div>
        </StyledMainIcons>
    );
};

export default memo(ArticleMainIcons);
