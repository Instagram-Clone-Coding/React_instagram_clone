import ChatList from "components/Direct/Aside/ChatList";
// 이런 식으로 type을 가져와서 제가 필요한 모듈을 가져와요
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { selectView } from "app/store/ducks/direct/DirectSlice";

// 그 다음 그 모듈 안에서 제가 export 한 타입을 가져와서 사용하는 방식입니다.

export const dummyChatList: Array<Direct.ChatItem> = [
    {
        id: 0,
        avatarImg:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150",
        memberUsername: "dlwlrma",
        "memberName": "이지금",
        lastChatDate: "2021.11.22 21:00:00",
        lastMessage: "모행",
        isImLast: true,
        isRead: true,
    },
    {
        id: 1,
        avatarImg:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150",
        memberUsername: "dlwlrma",
        "memberName": "이지금",
        lastChatDate: "2021.11.10 21:00:00",
        lastMessage: "마지막으로 ",
        isImLast: false,
        isRead: false,

    }, {
        id: 2,
        avatarImg:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150",
        memberUsername: "dlwlrma",
        "memberName": "이지금",
        lastChatDate: "2021.11.10 21:00:00",
        lastMessage: "마지막으로 상대가 보낸 메세지",
        isImLast: false,
        isRead: false,

    }, {
        id: 3,
        avatarImg:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150",
        memberUsername: "dlwlrma",
        "memberName": "이지금",
        lastChatDate: "2021.11.10 21:00:00",
        lastMessage: "마지막으로 ",
        isImLast: false,
        isRead: true,

    }, {
        id: 4,
        avatarImg:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150",
        memberUsername: "dlwlrma",
        "memberName": "이지금",
        lastChatDate: "2021.11.10 21:00:00",
        lastMessage: "마지막으로 상대가 보낸 메세지",
        isImLast: false,
        isRead: false,
    }


    // ,
    // {
    //     id: 5,
    //     avatarImg:
    //         "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150",
    //     memberUsername: "dlwlrm6a",
    //     "memberName": "이지금",
    //     lastChatDate: "2021.11.10 21:00:00",
    //     lastMessage: "마",
    //     isImLast: false,
    //     isRead: true,
    //
    // }, {
    //     id: 6,
    //     avatarImg:
    //         "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150",
    //     memberUsername: "dlw7lrma",
    //     "memberName": "이지금",
    //     lastChatDate: "2021.11.10 21:00:00",
    //     lastMessage: "마지막으로 상대가 보낸 막으로 상대가 보낸 메세지",
    //     isImLast: false,
    //     isRead: true,
    //
    // }, {
    //     id: 7,
    //     avatarImg:
    //         "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150",
    //     memberUsername: "dlwlr8ma",
    //     "memberName": "이지금",
    //     lastChatDate: "2021.11.10 21:00:00",
    //     lastMessage: "마지막으로 상대가 보낸 막으로 상대가 보낸 메세지",
    //     isImLast: false,
    //     isRead: false,
    //
    // }, {
    //     id: 8,
    //     avatarImg:
    //         "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150",
    //     memberUsername: "dlwl9rma",
    //     "memberName": "이지금",
    //     lastChatDate: "2021.11.10 21:00:00",
    //     lastMessage: "마지막으로 상대가 보낸 막으로 상대가 보낸 메세지",
    //     isImLast: false,
    //     isRead: true,
    //
    // }, {
    //     id: 9,
    //     avatarImg:
    //         "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150",
    //     memberUsername: "dlw33lrma",
    //     "memberName": "이지금",
    //     lastChatDate: "2021.11.10 21:00:00",
    //     lastMessage: "대가지",
    //     isImLast: false,
    //     isRead: true,
    //
    // }, {
    //
    //     id: 10,
    //     avatarImg:
    //         "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150",
    //     memberUsername: "dlwl6rma",
    //     "memberName": "이지금",
    //     lastChatDate: "2021.11.10 21:00:00",
    //     lastMessage: "마세지",
    //     isImLast: false,
    //     isRead: true,
    //
    // }, {
    //     id: 11,
    //     avatarImg:
    //         "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150",
    //     memberUsername: "dlwlr7ma",
    //     "memberName": "이지금",
    //     lastChatDate: "2021.11.10 21:00:00",
    //     lastMessage: "마낸 메세지",
    //     isImLast: false,
    //     isRead: true,
    //
    // }, {
    //     id: 12,
    //     avatarImg:
    //         "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150",
    //     memberUsername: "dlwlr6ma",
    //     "memberName": "이지금",
    //     lastChatDate: "2021.11.10 21:00:00",
    //     lastMessage: " 메세지",
    //     isImLast: false,
    //     isRead: true,
    //
    // }, {
    //     id: 13,
    //     avatarImg:
    //         "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=150",
    //     memberUsername: "dlwlr2ma",
    //     "memberName": "이지금",
    //     lastChatDate: "2021.11.10 21:00:00",
    //     lastMessage: "마지로지",
    //     isImLast: false,
    //     isRead: true,
    //
    // },
];


const AsideBodyContainer = styled.section`
  height: calc(100% - 60px);
  overflow-y: auto;
  min-width: 350px;
  .no-follower-message {
    display: flex;
    margin: 8px 20px;
    justify-content: space-between;
    align-items: center;

    h4 {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    }

    h5 {
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      color: #0095f6;
      cursor: pointer;
    }
  }

  .no-follower-guide {
    padding: 20px 16px;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color : #8e8e8e;
    background-color: #fafafa;
  }
  .delete-all-button{
    position: absolute;
    width: 100%;
    background-color: white;
    bottom: 0;
    right: 0;
    padding: 16px 0;
    border-top: 1px solid #dbdbdb;
    text-align: center;
    color: #ed4956;
    font-size: 14px;
    font-weight: 600;
  }
  

  @media (max-width: 936px) {
    min-width: 300px;
  }

`;

const AsideBody = () => {

    const dispatch = useAppDispatch();
    const { view } = useAppSelector((state => state.direct));


    return (
        <AsideBodyContainer>
            {/*팔로우 아닌 사람에게 온 메세지가 있다면 보여주기*/}
            {
                (view === "requests" || view === "requestsChat") ? <div className="no-follower-guide">
                        회원님이 수락하기 전까지 요청이 읽음으로 표시되지 않습니다.
                    </div> :
                    <div className="no-follower-message">
                        <h4>메시지</h4>
                        <h5 onClick={() => {
                            dispatch(selectView("requests"));
                        }}>요청 1개</h5>
                    </div>
            }
            <ChatList chatList={dummyChatList} />
            {
                (view === "requests" || view === "requestsChat") && <div className={"delete-all-button"}>
                    모두 삭제
                </div>
            }
        </AsideBodyContainer>
    );
};

export default AsideBody;
