import React from "react";
import styled from "styled-components";

const StyledEdit = styled.div`
    display: flex;
`;

const Edit = () => {
    return (
        <StyledEdit>
            <div>캔버스</div>
            <div>필터</div>
        </StyledEdit>
    );
};

export default Edit;
