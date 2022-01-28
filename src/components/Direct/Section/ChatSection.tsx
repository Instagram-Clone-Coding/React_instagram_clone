import React from "react";
import styled from "styled-components";
import ChatBubble from "components/Direct/Section/ChatBubble/ChatBubble";
import { useAppSelector } from "../../../app/store/hooks";


const ChatSectionContainer = styled.div<{ isRequestsChat: boolean }>`
  height: ${props => props.isRequestsChat ? "calc(100vh - 280px)" : "calc(100vh - 250px)"};
          
  overflow-y: auto;

  @media (max-width: 935px) {
    height: calc(100vh - 200px);
  }
`;
const ChatSection = () => {
    const { view } = useAppSelector(state => state.direct);
    return (
        <ChatSectionContainer isRequestsChat={view === "requestsChat"}>
            <ChatBubble me={true} message={"saddasdasd"} />
            <ChatBubble me={false} message={"saddasdasd"} />
            <ChatBubble me={true}
                        message={"saddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasd"} />
            <ChatBubble me={true} message={"saddasdasd"} />
            <ChatBubble me={false} message={"saddasdasd"} />
            <ChatBubble me={true} message={"saddasdasd"} />
            <ChatBubble me={false} message={"saddasdasd"} />
            <ChatBubble me={true} message={"saddasdasd"} />
            <ChatBubble me={true} message={"saddasdasd"} />
            <ChatBubble me={true} message={"saddasdasd"} />
            <ChatBubble me={true} message={"saddasdasd"} />
            <ChatBubble me={false} message={"saddasdasd"} />
            <ChatBubble me={true} message={"saddasdasd"} />
        </ChatSectionContainer>
    );
};

export default ChatSection;