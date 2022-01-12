import React from "react";
import styled from "styled-components";
import ChatBar from "components/Direct/Section/ChatBar";


const SectionBodyContainer = styled.section`
  position: relative;
  height: calc(100% - 60px); // 이름 써져있는 header 의 높이만큼빼줍니다.
`;

const SectionBody = () => {
    return <SectionBodyContainer>body

        <ChatBar />
    </SectionBodyContainer>;
};

export default SectionBody;
