import React from "react";
import styled from "styled-components";
import Modal from "../../../Common/Modal/Modal";
import ModalTitleContent from "../../../Common/Modal/ModalContent/ModalTitleContent";

interface ReportModalProps {
    visible: boolean;
}

const ReportModalContainer = styled.div`
    
`;

const ReportModal = ({ visible }: ReportModalProps) => {
    return (
        <Modal visible={visible} maskClosable={true} closable={true}>
            <ReportModalContainer>
                       <div className="title">신고</div>
            </ReportModalContainer>
        </Modal>
    );
};

export default ReportModal;