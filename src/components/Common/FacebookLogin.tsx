import ImageSprite from "components/Common/LoginSprite";
import styled from "styled-components";
import Button from "styles/UI/Button/Button";

const FacebookButtonContainer = styled.div`
    margin: 8px 40px;

    & > button {
        width: 100%;
        border: 1px solid transparent;

        & > div {
            display: inline-block;
            margin-right: 8px;
            position: relative;
            top: 3px;
        }
    }
`;

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

export default function FacebookLogin({ bgColor, color }: UI.ButtonProps) {
    return (
        <FacebookButtonContainer>
            <Button bgColor={bgColor} color={color}>
                {bgColor ? (
                    <ImageSprite
                        width={backgroundWhiteFacebook.width}
                        height={backgroundWhiteFacebook.height}
                        position={backgroundWhiteFacebook.position}
                    />
                ) : (
                    <ImageSprite
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
