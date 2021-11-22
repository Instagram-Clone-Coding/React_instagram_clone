import ChatListItem from "./ChatListItem";
import ChatListProps from "./ChatList.type";

const ChatList = ({ chatList }: ChatListProps) => {
    return (
        <div>
            {chatList.map((chatListItem) => (
                <ChatListItem key={chatListItem.id} {...chatListItem} />
            ))}
        </div>
    );
};

export default ChatList;
