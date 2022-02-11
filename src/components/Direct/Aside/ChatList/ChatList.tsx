import ChatListItem from "./ChatListItem";
import ChatListProps from "./ChatList.type";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { selectChatItem, selectView } from "app/store/ducks/direct/DirectSlice";
import { lookUpChatList, lookUpChatRoom, makeRoom } from "app/store/ducks/direct/DirectThunk";
import { useCallback, useEffect } from "react";


const ChatList = ({}: ChatListProps) => {
    const dispatch = useAppDispatch();
    const selectedChatItem = useAppSelector((state => state.direct.selectedChatItem));
    const selectedRoom = useAppSelector((state => state.direct.selectedRoom));

    const view = useAppSelector(state => state.direct.view);
    const username = useAppSelector(state => state.auth.username);
    const chatList = useAppSelector(state => state.direct.chatList);
    const chatListPage = useAppSelector(state => state.direct.chatListPage);
    const dummyChatList = [
        {
            roomId:2,
            lastMessage: {
                messageId: 1,
                content: "asdasdasd",
                messageType: "TEXT",
                messageDate: "2022-02-11",
                senderId: 1,
                roomId: 2
            },
            unreadFlag:false,
            inviter:{
                username:"dlwlrma",
                name:"이지금",
                imageUrl:"http"
            },
            invitees:[
                {
                    username:"dlwlrma",
                    name:"이지금",
                    imageUrl:"http"
                },{
                    username:"dlwlrma5",
                    name:"이지금1",
                    imageUrl:"http"
                }
            ]
        }
    ]

    const chatListClickHandler = useCallback(async (roomId: number, username: string) => {
        dispatch(selectChatItem(roomId));
        if (view === "requests" || view === "requestsChat") {
            dispatch(selectView("requestsChat"));
        } else {
            dispatch(selectView("chat"));
            // 채팅방 클릭시 채팅방 생성 이 경우에는 기존에 목록에 있는 채팅방을 클릭하므로 실제 생성되진 않고, 기존의 Room 이 return 된다.
            await dispatch(makeRoom({ username: username }));

            // 채팅방 클릭시 채팅방조회(채팅방을 클릭하면 unseen count를 감소시키는 API) 호출
            await dispatch(lookUpChatRoom({ roomId }));
        }
    }, []);


    // 채팅방 목록 페이징 조회 API
    // 1. `DM 페이지 입장(새로고침)`
    // 2. `DB의 JoinRoom 테이블에 본인이 추가되는 상황`
    // - `채팅방 생성`
    // - `상대방과 참여한 채팅방이 없는 상황에서, 상대방이 본인에게 메시지 송신`
    useEffect(() => {
        dispatch(lookUpChatList({ page: chatListPage }));
    }, []);


    return (
        <div>
            {chatList.map((chatListItem, index) => (
                <ChatListItem chatListClickHandler={chatListClickHandler}
                              opponent={chatListItem.invitees.filter(invitee => {
                                  return invitee.username !== username;
                              })[0]}
                              isSelected={selectedRoom?.chatRoomId === chatListItem.roomId}
                              key={index} {...chatListItem}
                              isObserving={chatList.length-1 === index}
                />
            ))}
        </div>
    );
};

export default ChatList;
