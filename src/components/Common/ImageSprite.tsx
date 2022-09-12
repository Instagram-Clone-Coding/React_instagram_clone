import styled from "styled-components";

const ImageSprite = styled.div<CommonType.ImageProps>`
    background: ${(props) => `url(${props.url}) no-repeat`};
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    background-position: ${(props) => props.position};
    background-size: ${(props) => props.size && `${props.size}`};
`;

export default ImageSprite;
