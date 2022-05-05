import React from "react";
import styled from "styled-components";

const RequestsSectionContainer = styled.section`
    padding: 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
        font-weight: 300;
        font-size: 22px;
        line-height: 26px;
        margin-bottom: 10px;
    }

    div {
        text-align: center;
        color: #8e8e8e;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
    }
`;

const RequestsSection = () => {
    return (
        <RequestsSectionContainer>
            <h2>메시지 요청</h2>
            <div>
                회원님이 제한하거나 팔로우하지 않는 사람에게 받은 메시지입니다.
                회원님에게 메시지를 보낼 수 있도록 허용하지 않는 이상 상대방은
                회원님이 요청을 확인했다는 사실을 알 수 없습니다.
            </div>
        </RequestsSectionContainer>
    );
};

export default RequestsSection;
