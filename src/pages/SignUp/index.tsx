import { Footer } from "components/Login/Footer/Footer";
import SignUpForm from "components/Signup/SignUpForm";
import styled from "styled-components";
import Appdownload from "components/Common/AppDownload";
import ContentBox from "components/Common/ContentBox";
import Suggest from "components/Common/Suggest";

export default function SignUp() {
    return (
        <Container>
            <FormContainer>
                <ContentBox padding={Props.padding} margin={Props.margin}>
                    <SignUpForm />
                </ContentBox>
                <ContentBox padding={Props.padding} margin={Props.margin}>
                    <Suggest />
                </ContentBox>
                <Appdownload />
            </FormContainer>
            <Footer />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Props: Login.NewCardProps = {
    padding: `10px 0`,
    margin: `0 0 10px`,
};

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 30px;
    max-width: 350px;
    margin-bottom: 32px;
    flex-grow: 1;
`;
