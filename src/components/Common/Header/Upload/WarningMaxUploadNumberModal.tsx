import React from "react";
import styled from "styled-components";
import Button from "styles/UI/Button";
import ModalCard from "styles/UI/ModalCard";

const StyledWarningMaxUploadNumberModalInner = styled.div`
    padding: 24px;
    height: 150px;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    & > h2 {
        font-size: 18px;
    }
    & > button {
        position: absolute;
        bottom: 14px;
        right: 14px;
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
                <h2>
                    {warnigContent === "images"
                        ? "사진은 최대 10개까지 업로드 가능합니다"
                        : "각 이미지에 태그는 최대 20개까지만 가능합니다"}
                </h2>
                <Button onClick={onModalOff}>확인</Button>
            </StyledWarningMaxUploadNumberModalInner>
        </ModalCard>
    );
};

export default WarningMaxUploadNumberModal;
