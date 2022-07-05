import UploadHeader from "components/Common/Header/Upload/UploadHeader";
import React from "react";
import styled from "styled-components";

const StyledUploading = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Uploading = () => {
    return (
        <>
            <UploadHeader />
            <StyledUploading>
                <img
                    src="https://static.cdninstagram.com/rsrc.php/v3/yE/r/psJ2tFS95qs.gif"
                    alt="공유 중입니다."
                    width="96"
                    height="96"
                />
            </StyledUploading>
        </>
    );
};

export default Uploading;
