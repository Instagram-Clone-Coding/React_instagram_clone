import styled from "styled-components";
import useGapText from "Hooks/useGapText";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { selectChatItem, selectView } from "app/store/ducks/direct/DirectSlice";


interface ChatListItemContainerType {
    isRead: boolean;
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
      font-weight: ${props => props.isRead ? 400 : 600};

    }

    .last-info {
      display: flex;
      font-size: 14px;
      color: ${props => props.isRead ? "#8e8e8e" : "#000"};

      .last-chat-container {
        white-space: nowrap;
        margin-right: 2px;
        max-width: 150px;
        display: inline;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: ${props => props.isRead ? 400 : 600};
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


const ChatListItem = ({ id, lastChatDate, avatarImg, memberName, lastMessage, isRead }: Direct.ChatItem) => {
    const calculatedTime = useGapText(lastChatDate);
    const dispatch = useAppDispatch();
    const { view } = useAppSelector(state => state.direct);
    const { selectedChatItem } = useAppSelector((state => state.direct));

    const chatListClickHandler = () => {
        // 클릭한거 읽은거였으면 읽음 처리해주는 로직 필요

        dispatch(selectChatItem(id));
        if (view === "requests" || view === "requestsChat") {
            dispatch(selectView("requestsChat"));
        } else {
            dispatch(selectView("chat"));
        }
    };

    return (
        <ChatListItemContainer isRead={isRead} isSelected={selectedChatItem === id} onClick={chatListClickHandler}>
            <img src={avatarImg} alt="avatarImg" className="user-image" />
            <div className="right-section-container">

                <div className="user-nickName">
                    {memberName}님
                </div>

                <div className="last-info">
                    <div className="last-chat-container">
                        {lastMessage}
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
                !isRead &&
                <div className="blue-dot">
                </div>

            }
        </ChatListItemContainer>
    );
};

export default ChatListItem;
