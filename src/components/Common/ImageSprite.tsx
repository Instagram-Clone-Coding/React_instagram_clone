import styled from "styled-components";

const ImageSprite = styled.div<Common.ImageProps>`
  background: ${props => `url(${props.url}) no-repeat`};
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-position: ${(props) => props.position};
`;

export default ImageSprite;
