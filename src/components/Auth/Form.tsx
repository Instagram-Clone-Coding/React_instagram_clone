import styled from "styled-components";

import ContentBox from "components/Common/ContentBox";
import Suggest from "components/Auth/Suggest";
import EmailConfirmForm from "components/Auth/SignUpForm/EmailConfirmForm";
import SignUpForm from "components/Auth/SignUpForm/SignUpFormContent";
import LoginForm from "components/Auth/LoginForm/LoginFormContent";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "app/store/Hooks";

const Container = styled.div<{ pathname: string }>`
    display: flex;
    flex-direction: column;
    min-height: ${(props) => (props.pathname === "/" ? 0 : 100)}vh;
    margin-top: 12px;
    justify-content: center;
    max-width: 350px;
    flex-grow: 1;

    .warning-message {
        padding: 5px;
        text-align: center;
        color: red;

        .warning {
            font-weight: 700;
            margin-right: 5px;
        }

        .not-instagram {
            text-decoration: underline;
        }
    }
`;

const contentBox: UIType.ContentBoxProps = {
    padding: `10px 0`,
    margin: `0 0 10px`,
};

export default function Form(props: { router: "signIn" | "signUp" }) {
    const { pathname } = useLocation();
    const currentForm = useAppSelector((state) => state.auth.currentFormState);

    return (
        <Container pathname={pathname}>
            <ContentBox padding={contentBox.padding} margin={contentBox.margin}>
                {props.router === "signIn" ? (
                    <LoginForm />
                ) : currentForm === "confirmEmail" ? (
                    <EmailConfirmForm />
                ) : (
                    <SignUpForm />
                )}
            </ContentBox>
            <ContentBox padding={contentBox.padding} margin={contentBox.margin}>
                <Suggest />
            </ContentBox>
            <aside className="warning-message">
                <p>
                    <span className="warning">주의</span>
                    <span className="not-instagram">
                        이건 실제 인스타그램이 아닙니다.
                    </span>
                </p>
                <p>개발자들이 사이드 프로젝트로 만든 클론 페이지입니다.</p>
            </aside>
        </Container>
    );
}
