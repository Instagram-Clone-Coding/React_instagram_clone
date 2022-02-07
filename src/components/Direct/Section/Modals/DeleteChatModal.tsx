import React from "react";
import styled from "styled-components";
import ModalTitleContent from "components/Common/Modal/ModalContent/ModalTitleContent";
import ModalButtonContent from "components/Common/Modal/ModalContent/ModalButtonContent";
import ModalCard from "styles/UI/ModalCard";
import { closeModal, openModal } from "app/store/ducks/direct/DirectSlice";
import { useAppDispatch } from "app/store/Hooks";

const DeleteChatModalContainer = styled.div`
    padding-top: 20px;
`;

const DeleteChatModal = () => {
    const dispatch = useAppDispatch();
    return (
        <ModalCard
            modalType={"withBackDrop"}
            onModalOn={() => {
                dispatch(openModal("deleteChat"));
            }}
            onModalOff={() => {
                dispatch(closeModal());
            }}
        >
            <DeleteChatModalContainer>
                <ModalTitleContent
                    title={"채팅을 삭제하시겠어요?"}
                    description={
                        "삭제하면 회원님의 받은 메시지함에서 채팅이 삭제됩니다. 다른 사람의 받은 메시지함에는 계속 표시됩니다."
                    }
                />
                <ModalButtonContent actionName={"삭제"} />
            </DeleteChatModalContainer>
        </ModalCard>
    );
};

export default DeleteChatModal;
