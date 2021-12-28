import styled from "styled-components";
import { LoginForm } from "./LoginForm";
import { ShowingInstagram } from "./ShowingInsta";

export function Contents() {
    return (
        <ContentContainer>
            <ShowingInstagram />
            <LoginForm />
        </ContentContainer>
    );
}

const ContentContainer = styled.main`
    display: flex;
    justify-content: center;
    padding-bottom: 32px;
    margin: 32px auto 0;
    width: 100%;
`;
