import React from "react";
import styled from "styled-components";
import { ReactComponent as Emoji } from "assets/Svgs/direct-emoji-icon.svg";
import { ReactComponent as ImageUpload } from "assets/Svgs/direct-image-upload.svg";
import { ReactComponent as Heart } from "assets/Svgs/heart.svg";


const ChatBarContainer  = styled.div`
  position: absolute;
  bottom: 0;
  padding: 20px;
  width: 100%;
  
  .input-container {
    border: 1px solid rgba(var(--b6a,219,219,219),1);
    border-radius: 22px;
    min-height: 44px;
    padding-left: 11px;
    padding-right: 8px;
    display: flex;
    align-items: center;
    svg{
      margin: 8px;
    }
    textarea{
      resize: none;
      border: none;
      flex: 1;
      padding: 0 9px;
      overflow: hidden;
      height: 18px;
    }
  }
`


const  ChatBar = () => {
    return (
        <ChatBarContainer>
            <div className="input-container">
                <Emoji/>
                <textarea placeholder="메시지 입력..."  className="chat-input" >

                </textarea>
                <ImageUpload/>
                <Heart/>
            </div>
        </ChatBarContainer>
    );
}

export default ChatBar;