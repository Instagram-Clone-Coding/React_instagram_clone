import { Contents } from "components/Login/Contents";
import { Footer } from "components/Login/Footer/Footer";
import styled from "styled-components";

const Container = styled.section`
    display: flex;
    flex-direction: column;
`;

export default function Login() {
    return (
        <Container>
            <Contents />
            <Footer />
        </Container>
    );
}
