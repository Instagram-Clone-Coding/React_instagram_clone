import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import ChatBar from "components/Direct/Section/ChatBar";
import ChatSection from "components/Direct/Section/ChatSection";
import DetailSection from "./DetailSection";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";


interface SectionBodyProps {
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
}

const SectionBodyContainer = styled.section`
  position: relative;
  height: calc(100% - 60px); // 60px : 이름 써져있는 header 의 높이만큼빼줍니다. 
  overflow-y: auto;


`;

const SectionBody = ({ message, setMessage }: SectionBodyProps) => {
    const dispatch = useAppDispatch();
    const { view } = useAppSelector((state => state.direct));
    return <SectionBodyContainer>
        {
            view === "detail" ? <DetailSection /> :
                <>
                    <ChatSection />
                    <ChatBar message={message} setMessage={setMessage} />
                </>
        }
    </SectionBodyContainer>;
};

export default SectionBody;
