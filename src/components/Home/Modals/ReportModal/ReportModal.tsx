import styled from "styled-components";
import ModalCard from "UI/ModalCard";
import ModalHeader from "../ModalHeader";

const REPORT_REASONS = [
    "스팸",
    "나체 이미지 또는 성적 행위",
    "혐오 발언 또는 상징",
    "폭력 또는 위험한 단체",
    "불법 또는 규제 상품 판매",
    "따돌림 또는 괴롭힘",
    "지적 재산권 침해",
    "자살 또는 자해",
    "섭식 장애",
    "사기 또는 거짓",
    "거짓 정보",
    "마음에 들지 않습니다",
];

const ReportModalInner = styled.div``;

interface ReportModalProps {
    onModalOn: () => void;
    onModalOff: () => void;
}

const ReportModal = ({ onModalOn, onModalOff }: ReportModalProps) => {
    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
        >
            <ReportModalInner>
                <ModalHeader title="신고" onModalOff={onModalOff} />
                <h2>이 게시물을 신고하는 이유</h2>
                {REPORT_REASONS.map((reason, index) => (
                    <button key={index}>
                        <span>{reason}</span>
                        <div>
                            <svg
                                aria-label="V자형 아이콘"
                                color="#c7c7c7"
                                fill="#c7c7c7"
                                height="17"
                                role="img"
                                viewBox="0 0 48 48"
                                width="17"
                            >
                                <path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path>
                            </svg>
                        </div>
                    </button>
                ))}
            </ReportModalInner>
        </ModalCard>
    );
};

export default ReportModal;
