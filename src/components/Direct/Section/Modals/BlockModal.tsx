import React from "react";
import styled from "styled-components";
import ModalTitleContent from "components/Common/Modal/ModalContent/ModalTitleContent";
import ModalButtonContent from "components/Common/Modal/ModalContent/ModalButtonContent";
import ModalCard from "styles/UI/ModalCard";
import { useAppDispatch } from "app/store/hooks";
import { closeModal, openModal } from "app/store/ducks/direct/DirectSlice";



const BlockModalContainer = styled.div`
  padding-top: 20px;

`;


const BlockModal = () => {
    const dispatch = useAppDispatch();

    return (
        <ModalCard modalType={"withBackDrop"} onModalOn={()=>{
            dispatch(openModal("block"))
        }} onModalOff={() => {
            dispatch(closeModal());
        }}>
            <BlockModalContainer>
                <ModalTitleContent title={"개복치님을 차단하시겠어요?"} description={"상대방은 Instagram에서 회원님의 프로필, 게시물 또는 스토리를 찾을 수 없습니다. Instagram은 회원님이 차단한 사실을 상대방에게 알리지 않습니다."} />
                <ModalButtonContent actionName={"차단"} />
            </BlockModalContainer>
        </ModalCard>
    );
};

export default BlockModal;