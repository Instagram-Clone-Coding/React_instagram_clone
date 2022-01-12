import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import ChatBar from "components/Direct/Section/ChatBar";


interface SectionBodyType {
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
}

const SectionBodyContainer = styled.section`
  position: relative;
  height: calc(100% - 60px); // 이름 써져있는 header 의 높이만큼빼줍니다.
`;

const SectionBody = ({ message, setMessage }: SectionBodyType) => {
    return <SectionBodyContainer>body

        <ChatBar message={message} setMessage={setMessage} />
    </SectionBodyContainer>;
};

export default SectionBody;
