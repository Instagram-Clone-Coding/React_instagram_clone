import UploadHeader from "components/Common/Header/Upload/UploadHeader";
import React from "react";
import styled from "styled-components";

const StyledUploadComplete = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > h2 {
        margin: 16px 0;
        font-size: 22px;
        font-weight: 300;
    }
`;
const UploadComplete = () => {
    return (
        <>
            <UploadHeader />
            <StyledUploadComplete>
                <img
                    src="https://static.cdninstagram.com/rsrc.php/v3/yU/r/b_y28Mnuau9.gif"
                    alt="게시물이 공유되었습니다"
                    width="96"
                    height="96"
                />
                <h2>게시물이 공유되었습니다</h2>
            </StyledUploadComplete>
        </>
    );
};

export default UploadComplete;
