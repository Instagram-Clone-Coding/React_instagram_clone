import styled from "styled-components";
import theme from "styles/theme";

import React, { useCallback, useEffect, useState } from "react";
import AsideBody from "components/Direct/Aside/AsideBody";
import AsideHeader from "components/Direct/Aside/AsideHeader";
import SectionBody from "components/Direct/Section/SectionBody";
import SectionHeader from "components/Direct/Section/SectionHeader";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import InboxSection from "components/Direct/Section/InboxSection";
import RequestsSection from "components/Direct/Section/requestsSection";


const Direct = () => {

    const view = useAppSelector(({ direct }) => direct.view);


    // 내가 채팅 메시지를 타이핑하고 있을 때, 상대방에게 "입력 중" 표시를 표현하기 위함
    // useEffect(() => {
    //     if (message !== "") {
    //         waitForConnection(stompClient, function() {
    //             stompClient.send("/pub/messages/indicate", {}, JSON.stringify({
    //                 "senderId": userInfo?.memberId,
    //                 "roomId": selectedRoom?.chatRoomId,
    //             }));
    //         });
    //     }
    // }, [message]);


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
                return <>
                    <SectionHeader />
                    <SectionBody  />
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
