import ChatList from "./ChatList";
// 이런 식으로 type을 가져와서 제가 필요한 모듈을 가져와요
import { Direct } from "@type";
import styled from "styled-components";

// 그 다음 그 모듈 안에서 제가 export 한 타입을 가져와서 사용하는 방식입니다.

const dummyChatList: Array<Direct.ChatItem> = [
    {
        id: 0,
        avatarImg:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150",
        userName: "개복치",
        lastLoggedIn: "2021.11.22 21:00:00",
        lastMessage: "",
        isImLast: true,
    },
    {
        id: 1,
        avatarImg:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150",
        userName: "붕어빵",
        lastLoggedIn: "2021.11.10 21:00:00",
        lastMessage: "마지막으로 상대가 보낸 메세지",
        isImLast: false,
    },
];


const AsideBodyContainer = styled.section`

`

const AsideBody = () => {
    return (
        <div>
            <ChatList chatList={dummyChatList} />
        </div>
    );
};

export default AsideBody;
