import styled from "styled-components";

export const SizedBox = styled.div<{
    height?: number;
    width?: number;
}>`
    ${({ height }) => height && `height: ${height}px;`}
    ${({ width }) => width && `width: ${width}px;`}
`;
