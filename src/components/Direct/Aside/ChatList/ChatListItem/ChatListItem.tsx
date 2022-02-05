import styled from "styled-components";
import useGapText from "Hooks/useGapText";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { selectChatItem, selectView } from "app/store/ducks/direct/DirectSlice";
import { deleteRoom, makeRoom } from "app/store/ducks/direct/DirectThunk";
import axios from "axios";
import React from "react";
import Direct from "../../../../../pages/Direct";

const BASE_URL =
    "http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080";

const token = {
    accessToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0MzgxMTU3MH0._bLGXXtPlrAWXf8FVwGTGGeJSWb5S45tzqzatQQkYuUkZ0DzDiZJgi7GTgMerDhxmyms-PFTlL8HwueKqmdejg",
    refreshToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0MzgwMzIwNH0.pftOV8QO0D9gEhIyJMtdQ13u-eUHzDKR4qmLOITb44Y-YERm_OyInkovsCrw4YgnSVfNAlP52uC8Y1bfIpXgOA",
};

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
}

const ChatListItem = ({ chatRoomId, invitees, lastMessage, unreadFlag, isSelected }: ChatListItemProps) => {
    const calculatedTime = useGapText("2021.11.22 21:00:00");
    const dispatch = useAppDispatch();
    const view = useAppSelector(state => state.direct.view);
    const chatListClickHandler = async () => {
        // 클릭한거 읽은거였으면 읽음 처리해주는 로직 필요
        dispatch(selectChatItem(chatRoomId));
        if (view === "requests" || view === "requestsChat") {
            dispatch(selectView("requestsChat"));
        } else {
            dispatch(selectView("chat"));

            // 채팅방 클릭시 채팅방 생성 이 경우에는 기존에 목록에 있는 채팅방을 클릭하므로 실제 생성되진 않고, 기존의 Room 이 return 된다.
            await dispatch(makeRoom({ token: token.accessToken, username: invitees[0].username }));

            // 채팅방 클릭시 채팅방조회(채팅방을 클릭하면 unseen count를 감소시키는 API) 호출
            const config = {
                headers: { Authorization: `Bearer ${token.accessToken}` },
            };
            try {
                await axios.delete(`${BASE_URL}/chat/rooms/${chatRoomId}`, config);
            } catch (error) {
                console.log(error);
            }

        }
    };
    return (
        <ChatListItemContainer unreadFlag={unreadFlag} isSelected={isSelected}
                               onClick={chatListClickHandler}>
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
