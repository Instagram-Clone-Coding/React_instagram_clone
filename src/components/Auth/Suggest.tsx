import { useAppSelector } from "app/store/Hooks";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SentenceContainer = styled.div`
    font-size: 14px;
    line-height: 18px;
    margin: -3px 0 -4px;
    text-align: center;

    p {
        margin: 15px;
        a {
            text-decoration: none;
            font-weight: 600;
            color: ${(props) => props.theme.color.blue};
        }
    }
`;

const routerMessageState = {
    signin: ["계정이 없으신가요? ", "가입하기", "emailsignup"],
    emailsignup: ["계정이 있으신가요? ", "로그인", "login"],
};

export default function Suggest() {
    const formState = useAppSelector((state) => state.auth.currentFormState);
    const [question, suggest, linkRouter] =
        routerMessageState[formState === "signIn" ? "signin" : "emailsignup"];

    return (
        <SentenceContainer>
            <p>
                {question}
                <Link to={`/accounts/${linkRouter}`}>{suggest}</Link>
            </p>
        </SentenceContainer>
    );
}
