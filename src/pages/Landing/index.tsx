import styled from "styled-components";
import ShowingInstagram from "components/Login/InstagramSlider/ShowingInsta";
import { Footer } from "components/Login/Footer/Footer";
import { useAppSelector } from "app/store/Hooks";
import LoginForm from "components/Login/LoginForm/LoginForm";
import SignUp from "components/Signup";

const Container = styled.section`
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    .container {
        display: flex;
        justify-content: center;
        padding-bottom: 32px;
        margin: 32px auto 0;
        width: 100%;
        max-width: 935px;
        flex-grow: 1;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 12px;
        max-width: 350px;
        flex-grow: 1;
    }
`;

export default function Landing() {
    const formState = useAppSelector((state) => state.auth.currentFormState);
    const formComponent = () => {
        switch (formState) {
            case "signUp":
                return <SignUp />;
            case "confirmEmail":
                return <div>confirmEmail</div>;
            default:
                return <LoginForm />;
        }
    };

    return (
        <Container>
            <main className="container">
                <ShowingInstagram />
                <div className="form">{formComponent()}</div>
            </main>
            <Footer />
        </Container>
    );
}
