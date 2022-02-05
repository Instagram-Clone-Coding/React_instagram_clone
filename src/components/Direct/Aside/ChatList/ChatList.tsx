import ChatListItem from "./ChatListItem";
import ChatListProps from "./ChatList.type";
import { useAppSelector } from "app/store/hooks";

const ChatList = ({ chatList }: ChatListProps) => {
    const { selectedChatItem } = useAppSelector((state => state.direct));

    return (
        <div>
            {chatList.map((chatListItem) => (
                <ChatListItem isSelected={selectedChatItem === chatListItem.chatRoomId} key={chatListItem.chatRoomId} {...chatListItem} />
            ))}
        </div>
    );
};

export default ChatList;
