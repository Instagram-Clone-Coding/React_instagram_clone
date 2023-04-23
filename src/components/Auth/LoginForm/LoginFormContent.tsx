import styled from "styled-components";
import { Link } from "react-router-dom";
import Line from "components/Auth/Line";
import FacebookLogin from "components/Auth/FacebookLogin";
import LoginFormAndButton from "components/Auth/LoginForm/FormAndButton";
import { useAppSelector } from "app/store/Hooks";
import Logo from "assets/Images/logo-hello-world.png";

const FormContainer = styled.div`
    .logo-container {
        text-align: center;
    }

    .logo {
        margin-top: 1rem;
        width: 200px;
    }

    .inputContainer {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        max-width: 350px;
        width: 100%;

        a {
            margin-top: 12px;
            font-size: 12px;
            line-height: 16px;
            color: #385185;
            width: 100%;
            text-align: center;
            text-decoration: none;
        }

        .inputForm {
            display: flex;
            flex-direction: column;

            .loginForm {
                margin-top: 24px;
                display: flex;
                flex-direction: column;
            }
            .errorMessage {
                color: #ed4956;
                font-size: 14px;
                line-height: 18px;
                text-align: center;
                margin: 10px 40px;
            }
        }
    }
`;

export default function LoginForm() {
    const errorMessage = useAppSelector((state) => state.auth.errorMessage);

    return (
        <FormContainer>
            <div className="logo-container">
                <img src={Logo} alt="hello world 로고" className="logo" />
            </div>
            <div className="inputContainer">
                <form className="inputForm">
                    <div className="loginForm">
                        <LoginFormAndButton />
                        <Line />
                        <FacebookLogin bgColor="#fff" color="#385185" />
                    </div>
                    {errorMessage && (
                        <div className="errorMessage">
                            <p>{errorMessage}</p>
                        </div>
                    )}
                </form>
                <Link to="/accounts/password/reset/">
                    비밀번호를 잊으셨나요?
                </Link>
            </div>
        </FormContainer>
    );
}
