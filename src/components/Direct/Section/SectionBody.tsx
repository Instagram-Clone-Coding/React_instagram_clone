import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import ChatBar from "components/Direct/Section/ChatBar";
import ChatSection from "components/Direct/Section/ChatSection";
import DetailSection from "./DetailSection";


interface SectionBodyProps {
    currentSectionView: Direct.currentSectionViewType;
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
}

const SectionBodyContainer = styled.section`
  position: relative;
  height: calc(100% - 60px); // 60px : 이름 써져있는 header 의 높이만큼빼줍니다. 
  overflow-y: auto;


`;

const SectionBody = ({ currentSectionView, message, setMessage }: SectionBodyProps) => {
    return <SectionBodyContainer>
        {
            currentSectionView === "detail" ? <DetailSection /> :

                <>
                    <ChatSection />
                    <ChatBar message={message} setMessage={setMessage} />
                </>
        }
    </SectionBodyContainer>;
};

export default SectionBody;
