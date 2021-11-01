import styled, { css } from "styled-components";
import sprite from "images/Login/sprite.png";
import { imageProps, ImgSprite } from "components/common/Sprite";

export function Forms() {
    return (
        <ImgSprite
            url={test.url}
            width={test.width}
            height={test.height}
            position={test.position}
        />
    );
}

const test: imageProps = {
    url: sprite,
    width: 175,
    height: 51,
    position: `0 -130px`,
};
