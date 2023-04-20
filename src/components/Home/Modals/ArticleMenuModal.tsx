import { modalActions } from "app/store/ducks/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import useCopy from "hooks/useCopy";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ModalCard from "styles/UI/ModalCard";

const ArticleMenuModalInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    & > div {
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 48px;
        line-height: 48px;
        text-align: center;
        cursor: pointer;
        & > a {
            text-decoration: none;
            width: 100%;
            height: 100%;
        }
    }
    & > div:not(.articleMenuModal-report) {
        border-top: ${(props) => props.theme.color.bd_gray} 1px solid;
    }
    & > .articleMenuModal-report,
    & > .articleMenuModal-unfollow {
        color: ${(props) => props.theme.font.red};
        font-weight: 700;
    }
`;

interface ArticleMenuModalProps {
    onModalOn: () => void;
    onModalOff: () => void;
    postId: number;
}

const DUMMY_BASE_URL = "https://www.instagram.com"; // 원래 root url: window.location.href

const ArticleMenuModal = ({
    onModalOn,
    onModalOff,
    postId,
}: ArticleMenuModalProps) => {
    const { isFollowing } = useAppSelector(({ modal }) => modal);
    const dispatch = useAppDispatch();
    const copyHandler = useCopy(DUMMY_BASE_URL + "/p/" + postId);

    const unFollowClickHandler = () => {
        dispatch(modalActions.changeActivatedModal("unfollowing"));
    };

    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
        >
            <ArticleMenuModalInner>
                <div
                    className="articleMenuModal-report"
                    onClick={() =>
                        dispatch(modalActions.changeActivatedModal("report"))
                    }
                >
                    신고
                </div>
                {isFollowing && (
                    <div
                        className="articleMenuModal-unfollow"
                        onClick={unFollowClickHandler}
                    >
                        팔로우 취소
                    </div>
                )}
                <div>
                    <Link to={`/p/${postId}`}>게시물로 이동</Link>
                </div>
                <div
                    onClick={() =>
                        dispatch(modalActions.changeActivatedModal("shareWith"))
                    }
                >
                    공유 대상...
                </div>
                <div onClick={copyHandler}>링크 복사</div>
                <div>퍼가기</div>
                <div onClick={onModalOff}>취소</div>
            </ArticleMenuModalInner>
        </ModalCard>
    );
};

export default ArticleMenuModal;
