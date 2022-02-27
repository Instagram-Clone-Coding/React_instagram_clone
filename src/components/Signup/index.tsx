import SignUpForm from "components/Signup/SignUpForm";
import styled from "styled-components";
import Appdownload from "components/Common/AppDownload";
import ContentBox from "components/Common/ContentBox";
import Suggest from "components/Common/Suggest";
import { useAppSelector } from "app/store/Hooks";
import EmailConfirmForm from "./EmailConfirmForm";

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;

    .formContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 30px;
        max-width: 350px;
        margin-bottom: 32px;
        flex-grow: 1;
    }
`;

const Props: Login.NewCardProps = {
    padding: `10px 0`,
    margin: `0 0 10px`,
};

export default function SignUp() {
    const currentForm = useAppSelector((state) => state.auth.currentFormState);

    return (
        <Container>
            <div className="formContainer">
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
            </div>
        </Container>
    );
}
