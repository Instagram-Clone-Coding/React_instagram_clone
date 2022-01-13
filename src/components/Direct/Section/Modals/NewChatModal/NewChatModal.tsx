import React from "react";
import styled from "styled-components";
import Modal from "components/Common/Modal/Modal";
import NewChatModalTitle from "./NewChatModalTitle";
import NewChatSearchBar from "./NewChatSearchBar";
import NewChatFriendList from "./NewChatFriendList";

interface NewChatModalProps {
    onClose: () => void;
    visible: boolean;
}

const NewChatModalContainer = styled.div`

`;


const NewChatModal = ({ onClose , visible }: NewChatModalProps) => {
    return (
        <Modal onClose={onClose} visible={visible} closable={true} maskClosable={true}>
            <NewChatModalContainer>
                <NewChatModalTitle/>
                <NewChatSearchBar/>
                <NewChatFriendList/>
            </NewChatModalContainer>
        </Modal>
    );
};

export default NewChatModal;