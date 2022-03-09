import { authAction } from "app/store/ducks/auth/authSlice";
import { useAppDispatch } from "app/store/Hooks";
import Form from "components/Auth/Form";
import { Footer } from "components/Common/Footer/Footer";
import { useEffect } from "react";
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

export default function AuthPage(props: { router: "signIn" | "signUp" }) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(authAction.changeFormState(props.router));
    }, []);

    return (
        <Section>
            <main className="form-container">
                <Form router={props.router} />
            </main>
            <Footer />
        </Section>
    );
}
