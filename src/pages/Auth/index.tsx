import { authAction } from "app/store/ducks/auth/authSlice";
import { useAppDispatch } from "app/store/Hooks";
import Form from "components/Auth/Form";
import { Footer } from "components/Common/Footer/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import queryString from "query-string";
import { signInUseCode } from "app/store/ducks/auth/authThunk";

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
    const { search } = useLocation();
    const { username, code } = queryString.parse(
        search,
    ) as AuthType.resetPasswordQuery;

    useEffect(() => {
        if (props.router === "signIn") {
            dispatch(signInUseCode({ username, code }));
        }
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
