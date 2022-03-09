import SignUpForm from "components/Signup/SignUpForm";
import styled from "styled-components";
import Appdownload from "components/Common/AppDownload";
import ContentBox from "components/Common/ContentBox";
import Suggest from "components/Common/Suggest";
import { useAppSelector } from "app/store/Hooks";
import EmailConfirmForm from "./EmailConfirmForm";
import { useLocation } from "react-router-dom";

const Container = styled.div<{ pathname: string }>`
    display: flex;
    flex-direction: column;
    min-height: ${(props) => (props.pathname === "/" ? 0 : 100)}vh;
    margin-top: 12px;
    justify-content: center;
    max-width: 350px;
    flex-grow: 1;
`;

const Props: UI.ContentBoxProps = {
    padding: `10px 0`,
    margin: `0 0 10px`,
};

export default function SignUp() {
    const currentForm = useAppSelector((state) => state.auth.currentFormState);
    const { pathname } = useLocation();

    return (
        <Container pathname={pathname}>
            <ContentBox padding={Props.padding} margin={Props.margin}>
                {currentForm === "confirmEmail" ? (
                    <EmailConfirmForm />
                ) : (
                    <SignUpForm />
                )}
            </ContentBox>
            <ContentBox padding={Props.padding} margin={Props.margin}>
                <Suggest />
            </ContentBox>
            <Appdownload />
        </Container>
    );
}
