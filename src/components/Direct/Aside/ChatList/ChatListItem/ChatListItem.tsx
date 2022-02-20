import styled from "styled-components";
import useGapText from "hooks/useGapText";
import React, { useEffect, useRef } from "react";
import Direct from "pages/Direct";
import useOnView from "hooks/useOnView";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { lookUpChatList } from "app/store/ducks/direct/DirectThunk";


interface ChatListItemContainerType {
    unreadFlag: boolean;
    isSelected: boolean;
}

const ChatListItemContainer = styled.div<ChatListItemContainerType>`
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
      font-weight: ${props => props.unreadFlag ? 600 : 400};

    }

    .last-info {
      display: flex;
      font-size: 14px;
      color: ${props => props.unreadFlag ? "#000" : "#8e8e8e"};

      .last-chat-container {
        white-space: nowrap;
        margin-right: 2px;
        max-width: 150px;
        display: inline;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: ${props => props.unreadFlag ? 600 : 400};
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
    opponent: Direct.memberProps;
    chatListClickHandler: (chatRoomId: number, username: string) => void;
    isObserving: boolean;
    isTyping : boolean
}

const ChatListItem = ({
                          roomId,
                          lastMessage,
                          unreadFlag,
                          isSelected,
                          chatListClickHandler,
                          opponent,
                          isObserving,
                          isTyping
                      }: ChatListItemProps) => {
    const calculatedTime = useGapText(lastMessage.messageDate);
    const chatListItemRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnView(chatListItemRef);
    const dispatch = useAppDispatch();
    const chatListPage = useAppSelector(state => state.direct.chatListPage);

    useEffect(() => {
        const dispatchExtraChatList = async () => {
            try {
                await dispatch(
                    lookUpChatList({
                        page: chatListPage,
                        pageUp:true
                    }),
                );
            } catch (error) {
                console.log(error);
            }
        };
        isObserving && isVisible && dispatchExtraChatList(); // 이 때 비동기 작업 및 무한 스크롤
    }, [isObserving, isVisible, dispatch]);

    return (
        <ChatListItemContainer ref={chatListItemRef} unreadFlag={unreadFlag} isSelected={isSelected}
                               onClick={() => {
                                   chatListClickHandler(roomId, opponent.username);
                               }}>
            <img src={opponent.imageUrl} alt="avatarImg" className="user-image" />
            <div className="right-section-container">

                <div className="user-nickName">
                    {opponent.username}님
                </div>

                <div className="last-info">
                    <div className="last-chat-container">
                         {isTyping ? "입력 중..." : lastMessage.content }
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
                unreadFlag &&
                <div className="blue-dot">
                </div>

            }
        </ChatListItemContainer>
    );
};

export default React.memo(ChatListItem);
