import { useAppSelector } from "app/store/Hooks";
import styled from "styled-components";
import HeaderBeforeLogin from "./HeaderBeforeLogin";
import InformSendingEmail from "./InformSendingEmail";
import ResetPasswordForm from "./ResetPasswordForm";

const Container = styled.div`
    height: 100vh;
`;

export default function ResetPassword() {
    const sentEmail = useAppSelector((state) => state.auth.resetPassword.email);

    return (
        <Container>
            {sentEmail ? (
                <>
                    <HeaderBeforeLogin currentPage="sentResetPasswordEmail" />
                    <InformSendingEmail />
                </>
            ) : (
                <>
                    <HeaderBeforeLogin />
                    <ResetPasswordForm />
                </>
            )}
        </Container>
    );
}
