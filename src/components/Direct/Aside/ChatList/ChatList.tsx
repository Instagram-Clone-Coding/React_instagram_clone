import ChatListItem from "./ChatListItem";
import ChatListProps from "./ChatList.type";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { selectChatItem, selectView } from "app/store/ducks/direct/DirectSlice";
import { makeRoom } from "app/store/ducks/direct/DirectThunk";
import { useCallback } from "react";
import { authorizedCustomAxios } from "customAxios";


const ChatList = ({ chatList }: ChatListProps) => {
    const dispatch = useAppDispatch();
    const selectedChatItem = useAppSelector((state => state.direct.selectedChatItem));
    const view = useAppSelector(state => state.direct.view);

    const chatListClickHandler = useCallback(async (chatRoomId: number, username: string) => {
        // 클릭한거 읽은거였으면 읽음 처리해주는 로직 필요
        dispatch(selectChatItem(chatRoomId));
        if (view === "requests" || view === "requestsChat") {
            dispatch(selectView("requestsChat"));
        } else {
            dispatch(selectView("chat"));

            // 채팅방 클릭시 채팅방 생성 이 경우에는 기존에 목록에 있는 채팅방을 클릭하므로 실제 생성되진 않고, 기존의 Room 이 return 된다.
            await dispatch(makeRoom({ username: username }));

            // 채팅방 클릭시 채팅방조회(채팅방을 클릭하면 unseen count를 감소시키는 API) 호출

            try {
                await authorizedCustomAxios.delete(`/chat/rooms/${chatRoomId}`);
            } catch (error) {
                console.log(error);
            }

        }
    }, []);

    return (
        <div>
            {chatList.map((chatListItem) => (
                <ChatListItem chatListClickHandler={chatListClickHandler}
                              isSelected={selectedChatItem === chatListItem.chatRoomId}
                              key={chatListItem.chatRoomId} {...chatListItem} />
            ))}
        </div>
    );
};

export default ChatList;
