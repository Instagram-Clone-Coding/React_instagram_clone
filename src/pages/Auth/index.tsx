import { Footer } from "components/Login/Footer/Footer";
import LoginForm from "components/Login/LoginForm/LoginForm";
import SignUp from "components/Signup";

export default function AuthPage(props: { router: string }) {
    return (
        <>
            <div>{props.router === "signIn" ? <LoginForm /> : <SignUp />}</div>
            <Footer />
        </>
    );
}
