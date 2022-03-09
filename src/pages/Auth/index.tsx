import { Footer } from "components/Login/Footer/Footer";
import LoginForm from "components/Login/LoginForm/LoginForm";
import SignUp from "components/Signup";
import styled from "styled-components";

const Section = styled.section`
    flex-shrink: 0;
    min-height: 100vh;
    overflow: hidden;

    .form-container {
        flex-shrink: 0;
        display: flex;
        justify-content: center;
    }
`;

export default function AuthPage(props: { router: string }) {
    return (
        <Section>
            <main className="form-container">
                {props.router === "signIn" ? <LoginForm /> : <SignUp />}
            </main>
            <Footer />
        </Section>
    );
}
