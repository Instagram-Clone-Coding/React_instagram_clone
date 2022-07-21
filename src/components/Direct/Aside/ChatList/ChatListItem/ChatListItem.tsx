import { lookUpChatList } from "app/store/ducks/direct/DirectThunk";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import useGapText from "hooks/useGapText";
import useOnView from "hooks/useOnView";
import Direct from "pages/Direct";
import React, { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

interface ChatListItemContainerType {
    unreadFlag: boolean;
    isSelected: boolean;
}

const ChatListItemContainer = styled.div<ChatListItemContainerType>`
    display: flex;
    padding: 8px 20px;
    align-items: center;
    cursor: pointer;
    background-color: ${(props) =>
        props.isSelected ? "rgb(239,239,239)" : "transparent"};

    // 갠톡
    .user-image {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        margin-right: 12px;
    }

    // 단톡
    .group-user-image-container {
        position: relative;
        width: 68px;
        height: 56px;
        img {
            position: absolute;
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        .first {
            top: 0;
            left: 0;
        }
        .second {
            bottom: 3px;
            right: 10px;
        }
    }

    .right-section-container {
        flex: 1;

        .user-nickName {
            font-weight: ${(props) => (props.unreadFlag ? 600 : 400)};
        }

        .last-info {
            display: flex;
            font-size: 14px;
            color: ${(props) => (props.unreadFlag ? "#000" : "#8e8e8e")};

            .last-chat-container {
                white-space: nowrap;
                margin-right: 2px;
                max-width: 150px;
                display: inline;
                overflow: hidden;
                text-overflow: ellipsis;
                font-weight: ${(props) => (props.unreadFlag ? 600 : 400)};
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
    opponents: Direct.memberProps[];
    chatListClickHandler: (chatRoomId: number, usernames: string[]) => void;
    isObserving: boolean;
    isTyping: boolean;
}

const ChatListItem = ({
    roomId,
    lastMessage,
    unreadFlag,
    isSelected,
    chatListClickHandler,
    opponents,
    isObserving,
    isTyping,
}: ChatListItemProps) => {
    const calculatedTime = useGapText(lastMessage?.messageDate);
    const chatListItemRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnView(chatListItemRef);
    const dispatch = useAppDispatch();
    const chatListPage = useAppSelector((state) => state.direct.chatListPage);

    useEffect(() => {
        const dispatchExtraChatList = async () => {
            try {
                await dispatch(lookUpChatList(chatListPage));
            } catch (error) {
                console.log(error);
            }
        };
        false && isObserving && isVisible && dispatchExtraChatList(); // 이 때 비동기 작업 및 무한 스크롤
    }, [isObserving, isVisible, dispatch, chatListPage]);

    const isGroupChat = useMemo(() => opponents.length > 1, [opponents.length]);

    return (
        <ChatListItemContainer
            ref={chatListItemRef}
            unreadFlag={unreadFlag}
            isSelected={isSelected}
            onClick={() => {
                chatListClickHandler(
                    roomId,
                    opponents.map((opponent) => opponent.username),
                );
            }}
        >
            {isGroupChat ? (
                <div className="group-user-image-container">
                    <img
                        src={opponents[0].imageUrl}
                        alt="avatarImg"
                        className="first"
                    />
                    <img
                        src={opponents[1].imageUrl}
                        alt="avatarImg"
                        className="second"
                    />
                </div>
            ) : (
                <img
                    src={opponents[0].imageUrl}
                    alt="avatarImg"
                    className="user-image"
                />
            )}
            <div className="right-section-container">
                <div className="user-nickName">
                    {/* 1:1 대화일때랑 단톡일때 구분 */}
                    {isGroupChat
                        ? opponents
                              .map((opponent) => opponent.username)
                              .join(",")
                        : opponents[0].username + " 님"}
                </div>

                <div className="last-info">
                    <div className="last-chat-container">
                        {lastMessage?.messageType === "TEXT"
                            ? lastMessage?.content
                            : "사진"}
                    </div>
                    <span className={"dot"}>·</span>
                    <div className="last-date-container">{calculatedTime}</div>
                </div>
            </div>
            {unreadFlag && <div className="blue-dot"></div>}
        </ChatListItemContainer>
    );
};

export default React.memo(ChatListItem);
