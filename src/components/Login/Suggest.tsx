import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export function Suggest() {
    return (
        <SentenceContainer>
            <p>
                {MessageState.signUp[0]}
                <Link to="/accounts/emailsignup">{MessageState.signUp[1]}</Link>
            </p>
        </SentenceContainer>
    );
}

const MessageState = {
    signUp: ["계정이 없으신가요? ", "회원가입"],
    Login: ["계정이 있으신가요? ", "로그인"],
};
// 라우터로 상태 제어

const SentenceContainer = styled.div`
    font-size: 14px;
    line-height: 18px;
    margin: -3px 0 -4px;
    p {
        margin: 15px;
        a {
            text-decoration: none;
            font-weight: 600;
            color: ${(props) => props.theme.color.blue};
        }
    }
`;
