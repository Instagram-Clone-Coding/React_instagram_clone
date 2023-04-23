import styled from "styled-components";
import ShowingInstagram from "components/Auth/InstagramImageSlider";
import { useAppSelector } from "app/store/Hooks";
import Form from "components/Auth/Form";

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

    return (
        <Container>
            <main className="container">
                <ShowingInstagram />
                <div className="form">
                    <Form
                        router={formState === "signIn" ? "signIn" : "signUp"}
                    />
                </div>
            </main>
        </Container>
    );
}
