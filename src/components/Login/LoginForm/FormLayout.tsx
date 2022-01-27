import styled from "styled-components";
import ImageSprite from "components/Common/ImageSprite";
import { Link } from "react-router-dom";
import Line from "components/Common/Line";
import FacebookLogin from "../../Common/FacebookLogin";
import LoginFormAndButton from "./FormAndButton";
import sprite from "assets/Images/loginPageSprite.png";

const FormContainer = styled.div`
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
            & > div {
                margin-top: 24px;
                display: flex;
                flex-direction: column;
            }
        }
    }
`;

const instagramImage: Common.ImageProps = {
    width: 175,
    height: 51,
    position: `0 -130px`,
    url:sprite

};

export default function FormLayout() {
    return (
        <FormContainer>
            <ImageSprite
                {...instagramImage}
                className="logo"
            />
            <div className="inputContainer">
                <form className="inputForm">
                    <div>
                        <LoginFormAndButton />
                        <Line />
                        <FacebookLogin bgColor="#fff" color="#385185" />
                    </div>
                </form>
                <Link to="/accounts/password/reset/">
                    비밀번호를 잊으셨나요?
                </Link>
            </div>
        </FormContainer>
    );
}
