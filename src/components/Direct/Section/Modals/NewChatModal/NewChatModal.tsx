import React, { useEffect } from "react";
import styled from "styled-components";
import NewChatModalTitle from "./NewChatModalTitle";
import NewChatSearchBar from "./NewChatSearchBar";
import NewChatFriendList from "./NewChatFriendList";
import ModalCard from "styles/UI/ModalCard";
import { useAppDispatch } from "app/store/Hooks";
import {
    closeModal,
    openModal,
    resetSelectNewChatUser,
} from "app/store/ducks/direct/DirectSlice";

const NewChatModalContainer = styled.div`
    padding-top: 30px;
`;

const NewChatModal = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetSelectNewChatUser());
    }, [dispatch]);

    return (
        <ModalCard
            modalType={"withBackDrop"}
            onModalOn={() => {
                dispatch(openModal("newChat"));
            }}
            onModalOff={() => {
                dispatch(closeModal());
            }}
        >
            <NewChatModalContainer>
                <NewChatModalTitle />
                <NewChatSearchBar />
                <NewChatFriendList />
            </NewChatModalContainer>
        </ModalCard>
    );
};

export default NewChatModal;
