import React, { useEffect } from "react";
import styled from "styled-components";
import ChatBubble from "components/Direct/Section/ChatBubble/ChatBubble";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { lookUpChatMessageList } from "app/store/ducks/direct/DirectThunk";
import { resetChatMessageList } from "app/store/ducks/direct/DirectSlice";


const ChatSectionContainer = styled.div<{ isRequestsChat: boolean }>`
  height: ${props => props.isRequestsChat ? "calc(100vh - 280px)" : "calc(100vh - 250px)"};

  overflow-y: auto;

  @media (max-width: 935px) {
    height: calc(100vh - 200px);
  }
`;
const ChatSection = () => {

    const dispatch = useAppDispatch();
    const selectedRoom = useAppSelector(state => state.direct.selectedRoom);
    const chatMessageList = useAppSelector(state => state.direct.chatMessageList);
    const userInfo = useAppSelector(state => state.auth.userInfo)

    useEffect(() => {
        if (selectedRoom) {
            dispatch(lookUpChatMessageList({ page: 1, roomId: selectedRoom?.chatRoomId }));
        }
        return () => {
             dispatch(resetChatMessageList())
        }
    }, [selectedRoom]);


    const { view } = useAppSelector(state => state.direct);
    return (
        <ChatSectionContainer isRequestsChat={view === "requestsChat"}>
            {[...chatMessageList].map(chatMessageList => (
                <ChatBubble message={chatMessageList.content} me={userInfo?.memberId === chatMessageList.senderId} />
            ))
            }
        </ChatSectionContainer>
    );
};

export default ChatSection;