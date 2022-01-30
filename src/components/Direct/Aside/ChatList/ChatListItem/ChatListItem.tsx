import styled from "styled-components";
import moment from "moment";
import "moment/locale/ko";

const Container = styled.a`
    display: flex;
    padding: 8px 20px;
    align-items: center;

    &:hover {
        background-color: rgba(var(--b3f, 250, 250, 250), 1);
    }
`;

const Avatar = styled.img`
    width: 56px;
    border-radius: 50%;
    margin-right: 12px;
`;

const ChatInfoWrapper = styled.div`
    flex: 1;
`;

const ChatInfoText = styled.p`
    font-size: 14px;
`;

const ChatSubInfo = styled(ChatInfoText)`
    margin-top: 8px;
`;

const ChatListItem = (props: Direct.ChatItem) => {
    const carculatedTime = moment(
        props.lastLoggedIn,
        "YYYY.MM.DD h:mm:ss",
    ).fromNow();

    return (
        <Container>
            <Avatar src={props.avatarImg} />
            <ChatInfoWrapper>
                <ChatInfoText>{props.userName}</ChatInfoText>
                <ChatSubInfo>{carculatedTime}</ChatSubInfo>
            </ChatInfoWrapper>
        </Container>
    );
};

export default ChatListItem;
