import React from "react";
import styled from "styled-components";
import Modal from "../../../Common/Modal/Modal";
import ModalTitleContent from "../../../Common/Modal/ModalContent/ModalTitleContent";

interface ReportModalProps {
    onClose: () => void;
    visible: boolean;
}

const ReportModalContainer = styled.div`

`;

const ReportModal = ({ onClose, visible }: ReportModalProps) => {
    return (
        <Modal onClose={onClose} visible={visible} maskClosable={true} closable={true}>
            <ReportModalContainer>
                       <div className="title">신고</div>
            </ReportModalContainer>
        </Modal>
    );
};

export default ReportModal;