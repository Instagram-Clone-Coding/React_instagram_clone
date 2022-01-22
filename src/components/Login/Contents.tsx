import styled from "styled-components";
import { LoginForm } from "./LoginForm/LoginForm";
import { ShowingInstagram } from "./InstagramSlider/ShowingInsta";

const ContentContainer = styled.main`
    display: flex;
    justify-content: center;
    padding-bottom: 32px;
    margin: 32px auto 0;
    width: 100%;
    max-width: 935px;
`;

export function Contents() {
    return (
        <ContentContainer>
            <ShowingInstagram />
            <LoginForm />
        </ContentContainer>
    );
}
