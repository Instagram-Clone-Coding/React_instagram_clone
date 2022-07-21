import styled from "styled-components";
import theme from "styles/theme";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import AsideBody from "components/Direct/Aside/AsideBody";
import AsideHeader from "components/Direct/Aside/AsideHeader";
import SectionBody from "components/Direct/Section/SectionBody";
import SectionHeader from "components/Direct/Section/SectionHeader";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import InboxSection from "components/Direct/Section/InboxSection";
import RequestsSection from "components/Direct/Section/requestsSection";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {
    addTyping,
    lookUpChatRoom,
    reissueChatList,
} from "app/store/ducks/direct/DirectThunk";
import {
    addChatMessageItem,
    addSubChatCount,
    deleteChatMessageItem,
    likeChatMessageItem,
    setSelectedMessageId,
    unLikeChatMessageItem,
} from "app/store/ducks/direct/DirectSlice";

const Direct = () => {
    const view = useAppSelector(({ direct }) => direct.view);
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector((state) => state.auth.userInfo);
    const selectedRoom = useAppSelector((state) => state.direct.selectedRoom);
    const chatListPage = useAppSelector((state) => state.direct.chatListPage);
    const selectedMessageId = useAppSelector(
        (state) => state.direct.selectedMessageId,
    );
    const closeModalSelectedMessageId = useAppSelector(
        (state) => state.direct.closeModalSelectedMessageId,
    );
    const [message, setMessage] = useState<string>("");
    const client = useRef<StompJs.Client>();

    useEffect(() => {
        const connect = () => {
            client.current = new StompJs.Client({
                //  brokerURL: "ws://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080/ws-connection", // 웹소켓 서버로 직접 접속
                webSocketFactory: () =>
                    new SockJS(
                        "http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080/ws-connection",
                    ), // proxy를 통한 접속
                debug: function (str) {
                    console.log(str);
                },
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                onConnect: () => {
                    client?.current?.subscribe(
                        `/sub/${userInfo?.memberUsername}`,
                        async ({ body }) => {
                            const newMessage = JSON.parse(body);

                            switch (newMessage.action) {
                                case "MESSAGE_SEEN":
                                    // 내가 채팅 메시지를 타이핑하고 있을 때, 상대방에게 "입력 중" 표시를 표현하기 위함
                                    dispatch(addTyping(newMessage.data.roomId));
                                    break;
                                case "MESSAGE_GET":
                                    // API를 호출해서가 아닌 웹소켓을통해서 받은 메세지의 개수! 페이징 호출할때 다시 계산해서 보내줘야함
                                    dispatch(addSubChatCount());
                                    // 새롭게 온 메세지 보여주는 dispatch
                                    dispatch(addChatMessageItem(newMessage));
                                    // unseenCount 를 줄여주는 dispatch
                                    await dispatch(
                                        lookUpChatRoom({
                                            roomId: newMessage.data.roomId,
                                        }),
                                    );
                                    // 받을떄마다 unreadFlag 및 마지막 메세지 갱신을 위해서 왼쪽에 채팅방목록 다시 받아오기
                                    // 페이지는 + 안해준다
                                    await dispatch(
                                        reissueChatList(chatListPage),
                                    );
                                    break;
                                case "MESSAGE_DELETE":
                                    dispatch(
                                        deleteChatMessageItem(
                                            newMessage.data.messageId,
                                        ),
                                    );
                                    break;
                                case "MESSAGE_LIKE":
                                    // 좋아요 누른것이 바로 반영되도록 해준다.
                                    dispatch(
                                        likeChatMessageItem({
                                            messageId:
                                                newMessage.data.messageId,
                                            userInfo:
                                                userInfo as AuthType.UserInfo,
                                        }),
                                    );
                                    dispatch(setSelectedMessageId(null));
                                    break;
                                case "MESSAGE_UNLIKE":
                                    // 좋아요 취소 누른것이 바로 반영되도록 해준다.
                                    dispatch(
                                        unLikeChatMessageItem({
                                            messageId:
                                                newMessage.data.messageId,
                                            memberId: newMessage.data.member.id,
                                        }),
                                    );
                                    dispatch(setSelectedMessageId(null));
                                    break;
                            }
                        },
                    );
                },
                onStompError: (frame) => {
                    console.error(frame);
                },
            });

            client?.current?.activate();
        };
        const disconnect = () => {
            client?.current?.deactivate();
        };
        connect();
        return () => disconnect();
    }, [chatListPage, client, dispatch, userInfo]);

    // 일반적인 채팅 메세지 보내기
    const sendMessageHandler = () => {
        if (message.trim() === "") {
            return;
        }
        client?.current?.publish({
            destination: "/pub/messages",
            body: JSON.stringify({
                content: message,
                senderId: userInfo?.memberId,
                messageType: "TEXT",
                roomId: selectedRoom?.chatRoomId,
            }),
        });
        setMessage("");
    };

    //  메세지 삭제
    const deleteMessageHandler = () => {
        client?.current?.publish({
            destination: "/pub/messages/delete",
            body: JSON.stringify({
                memberId: userInfo?.memberId,
                messageId: closeModalSelectedMessageId,
            }),
        });
    };

    //  메세지 좋아요
    const likeMessageHandler = () => {
        client?.current?.publish({
            destination: "/pub/messages/like",
            body: JSON.stringify({
                memberId: userInfo?.memberId,
                messageId: selectedMessageId,
            }),
        });
    };

    //  메세지 좋아요 취소
    const unlikeMessageHandler = () => {
        client?.current?.publish({
            destination: "/pub/messages/unlike",
            body: JSON.stringify({
                memberId: userInfo?.memberId,
                messageId: selectedMessageId,
            }),
        });
    };

    // title 변경해주는 역할
    // Todo: (1) 이 부분 데이터 받아서 안 읽은 메세지 개수로 처리해줘야 합니다.
    useEffect(() => {
        document.title = "(1) 받은 메세지함 · Direct";
    }, []);

    const viewRender = () => {
        switch (view) {
            case "inbox":
                return <InboxSection />;
            case "requests":
                return <RequestsSection />;
            default:
                return (
                    <>
                        <SectionHeader />
                        <SectionBody
                            message={message}
                            setMessage={setMessage}
                            sendMessageHandler={sendMessageHandler}
                            deleteMessageHandler={deleteMessageHandler}
                            likeMessageHandler={likeMessageHandler}
                            unlikeMessageHandler={unlikeMessageHandler}
                        />
                    </>
                );
        }
    };
    const borderStyle = `1px solid ${theme.color.bd_gray}`;
    return (
        <Layout style={{ backgroundColor: theme.color.bg_gray }}>
            <Container style={{ border: borderStyle }}>
                {/* aside */}
                <aside style={{ borderRight: borderStyle }}>
                    <AsideHeader />
                    <AsideBody />
                </aside>
                {/* body */}
                <section>{viewRender()}</section>
            </Container>
        </Layout>
    );
};

export default Direct;

const Layout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: calc(100vh - 54px);
    padding: 20px;

    @media (max-width: 935px) {
        padding: 0;
    }
`;

const Container = styled.div`
    display: flex;

    width: 100%;
    height: 100%;
    max-width: 935px;
    background-color: #fff;

    aside {
        width: 350px;
        height: 100%;
        position: relative;
    }

    section {
        flex: 1 1 auto;
    }

    @media (max-width: 935px) {
        aside {
            width: 300px;
        }

        section {
        }
    }
`;
