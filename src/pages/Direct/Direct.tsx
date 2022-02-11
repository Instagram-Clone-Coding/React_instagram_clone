import styled from "styled-components";
import theme from "styles/theme";

import React, { useEffect, useState } from "react";
import AsideBody from "components/Direct/Aside/AsideBody";
import AsideHeader from "components/Direct/Aside/AsideHeader";
import SectionBody from "components/Direct/Section/SectionBody";
import SectionHeader from "components/Direct/Section/SectionHeader";
import { useAppSelector } from "app/store/Hooks";
import InboxSection from "components/Direct/Section/InboxSection";
import RequestsSection from "components/Direct/Section/requestsSection";
import SockJS from "sockjs-client";
import Stomp from "stompjs";


const sockJS = new SockJS("http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080/ws-connection");
let stompClient: Stomp.Client = Stomp.over(sockJS);
stompClient.debug = (log) => {
    console.log(log);
};

const Direct = () => {

    const [message, setMessage] = useState<string>("");
    const view = useAppSelector(({ direct }) => direct.view);
    const selectedRoom = useAppSelector(state => state.direct.selectedRoom);


    // 내가 채팅 메시지를 타이핑하고 있을 때, 상대방에게 "입력 중" 표시를 표현하기 위함
    useEffect(()=>{
        if(message !== ""){
            waitForConnection(stompClient, function() {
                stompClient.send("/pub/messages/indicate", {}, JSON.stringify({
                    "senderId": 1,
                    "roomId": selectedRoom?.chatRoomId,
                }));
            });
        }
    },[message])



    // title 변경해주는 역할
    // Todo: (1) 이 부분 데이터 받아서 안 읽은 메세지 개수로 처리해줘야 합니다.
    useEffect(() => {
        document.title = "(1 ) 받은 메세지함 · Direct";
    }, []);

    const username = useAppSelector(state => state.auth.username);

    const sendMessage = () => {
        waitForConnection(stompClient, function() {
            stompClient.send("/pub/messages", {}, JSON.stringify({
                "content": message,
                "senderId": 1,
                "messageType": "TEXT",
                "roomId": selectedRoom?.chatRoomId,
            }));
        });
        setMessage("");
    };


    useEffect(() => {
        wsConnectSubscribe();
        return () => {
            // wsDisConnectUnsubscribe();
        };
    }, []);


    // 웹소켓이 연결될 때 까지 실행하는 함수
    function waitForConnection(stompClient: Stomp.Client, callback: any) {
        setTimeout(
            function() {
                // 연결되었을 때 콜백함수 실행
                if (stompClient.ws.readyState === 1) {
                    callback();
                    // 연결이 안 되었으면 재호출
                } else {
                    waitForConnection(stompClient, callback);
                }
            },
            1, // 밀리초 간격으로 실행
        );
    }


    // 웹소켓 연결, 구독
    function wsConnectSubscribe() {
        try {
            stompClient.connect(
                {},
                () => {
                    stompClient.subscribe(
                        `/sub/${username}`,
                        (data) => {
                            const newMessage = JSON.parse(data.body);
                            console.log(newMessage);
                            console.log("구독성공");
                        },
                    );
                },
            );
        } catch (error) {
            console.log(error);
        }
    }

    // 연결해제, 구독해제
    function wsDisConnectUnsubscribe() {
        try {
            stompClient.disconnect(
                () => {
                    stompClient.unsubscribe("sub-0");
                },
            );
        } catch (error) {
            console.log(error);
        }
    }

    const viewRender = () => {
        switch (view) {
            case "inbox":
                return <InboxSection />;
            case "requests":
                return <RequestsSection />;
            default:
                return <>
                    <SectionHeader />
                    <SectionBody message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </>;
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
                <section>
                    {viewRender()}
                </section>
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
