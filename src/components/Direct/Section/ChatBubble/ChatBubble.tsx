import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useAppSelector } from "app/store/Hooks";

interface ChatBubbleProps {
    message: string;
    me: boolean;
    showDate:boolean ;
    messageDate:string;
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
  .date-section{
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #8E8E8E;
    margin: 10px 0;
  }

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


const ChatBubble = ({ me, message ,showDate,messageDate}: ChatBubbleProps) => {
    const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const renewScroll = useAppSelector(state => state.direct.renewScroll);
    useEffect(() => {
        if (renewScroll) {
            scrollRef.current?.scrollIntoView();
        }
    }, [message]);
    return (
        <ChatBubbleContainer me={me} ref={scrollRef}>
            {
                showDate && <div className={"date-section"}>{messageDate}</div>
            }
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