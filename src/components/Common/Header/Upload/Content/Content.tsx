import UploadHeader from "components/Common/Header/Upload/UploadHeader";
import React from "react";
import styled from "styled-components";

const StyledContent = styled.div``;

interface ContentProps {
    currentWidth: number;
}

const Content = ({ currentWidth }: ContentProps) => {
    return (
        <>
            <UploadHeader />
            <StyledContent>Content</StyledContent>
        </>
    );
};

export default Content;
