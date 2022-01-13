import React from "react";
import styled from "styled-components";
import ModalTitleContent from "components/Common/Modal/ModalContent/ModalTitleContent";
import Modal from "components/Common/Modal/Modal";
import ModalButtonContent from "components/Common/Modal/ModalContent/ModalButtonContent";


interface DeleteChatModalProps {
    visible: boolean;
}

const DeleteChatModalContainer = styled.div`

`;


const DeleteChatModal = ({ visible }: DeleteChatModalProps) => {
    return (
        <Modal visible={visible} closable={true} maskClosable={true}>
            <DeleteChatModalContainer>
                <ModalTitleContent title={"채팅을 삭제하시겠어요?"}
                                   description={"삭제하면 회원님의 받은 메시지함에서 채팅이 삭제됩니다. 다른 사람의 받은 메시지함에는 계속 표시됩니다."} />
                <ModalButtonContent actionName={"삭제"} />
            </DeleteChatModalContainer>
        </Modal>
    );
};

export default DeleteChatModal;