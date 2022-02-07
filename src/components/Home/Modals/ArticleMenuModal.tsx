import { homeActions } from "app/store/ducks/home/homeSlice";
import { useAppDispatch } from "app/store/Hooks";
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
        height: 48px;
        line-height: 48px;
        text-align: center;
        cursor: pointer;
        & > a {
            text-decoration: none;
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
    isFollowing: boolean;
    onUnfollow: () => void;
    onModalOn: () => void;
    onModalOff: () => void;
    onReportModalOn: () => void;
    onShareWithModalOn: () => void;
}

const DUMMY_P_ID = "CWWCI-eINvr"; // 게시물 id

const DUMMY_BASE_URL = "https://www.instagram.com"; // 원래 root url: window.location.href

const ArticleMenuModal = ({
    isFollowing,
    onUnfollow,
    onModalOn,
    onModalOff,
    onReportModalOn,
    onShareWithModalOn,
}: ArticleMenuModalProps) => {
    const dispatch = useAppDispatch();

    const copyHandler = () => {
        if (!document.queryCommandSupported("copy")) {
            return alert("복사하기가 지원되지 않는 브라우저입니다.");
        }
        const textarea = document.createElement("textarea");
        textarea.value = DUMMY_BASE_URL + "/p/" + DUMMY_P_ID;
        textarea.style.position = "fixed";
        textarea.style.top = "0";
        textarea.style.left = "0";
        // 포지션을 주지 않으면 복사 시 스크롤이 하단으로 이동

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        dispatch(homeActions.notificateIsCopied());
        setTimeout(
            () => dispatch(homeActions.closeIsCopiedNotification()),
            8500,
        );
        // notification root 작성 후 복사 여부 알려주기
        // dispatch(notificationActions.appear())
    };

    const reportClickHandler = () => {
        onModalOff();
        onReportModalOn();
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
                    onClick={reportClickHandler}
                >
                    신고
                </div>
                {isFollowing && (
                    <div
                        className="articleMenuModal-unfollow"
                        onClick={onUnfollow}
                    >
                        팔로우 취소
                    </div>
                )}
                <div>
                    <Link to={`/`}>게시물로 이동</Link>
                    {/* p, tv 등 다양해서 일단 url은 보류 */}
                </div>
                <div onClick={onShareWithModalOn}>공유 대상...</div>
                <div onClick={copyHandler}>링크 복사</div>
                <div>퍼가기</div>
                <div onClick={onModalOff}>취소</div>
            </ArticleMenuModalInner>
        </ModalCard>
    );
};

export default ArticleMenuModal;
