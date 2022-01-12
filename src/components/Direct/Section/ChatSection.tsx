import React from "react";
import styled from "styled-components";
import SenderChatBubble from "components/Direct/Section/ChatBubble/SenderChatBubble";


const ChatSectionContainer = styled.div`
  border-bottom: 1px solid pink;
  height: calc(100vh - 200px);
  overflow-y: auto;
`;
const ChatSection = () => {
    return (
        <ChatSectionContainer>
            <SenderChatBubble me={true} message={"saddasdasd"} />
            <SenderChatBubble me={false} message={"saddasdasd"} />
            <SenderChatBubble me={true}
                              message={"saddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasdsaddasdasd"} />
            <SenderChatBubble me={true} message={"saddasdasd"} />
            <SenderChatBubble me={false} message={"saddasdasd"} />

        </ChatSectionContainer>
    );
};

export default ChatSection;