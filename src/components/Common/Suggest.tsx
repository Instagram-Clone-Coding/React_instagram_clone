import { Link } from "react-router-dom";
import styled from "styled-components";

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

const routerMessageState = {
    signin: ["계정이 없으신가요? ", "가입하기"],
    emailsignup: ["계정이 있으신가요? ", "로그인"],
};

interface Router {
    currentRouter: "signin" | "emailsignup";
}

export default function Suggest({ currentRouter }: Router) {
    const [question, suggest] = routerMessageState[currentRouter];
    const linkRouter = currentRouter === "signin" ? "emailsignup" : "signin";

    return (
        <SentenceContainer>
            <p>
                {question}
                <Link to={`/accounts/${linkRouter}`}>{suggest}</Link>
            </p>
        </SentenceContainer>
    );
}
