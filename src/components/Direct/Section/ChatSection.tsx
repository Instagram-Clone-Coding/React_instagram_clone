import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChatBubble from "components/Direct/Section/ChatBubble/ChatBubble";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { lookUpChatMessageList } from "app/store/ducks/direct/DirectThunk";
import {
    closeModal,
    openModal,
    resetChatMessageList,
    resetChatMessagePage,
    resetSubChatCount,
} from "app/store/ducks/direct/DirectSlice";
import ExtraLoadingCircle from "../../Home/ExtraLoadingCircle";
import moment from "moment";
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import "moment/locale/ko";
import CommonDirectModal from "./Modals/CommonDirectModal";
import LikedMemberModal from "./Modals/LikedMemberModal";

const ChatSectionContainer = styled.div<{
    isRequestsChat: boolean;
    messageScrollable: boolean;
}>`
    height: ${(props) =>
        props.isRequestsChat ? "calc(100vh - 280px)" : "calc(100vh - 250px)"};
    overflow-y: scroll;
    position: relative;

    .chat-bubble-section {
        //스크롤 때문에 처리해줘야한다.. 특정 height 를 안먹으면 스크롤이 안생긴다..
        // 그리고 채팅이 얼마없을때는 아래서부터 나오는거 구현하려고 한거임
        // 특정height 넘어야지 스크롤가능함
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        height: 100%;
        width: 100%;
    }

    .dummy-rect {
        height: 400px;
    }

    @media (max-width: 935px) {
        height: calc(100vh - 200px);
    }
`;

interface ChatSectionProps {
    deleteMessageHandler: () => void;
    likeMessageHandler: () => void;
    unlikeMessageHandler: () => void;
}

const ChatSection = ({
    deleteMessageHandler,
    likeMessageHandler,
    unlikeMessageHandler,
}: ChatSectionProps) => {
    const dispatch = useAppDispatch();
    const selectedRoom = useAppSelector((state) => state.direct.selectedRoom);
    const chatMessageList = useAppSelector(
        (state) => state.direct.chatMessageList,
    );
    const chatMessageListPage = useAppSelector(
        (state) => state.direct.chatMessageListPage,
    );
    const messageScrollable = useAppSelector(
        (state) => state.direct.messageScrollable,
    );
    const isLoading = useAppSelector((state) => state.direct.isLoading);
    const userInfo = useAppSelector((state) => state.auth.userInfo);

    const sectionRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const scrollCheckRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const [y, setY] = useState(0);
    const [scrollDirection, setScrollDirection] = useState(
        "you have not scrolled yet",
    );

    useEffect(() => {
        if (chatMessageList.length === 10) {
            sectionRef.current.scrollTop = sectionRef.current.scrollHeight;
        }
    }, [chatMessageList]);

    // 방이 바뀐거처리 해주는 useEffect 입니다.
    useEffect(() => {
        // 처음에 클릭하면 스크롤바 가장 아래로 보여줘야함 최신의 메시지를

        if (selectedRoom) {
            // 메세지를 불러오는 페이지도 처음엔 리셋해줘야한다
            dispatch(resetChatMessagePage());

            // 첫페이지를 불러옵니다. 처음에 10개
            dispatch(
                lookUpChatMessageList({
                    page: 1,
                    roomId: selectedRoom?.chatRoomId,
                }),
            );

            // 웹소켓으로 조회해버린 메세지의 개수도 0개로 리셋해줍니다.
            dispatch(resetSubChatCount());
        }
        return () => {
            dispatch(resetChatMessageList());
        };
    }, [dispatch, selectedRoom, selectedRoom?.chatRoomId]);

    // chatsection 에서 상단의 비행기 모양을 누르면 inbox view 로 바뀝니다. 그때 왼쪽 채팅방 리스트가 클릭되어있으면 안되기때문에
    // seletedRoom 을 null 로 바꿔줘서 아무것도 클릭 안한 상태를 만들어줘야합니다다

    const handleScroll = useCallback(
        async (e) => {
            if (y > sectionRef.current.scrollTop) {
                setScrollDirection("up");
            } else if (y < sectionRef.current.scrollTop) {
                setScrollDirection("down");
            }
            setY(sectionRef.current.scrollTop);

            const { scrollTop } = sectionRef.current;
            // 현재 스크롤바의 위치        console.log(scroll);
            if (
                scrollDirection === "up" &&
                messageScrollable &&
                scrollTop === 0
            ) {
                await dispatch(
                    lookUpChatMessageList({
                        page: chatMessageListPage,
                        roomId: selectedRoom?.chatRoomId as number,
                    }),
                );
                sectionRef.current.scrollTo(0, 300);
            }
        },
        [
            y,
            scrollDirection,
            messageScrollable,
            dispatch,
            chatMessageListPage,
            selectedRoom?.chatRoomId,
        ],
    );

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, true);
        // 스크롤이 발생할때마다 handleScroll 함수를 호출하도록 추가합니다.

        return () => {
            window.removeEventListener("scroll", handleScroll, true);
            // 해당 컴포넌트가 언마운트 될때, 스크롤 이벤트를 제거합니다.
        };
    }, [handleScroll]);

    const { view } = useAppSelector((state) => state.direct);
    const modal = useAppSelector((state) => state.direct.modal);

    return (
        <ChatSectionContainer
            ref={sectionRef}
            messageScrollable={messageScrollable}
            isRequestsChat={view === "requestsChat"}
        >
            {isLoading && <ExtraLoadingCircle />}
            {chatMessageListPage === 2 && <div className="dummy-rect"></div>}

            <div className="chat-bubble-section" ref={scrollCheckRef}>
                {[...chatMessageList].map((chatMessageListItem, index) => (
                    <ChatBubble
                        key={index}
                        showDate={
                            index === 0
                                ? true
                                : index >= 1 &&
                                  Math.abs(
                                      moment(
                                          chatMessageList[index - 1]
                                              .messageDate,
                                      ).diff(
                                          moment(
                                              chatMessageListItem.messageDate,
                                          ),
                                          "minute",
                                      ),
                                  ) > 10
                        }
                        me={
                            userInfo?.memberId === chatMessageListItem.sender.id
                        }
                        {...chatMessageListItem}
                        likeMessageHandler={likeMessageHandler}
                        unlikeMessageHandler={unlikeMessageHandler}
                    />
                ))}
            </div>

            {/*under this point is modal section*/}
            {modal === "deleteChatMessage" && (
                <CommonDirectModal
                    modalType={"deleteChatMessage"}
                    title={"메시지 전송을 취소하시겠어요?"}
                    description={
                        "메시지 보내기를 취소하면 모든 사람에게 보낸 메시지가 삭제됩니다. 사람들이 이미 메시지를 확인했을 수 있습니다."
                    }
                    actionName={"전송 취소"}
                    actionHandler={deleteMessageHandler}
                />
            )}

            {modal === "likedMember" && (
                <LikedMemberModal
                    onModalOn={() => {
                        dispatch(openModal("likedMember"));
                    }}
                    onModalOff={() => dispatch(closeModal())}
                />
            )}
        </ChatSectionContainer>
    );
};

export default ChatSection;
