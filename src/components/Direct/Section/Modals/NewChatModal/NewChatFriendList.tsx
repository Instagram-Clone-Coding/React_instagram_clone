import React from "react";
import styled from "styled-components";
import { dummyChatList } from "components/Direct/Aside/AsideBody";
import NewChatRecommendUser from "./NewChatRecommendUser";


const NewChatFriendListContainer = styled.div`
  height: 350px;
  overflow-y: auto;
  
  & > span{
    display: block;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    margin: 12px 16px;
  }
  .new-chat-recommend-container{
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 736px) {
    height: 80vh ;
  }
  
`

const NewChatFriendList = () => {
    return (
        <NewChatFriendListContainer>
            <span>추천</span>

            <div className="new-chat-recommend-container">
                {
                    dummyChatList.map(item => (
                        <NewChatRecommendUser key={item.chatRoomId} {...item}/>
                    ))
                }
            </div>



        </NewChatFriendListContainer>
    );
}

export default NewChatFriendList;