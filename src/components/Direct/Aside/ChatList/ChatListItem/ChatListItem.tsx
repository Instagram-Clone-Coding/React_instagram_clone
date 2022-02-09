import styled from "styled-components";
import useGapText from "hooks/useGapText";
import React from "react";
import Direct from "pages/Direct";



interface ChatListItemContainerType {
    unreadFlag: boolean;
    isSelected: boolean;
}

const ChatListItemContainer = styled.a<ChatListItemContainerType>`
  display: flex;
  padding: 8px 20px;
  align-items: center;
  cursor: pointer;
  background-color: ${props => props.isSelected ? "rgb(239,239,239)" : "transparent"};


  .user-image {
    width: 56px;
    border-radius: 50%;
    margin-right: 12px;
  }

  .right-section-container {
    flex: 1;

    .user-nickName {
      font-weight: ${props => props.unreadFlag ? 400 : 600};

    }

    .last-info {
      display: flex;
      font-size: 14px;
      color: ${props => props.unreadFlag ? "#8e8e8e" : "#000"};

      .last-chat-container {
        white-space: nowrap;
        margin-right: 2px;
        max-width: 150px;
        display: inline;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: ${props => props.unreadFlag ? 400 : 600};
        @media (max-width: 936px) {
          max-width: 120px;
        }
      }

      .last-date-container {
        margin-left: 2px;
        color: #8e8e8e;
      }
    }
  }

  .blue-dot {
    width: 8px;
    height: 8px;
    background-color: #0095f6;
    border-radius: 50%;
  }

`;

interface ChatListItemProps extends Direct.ChatItem {
    isSelected: boolean;
    chatListClickHandler: (chatRoomId:number,username:string) => void
}

const ChatListItem = ({ chatRoomId, invitees, lastMessage, unreadFlag, isSelected ,chatListClickHandler}: ChatListItemProps) => {
    const calculatedTime = useGapText(lastMessage.messageDate);

    return (
        <ChatListItemContainer unreadFlag={unreadFlag} isSelected={isSelected}
                               onClick={()=>{
                                   chatListClickHandler(chatRoomId,invitees[0].username)
                               }}>
            <img src={invitees[0].imageUrl} alt="avatarImg" className="user-image" />
            <div className="right-section-container">

                <div className="user-nickName">
                    {invitees[0].username}님
                </div>

                <div className="last-info">
                    <div className="last-chat-container">
                        {lastMessage.content}
                    </div>
                    <span className={"dot"}>
                    ·
                    </span>
                    <div className="last-date-container">
                        {calculatedTime}
                    </div>

                </div>
            </div>
            {
                !unreadFlag &&
                <div className="blue-dot">
                </div>

            }
        </ChatListItemContainer>
    );
};

export default React.memo(ChatListItem);
