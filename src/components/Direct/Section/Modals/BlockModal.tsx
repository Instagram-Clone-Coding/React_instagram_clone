import React from "react";
import styled from "styled-components";
import ModalTitleContent from "components/Common/Modal/ModalContent/ModalTitleContent";
import Modal from "components/Common/Modal/Modal";
import ModalButtonContent from "components/Common/Modal/ModalContent/ModalButtonContent";


interface BlokeModalProps {
    visible: boolean;
}

const BlockModalContainer = styled.div`

`;


const BlockModal = ({ visible}: BlokeModalProps) => {
    return (
        <Modal visible={visible} closable={true} maskClosable={true} >
            <BlockModalContainer>
                <ModalTitleContent title={"개복치님을 차단하시겠어요?"} description={"상대방은 Instagram에서 회원님의 프로필, 게시물 또는 스토리를 찾을 수 없습니다. Instagram은 회원님이 차단한 사실을 상대방에게 알리지 않습니다."} />
                <ModalButtonContent actionName={"차단"} />
            </BlockModalContainer>
        </Modal>
    );
};

export default BlockModal;