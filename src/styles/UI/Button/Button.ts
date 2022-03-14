import styled from "styled-components";

const Button = styled.button<UIType.ButtonProps>`
    border-radius: ${(props) => props.radius + "px"};
    padding: 5px 9px;
    background-color: ${(props) => props.bgColor || props.theme.color.blue};
    color: ${(props) => props.color};
`;

Button.defaultProps = {
    radius: 4,
    color: "white",
};

export default Button;
