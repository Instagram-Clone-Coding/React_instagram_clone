import React from "react";
import styled from "styled-components";
import ChatBubble from "components/Direct/Section/ChatBubble/ChatBubble";


const ChatSectionContainer = styled.div`
  height: calc(100vh - 240px);
  overflow-y: auto;

  @media (max-width: 935px) {
    height: calc(100vh - 200px);
  }
`;
const ChatSection = () => {
    return (
        <ChatSectionContainer>
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