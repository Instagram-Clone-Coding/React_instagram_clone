import styled from "styled-components";

const Username = styled.span`
    font-weight: ${(props) => props.theme.font.bold};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

export default Username;
