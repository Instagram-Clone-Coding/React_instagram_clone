import styled from "styled-components";
import ImageSprite from "components/Common/ImageSprite";
import { Link } from "react-router-dom";
import Line from "components/Common/Line";
import FacebookLogin from "components/Common/FacebookLogin";
import LoginFormAndButton from "components/Login/LoginForm/FormAndButton";
import { useAppSelector } from "app/store/Hooks";
import sprite from "assets/Images/loginPageSprite.png";

const FormContainer = styled.div`
    white-space: pre-wrap; // 개행처리
    .logo {
        margin: 22px auto 12px;
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

const instagramImage: Common.ImageProps = {
    width: 175,
    height: 51,
    position: `0 -130px`,
    url: sprite,
};

export default function FormLayout() {
    const { errorMessage } = useAppSelector((state) => state.auth);

    return (
        <FormContainer>
            <ImageSprite {...instagramImage} className="logo" />
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
