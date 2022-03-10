import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import ChatBar from "components/Direct/Section/ChatBar";
import ChatSection from "components/Direct/Section/ChatSection";
import DetailSection from "./DetailSection";
import { useAppSelector } from "app/store/Hooks";
import RequestsWishContainer from "./RequestsWishContainer";
import CommonDirectModal from "./Modals/CommonDirectModal";

interface SectionBodyProps {
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
    sendMessageHandler: () => void;
    deleteMessageHandler: () => void;
    likeMessageHandler: () => void;
    unlikeMessageHandler: () => void;
}

const SectionBodyContainer = styled.section`
    position: relative;
    height: calc(
        100% - 60px
    ); // 60px : 이름 써져있는 header 의 높이만큼빼줍니다.
    overflow-y: auto;
`;

const SectionBody = ({
    message,
    setMessage,
    sendMessageHandler,
    deleteMessageHandler,
    likeMessageHandler,
    unlikeMessageHandler,
}: SectionBodyProps) => {
    const { view, modal } = useAppSelector((state) => state.direct);
    const viewRender = () => {
        switch (view) {
            case "detail":
                return <DetailSection />;
            case "chat":
                return (
                    <>
                        <ChatSection
                            deleteMessageHandler={deleteMessageHandler}
                            likeMessageHandler={likeMessageHandler}
                            unlikeMessageHandler={unlikeMessageHandler}
                        />
                        <ChatBar
                            message={message}
                            setMessage={setMessage}
                            sendMessageHandler={sendMessageHandler}
                        />
                    </>
                );
            case "requestsChat":
                return (
                    <>
                        <ChatSection
                            deleteMessageHandler={deleteMessageHandler}
                            likeMessageHandler={likeMessageHandler}
                            unlikeMessageHandler={unlikeMessageHandler}
                        />
                        <RequestsWishContainer />
                        {modal === "deleteAll" && (
                            <CommonDirectModal
                                modalType={"deleteAll"}
                                actionName={"모두 삭제"}
                                title={"모두 삭제하시겠어요?"}
                                description={"메시지 1개가 삭제됩니다."}
                            />
                        )}
                    </>
                );
            default:
                break;
        }
    };

    return <SectionBodyContainer>{viewRender()}</SectionBodyContainer>;
};

export default SectionBody;
