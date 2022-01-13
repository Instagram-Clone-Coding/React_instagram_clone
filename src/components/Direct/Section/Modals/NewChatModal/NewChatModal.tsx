import React from "react";
import styled from "styled-components";
import Modal from "components/Common/Modal/Modal";
import NewChatModalTitle from "./NewChatModalTitle";
import NewChatSearchBar from "./NewChatSearchBar";
import NewChatFriendList from "./NewChatFriendList";

interface NewChatModalProps {
    visible: boolean;
}

const NewChatModalContainer = styled.div`

`;


const NewChatModal = ({ visible }: NewChatModalProps) => {


    return (
        <Modal visible={visible} closable={true} maskClosable={true}>
            <NewChatModalContainer>
                <NewChatModalTitle />
                <NewChatSearchBar />
                <NewChatFriendList />
            </NewChatModalContainer>
        </Modal>
    );
};

export default NewChatModal;