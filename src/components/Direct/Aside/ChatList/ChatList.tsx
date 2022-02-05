import ChatListItem from "./ChatListItem";
import ChatListProps from "./ChatList.type";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { selectChatItem, selectView } from "../../../../app/store/ducks/direct/DirectSlice";
import { makeRoom } from "app/store/ducks/direct/DirectThunk";
import axios from "axios";
import { useCallback } from "react";

const BASE_URL =
    "http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080";

const token = {
    accessToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0MzgxMTU3MH0._bLGXXtPlrAWXf8FVwGTGGeJSWb5S45tzqzatQQkYuUkZ0DzDiZJgi7GTgMerDhxmyms-PFTlL8HwueKqmdejg",
    refreshToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0MzgwMzIwNH0.pftOV8QO0D9gEhIyJMtdQ13u-eUHzDKR4qmLOITb44Y-YERm_OyInkovsCrw4YgnSVfNAlP52uC8Y1bfIpXgOA",
};
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
            await dispatch(makeRoom({ token: token.accessToken, username: username }));

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
