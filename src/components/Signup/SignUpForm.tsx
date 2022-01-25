import styled from "styled-components";
import FacebookLogin from "components/Common/FacebookLogin";
import Line from "components/Common/Line";
import ImageSprite from "components/Common/LoginSprite";
import InputAndButton from "components/Signup/InputAndButton";

const SignUpFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo {
        margin: 22px auto 12px;
    }

    .signUpForm {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        .signUpMessage {
            font-size: 17px;
            margin: 0 40px 10px;
            color: ${(props) => props.theme.font.gray};
            font-weight: ${(props) => props.theme.font.bold};
            line-height: 20px;
            text-align: center;
        }
    }
`;

const instagramImage: Login.ImageProps = {
    width: 175,
    height: 51,
    position: `0 -130px`,
};

export default function SignUpForm() {
    return (
        <SignUpFormContainer>
            <ImageSprite {...instagramImage} className="logo" />
            <form className="signUpForm">
                <h2 className="signUpMessage">
                    친구들의 사진과 동영상을 보려면 가입하세요.
                </h2>
                <FacebookLogin color="#fff" />
                <Line />
                <InputAndButton />
            </form>
        </SignUpFormContainer>
    );
}
