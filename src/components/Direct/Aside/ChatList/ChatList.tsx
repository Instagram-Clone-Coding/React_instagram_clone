import ChatListItem from "./ChatListItem";
import ChatListProps from "./ChatList.type";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import {
    resetChatList,
    selectChatItem,
    selectView,
} from "app/store/ducks/direct/DirectSlice";
import {
    lookUpChatList,
    lookUpChatRoom,
    makeRoom,
    reissueChatList,
} from "app/store/ducks/direct/DirectThunk";
import { useCallback, useEffect } from "react";
import styled from "styled-components";

const ChatListContainer = styled.div``;

const ChatList = ({}: ChatListProps) => {
    const dispatch = useAppDispatch();
    const selectedRoom = useAppSelector((state) => state.direct.selectedRoom);

    const view = useAppSelector((state) => state.direct.view);
    const username = useAppSelector(
        (state) => state.auth.userInfo?.memberUsername,
    );
    const chatList = useAppSelector((state) => state.direct.chatList);
    const chatListPage = useAppSelector((state) => state.direct.chatListPage);
    const typingRoomList = useAppSelector(
        (state) => state.direct.typingRoomList,
    );

    const chatListClickHandler = useCallback(
        async (roomId: number, usernames: string[]) => {
            // 내가 이 방을 선택했다.
            dispatch(selectChatItem(roomId));
            if (view === "requests" || view === "requestsChat") {
                dispatch(selectView("requestsChat"));
            } else {
                // 채팅방 클릭시 채팅방 생성 이 경우에는 기존에 목록에 있는 채팅방을 클릭하므로 실제 생성되진 않고, 기존의 Room 이 return 된다.
                await dispatch(makeRoom({ usernames: usernames }));

                // 채팅방 클릭시 채팅방조회(채팅방을 클릭하면 unseen count를 감소시키는 API) 호출
                await dispatch(lookUpChatRoom({ roomId }));

                // 방을 선택한거 반영하려면 채팅리스트 다시 불러와야함
                await dispatch(reissueChatList(chatListPage));
            }
        },
        [],
    );

    // 채팅방 목록 페이징 조회 API
    // 1. `DM 페이지 입장(새로고침)`
    // 2. `DB의 JoinRoom 테이블에 본인이 추가되는 상황`
    // - `채팅방 생성`
    // - `상대방과 참여한 채팅방이 없는 상황에서, 상대방이 본인에게 메시지 송신`
    useEffect(() => {
        const getChatList = async () => {
            await dispatch(lookUpChatList(chatListPage));
        };
        getChatList();
        return () => {
            dispatch(resetChatList());
        };
    }, []);

    return (
        <ChatListContainer>
            {chatList.length > 0 &&
                chatList.map((chatListItem, index) => (
                    <ChatListItem
                        chatListClickHandler={chatListClickHandler}
                        opponents={chatListItem.members.filter((member) => {
                            return member.username !== username;
                        })}
                        isSelected={
                            selectedRoom?.chatRoomId === chatListItem.roomId
                        }
                        key={index}
                        {...chatListItem}
                        isObserving={chatList.length - 1 === index}
                        isTyping={
                            typingRoomList.filter(
                                (typingRoom) =>
                                    typingRoom.roomId === chatListItem.roomId,
                            ).length > 0
                        }
                    />
                ))}
        </ChatListContainer>
    );
};

export default ChatList;
