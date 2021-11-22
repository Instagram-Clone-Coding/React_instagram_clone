import styled from "styled-components";
import ModalCard from "UI/ModalCard";
import ModalHeader from "../ModalHeader";
import { ReactComponent as V } from "../../../../assets/Svgs/v.svg";

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
                            <V />
                        </div>
                    </button>
                ))}
            </ReportModalInner>
        </ModalCard>
    );
};

export default ReportModal;
