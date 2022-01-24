import styled from "styled-components";
import sprite from "assets/Images/sprite.png";

const ImageSprite = styled.div<Login.ImageProps>`
    background-repeat: no-repeat;
    background: url(${sprite});
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    background-position: ${(props) => props.position};
`;

export default ImageSprite;
