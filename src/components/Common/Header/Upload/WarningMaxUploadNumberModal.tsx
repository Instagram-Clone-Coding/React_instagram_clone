import React from "react";
import styled from "styled-components";
import Button from "styles/UI/Button";
import ModalCard from "styles/UI/ModalCard";

const StyledWarningMaxUploadNumberModalInner = styled.div`
    padding: 24px;
    height: 200px;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    & > h1 {
        width: 100%;
        height: 42px;
        line-height: 42px;
        font-size: 16px;
        font-weight: ${(props) => props.theme.font.bold};
        text-align: center;
        position: absolute;
        top: 0;
        border-bottom: 1px solid ${(props) => props.theme.color.bd_gray};
    }
    & > h2 {
        font-size: 18px;
    }
    & > button {
        position: absolute;
        bottom: 14px;
        right: 14px;
        width: 20%;
        min-width: 80px;
    }
`;

interface WarningMaxUploadNumberModalProps {
    onModalOn: () => void;
    onModalOff: () => void;
    warnigContent: "images" | "tags";
}

const WarningMaxUploadNumberModal = ({
    onModalOn,
    onModalOff,
    warnigContent,
}: WarningMaxUploadNumberModalProps) => {
    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
        >
            <StyledWarningMaxUploadNumberModalInner>
                <h1>주의</h1>
                <h2>
                    {warnigContent === "images"
                        ? "사진 업로드는 최대 10개까지만 가능합니다"
                        : "각 이미지에 태그는 최대 20개까지만 가능합니다"}
                </h2>
                <Button onClick={onModalOff}>확인</Button>
            </StyledWarningMaxUploadNumberModalInner>
        </ModalCard>
    );
};

export default WarningMaxUploadNumberModal;
