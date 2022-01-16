import styled from "styled-components";
import ImgSprite from "components/Common/LoginSprite";
import FacebookLogin from "components/Common/FacebookLogin";
import Line from "components/Common/Line";
import InputAndButton from "./InputAndButton";

export default function SignUpForm() {
    return (
        <SignUpFormContainer>
            <ImgSprite
                width={instagramImage.width}
                height={instagramImage.height}
                position={instagramImage.position}
                className="logo"
            />
            <Form>
                <SignUpMessage>
                    친구들의 사진과 동영상을 보려면 가입하세요.
                </SignUpMessage>
                <FacebookLogin color="#fff" />
                <Line />
                <InputAndButton />
            </Form>
        </SignUpFormContainer>
    );
}

const instagramImage: Login.ImageProps = {
    width: 175,
    height: 51,
    position: `0 -130px`,
};

const SignUpFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo {
        margin: 22px auto 12px;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

const SignUpMessage = styled.h2`
    font-size: 17px;
    margin: 0 40px 10px;
    color: ${(props) => props.theme.font.gray};
    font-weight: ${(props) => props.theme.font.bold};
    line-height: 20px;
    text-align: center;
`;
