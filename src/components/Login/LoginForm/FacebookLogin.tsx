import ImgSprite from "components/common/Sprite";
import styled from "styled-components";
import { imageProps } from "../types";

export default function Facebook() {
    return (
        <FacebookStyle>
            <button>
                <ImgSprite
                    width={facebook.width}
                    height={facebook.height}
                    position={facebook.position}
                />
                <span>Facebook으로 로그인</span>
            </button>
        </FacebookStyle>
    );
}

const facebook: imageProps = {
    width: 16,
    height: 16,
    position: `-414px -259px`,
};

const FacebookStyle = styled.div`
    margin: 8px 40px;

    & > button {
        width: 100%;

        & > div {
            display: inline-block;
            margin-right: 8px;
            position: relative;
            top: 3px;
        }

        & > span {
            color: #385185;
        }
    }
`;
