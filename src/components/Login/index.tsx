import styled from "styled-components";
import { Contents } from "./Contents";
import { Footer } from "./Footer";

export function Login() {
    return (
        <Container>
            <Contents />
            <Footer />
        </Container>
    );
}

// style
const Container = styled.section`
    display: flex;
    flex-direction: column;
`;
