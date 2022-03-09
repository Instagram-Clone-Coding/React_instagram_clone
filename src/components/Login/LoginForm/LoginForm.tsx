import styled from "styled-components";
import ContentBox from "components/Common/ContentBox";
import Suggest from "components/Common/Suggest";
import FormLayout from "components/Login/LoginForm/FormLayout";
import Appdownload from "components/Common/AppDownload";
import { useAppDispatch } from "app/store/Hooks";
import { useEffect } from "react";
import { authAction } from "app/store/ducks/auth/authSlice";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin-top: 12px;
    justify-content: center;
    max-width: 350px;
    flex-grow: 1;
`;

const Props: UI.ContentBoxProps = {
    padding: `10px 0`,
    margin: `0 0 10px`,
};

export default function LoginForm() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(authAction.changeFormState("signIn"));
    }, []);

    return (
        <Container>
            <ContentBox padding={Props.padding} margin={Props.margin}>
                <FormLayout />
            </ContentBox>
            <ContentBox padding={Props.padding} margin={Props.margin}>
                <Suggest />
            </ContentBox>
            <Appdownload />
        </Container>
    );
}
