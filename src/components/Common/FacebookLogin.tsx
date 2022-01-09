import ImgSprite from "components/Common/LoginSprite";
import styled from "styled-components";
import Button, { ButtonType } from "styles/UI/Button/Button";

import { Login } from "@type";

export default function FacebookLogin({ bgColor, color }: ButtonType) {
    return (
        <FacebookButtonContainer>
            <Button bgColor={bgColor} color={color}>
                {bgColor ? (
                    <ImgSprite
                        width={backgroundWhiteFacebook.width}
                        height={backgroundWhiteFacebook.height}
                        position={backgroundWhiteFacebook.position}
                    />
                ) : (
                    <ImgSprite
                        width={backgroundBlueFacebook.width}
                        height={backgroundBlueFacebook.height}
                        position={backgroundBlueFacebook.position}
                    />
                )}
                Facebook으로 로그인
            </Button>
        </FacebookButtonContainer>
    );
}

const backgroundWhiteFacebook: Login.ImageProps = {
    width: 16,
    height: 16,
    position: `-414px -259px`,
};

const backgroundBlueFacebook: Login.ImageProps = {
    width: 16,
    height: 16,
    position: `-414px -300px`,
};

const FacebookButtonContainer = styled.div`
    margin: 8px 40px;

    & > button {
        width: 100%;

        & > div {
            display: inline-block;
            margin-right: 8px;
            position: relative;
            top: 3px;
        }
    }
`;
