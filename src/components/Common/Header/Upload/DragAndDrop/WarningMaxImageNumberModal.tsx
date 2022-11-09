import React from "react";
import styled from "styled-components";
import Button from "styles/UI/Button";
import ModalCard from "styles/UI/ModalCard";

const StyledWarningMaxImageNumberModalInner = styled.div`
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

interface WarningMaxImageNumberModalProps {
    onModalOn: () => void;
    onModalOff: () => void;
}

const WarningMaxImageNumberModal = ({
    onModalOn,
    onModalOff,
}: WarningMaxImageNumberModalProps) => {
    return (
        <ModalCard
            modalType="withBackDrop"
            onModalOn={onModalOn}
            onModalOff={onModalOff}
        >
            <StyledWarningMaxImageNumberModalInner>
                <h2>사진은 최대 10개까지 업로드 가능합니다</h2>
                <Button onClick={onModalOff}>확인</Button>
            </StyledWarningMaxImageNumberModalInner>
        </ModalCard>
    );
};

export default WarningMaxImageNumberModal;
