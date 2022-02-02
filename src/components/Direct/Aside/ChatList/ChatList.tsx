import ChatListItem from "./ChatListItem";
import ChatListProps from "./ChatList.type";

const ChatList = ({ chatList }: ChatListProps) => {
    return (
        <div>
            {chatList.map((chatListItem) => (
                <ChatListItem key={chatListItem.chatRoomId} {...chatListItem} />
            ))}
        </div>
    );
};

export default ChatList;
