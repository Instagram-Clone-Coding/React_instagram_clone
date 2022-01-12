import React from "react";
import styled from "styled-components";

interface ChatBubbleProps {
    message: string;
    me: boolean;
}

interface ChatBubbleContainerType {
    me: boolean;
}

const ChatBubbleContainer = styled.div<ChatBubbleContainerType>`
  margin-top: 5px;
  padding: 0px 20px;
  padding-left: ${props => props.me ? "20px" : "50px"};
  text-align: ${props => props.me ? "right" : "left"};
  display: block;
  position: relative;

  p {
    padding: 15px;
    display: inline-block;
    max-width: 234px;
    text-align: left;
    border-radius: 16px;
    overflow-wrap: break-word;
    white-space: normal;
    background: ${props => props.me ? "rgba(var(--bb2, 239, 239, 239), 1)" : "transparent"};
    border: ${props => props.me ? "none" : `1px solid rgba(0,0,0, 0.1)`};
  }

  img {
    position: absolute;
    bottom: 0;
    left: 20px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
  }

`;


const ChatBubble = ({ me, message }: ChatBubbleProps) => {
    return (
        <ChatBubbleContainer me={me}>
            {
                !me &&
                <img src={"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150"} alt={"보낸사람"} />
            }
            <p>
                {message}
            </p>

        </ChatBubbleContainer>
    );
};

export default ChatBubble;