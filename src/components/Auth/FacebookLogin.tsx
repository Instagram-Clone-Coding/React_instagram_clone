import ImageSprite from "components/Common/ImageSprite";
import styled from "styled-components";
import Button from "styles/UI/Button/Button";
import sprite from "assets/Images/loginPageSprite.png";

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

const backgroundWhiteFacebook: CommonType.ImageProps = {
    width: 16,
    height: 16,
    position: `-414px -259px`,
    url: sprite,
};

const backgroundBlueFacebook: CommonType.ImageProps = {
    width: 16,
    height: 16,
    position: `-414px -300px`,
    url: sprite,
};

export default function FacebookLogin({ bgColor, color }: UIType.ButtonProps) {
    return (
        <FacebookButtonContainer>
            <Button bgColor={bgColor} color={color} type="button">
                {bgColor ? (
                    <ImageSprite {...backgroundWhiteFacebook} />
                ) : (
                    <ImageSprite {...backgroundBlueFacebook} />
                )}
                Facebook으로 로그인
            </Button>
        </FacebookButtonContainer>
    );
}
