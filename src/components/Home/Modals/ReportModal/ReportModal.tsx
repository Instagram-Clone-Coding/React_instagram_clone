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

const ReportModalInner = styled.div`
    & > * {
        border-bottom: ${(props) => props.theme.color.bd_gray} 1px solid;
    }
    & > h4 {
        margin-top: 24px;
        padding: 0 16px;
        padding-bottom: 16px;
        font-size: 16px;
        line-height: 24px;
        font-weight: ${(props) => props.theme.font.bold};
    }
    & > button {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 16px;
        font-weight: normal;
        & > span {
            flex: 1 1 auto;
            text-align: start;
        }
        & > div {
            transform: rotate(90deg);
        }
    }
`;

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
                <h4>이 게시물을 신고하는 이유</h4>
                {REPORT_REASONS.map((reason, index) => (
                    <button key={index}>
                        <span>{reason}</span>
                        <div>
                            <V />
                        </div>
                    </button>
                ))}
                <div className="loading">
                    <svg
                        aria-label="읽어들이는 중..."
                        viewBox="0 0 100 100"
                        // width="17"
                        // height="17"
                    >
                        <rect
                            fill="#555555"
                            height="6"
                            opacity="0"
                            rx="3"
                            ry="3"
                            transform="rotate(-90 50 50)"
                            width="25"
                            x="72"
                            y="47"
                        ></rect>
                        <rect
                            fill="#555555"
                            height="6"
                            opacity="0.08333333333333333"
                            rx="3"
                            ry="3"
                            transform="rotate(-60 50 50)"
                            width="25"
                            x="72"
                            y="47"
                        ></rect>
                        <rect
                            fill="#555555"
                            height="6"
                            opacity="0.16666666666666666"
                            rx="3"
                            ry="3"
                            transform="rotate(-30 50 50)"
                            width="25"
                            x="72"
                            y="47"
                        ></rect>
                        <rect
                            fill="#555555"
                            height="6"
                            opacity="0.25"
                            rx="3"
                            ry="3"
                            transform="rotate(0 50 50)"
                            width="25"
                            x="72"
                            y="47"
                        ></rect>
                        <rect
                            fill="#555555"
                            height="6"
                            opacity="0.3333333333333333"
                            rx="3"
                            ry="3"
                            transform="rotate(30 50 50)"
                            width="25"
                            x="72"
                            y="47"
                        ></rect>
                        <rect
                            fill="#555555"
                            height="6"
                            opacity="0.4166666666666667"
                            rx="3"
                            ry="3"
                            transform="rotate(60 50 50)"
                            width="25"
                            x="72"
                            y="47"
                        ></rect>
                        <rect
                            fill="#555555"
                            height="6"
                            opacity="0.5"
                            rx="3"
                            ry="3"
                            transform="rotate(90 50 50)"
                            width="25"
                            x="72"
                            y="47"
                        ></rect>
                        <rect
                            fill="#555555"
                            height="6"
                            opacity="0.5833333333333334"
                            rx="3"
                            ry="3"
                            transform="rotate(120 50 50)"
                            width="25"
                            x="72"
                            y="47"
                        ></rect>
                        <rect
                            fill="#555555"
                            height="6"
                            opacity="0.6666666666666666"
                            rx="3"
                            ry="3"
                            transform="rotate(150 50 50)"
                            width="25"
                            x="72"
                            y="47"
                        ></rect>
                        <rect
                            fill="#555555"
                            height="6"
                            opacity="0.75"
                            rx="3"
                            ry="3"
                            transform="rotate(180 50 50)"
                            width="25"
                            x="72"
                            y="47"
                        ></rect>
                        <rect
                            fill="#555555"
                            height="6"
                            opacity="0.8333333333333334"
                            rx="3"
                            ry="3"
                            transform="rotate(210 50 50)"
                            width="25"
                            x="72"
                            y="47"
                        ></rect>
                        <rect
                            fill="#555555"
                            height="6"
                            opacity="0.9166666666666666"
                            rx="3"
                            ry="3"
                            transform="rotate(240 50 50)"
                            width="25"
                            x="72"
                            y="47"
                        ></rect>
                    </svg>
                </div>
            </ReportModalInner>
        </ModalCard>
    );
};

export default ReportModal;
