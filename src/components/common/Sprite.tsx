import styled from "styled-components";

export interface imageProps {
    url: string;
    width: number;
    height: number;
    position: string;
}

export const ImgSprite = styled.div<imageProps>`
    background-repeat: no-repeat;
    background: url(${(props) => props.url});
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    background-position: ${(props) => props.position};
`;
