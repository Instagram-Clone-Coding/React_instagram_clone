import styled from "styled-components";
import sprite from "assets/Images/loginSprite.png";

export interface imageProps {
    width: number;
    height: number;
    position: string;
}

export const ImgSprite = styled.div<imageProps>`
    background-repeat: no-repeat;
    background: url(${sprite});
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    background-position: ${(props) => props.position};
`;
