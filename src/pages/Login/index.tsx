import styled from "styled-components";
import { Contents } from "../../components/Login/Contents";
import { Footer } from "../../components/Login/Footer/Footer";

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
