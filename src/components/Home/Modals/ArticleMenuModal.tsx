import useCopy from "Hooks/useCopy";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ModalCard from "UI/ModalCard";

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
    const copyHandler = useCopy(DUMMY_BASE_URL + "/p/" + DUMMY_P_ID);

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
