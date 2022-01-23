import Loading from "components/Common/Loading";
import React from "react";
import styled from "styled-components";

const StyledExtraLoadingCircle = styled.div`
    height: 48px;
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ExtraLoadingCircle = () => {
    return (
        <StyledExtraLoadingCircle>
            <Loading size={32} />
        </StyledExtraLoadingCircle>
    );
};

export default ExtraLoadingCircle;
