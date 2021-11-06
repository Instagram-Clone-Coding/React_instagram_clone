import styled, { css } from "styled-components";
import { imageProps, ImgSprite } from "components/common/Sprite";
import { Link } from "react-router-dom";

export function Forms() {
    return (
        <div>
            <ImgSprite
                width={test.width}
                height={test.height}
                position={test.position}
            />
            <Link to="sign">비밀번호를 잊으셨나요? </Link>
        </div>
    );
}

const test: imageProps = {
    width: 175,
    height: 51,
    position: `0 -130px`,
};
