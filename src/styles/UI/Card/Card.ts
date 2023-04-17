import styled from "styled-components";

export interface CardProps {
    isNav?: boolean;
    radius?: number;
    isArticle?: boolean;
}

const Card = styled.div<CardProps>`
    border: 1px solid
        ${(props) =>
            props.isNav || props.isArticle
                ? "none"
                : props.theme.color.bd_gray};
    border-bottom: 1px solid
        ${(props) => (props.isNav ? props.theme.color.bd_gray : "none")};
    border-radius: ${(props) => (props.isArticle ? 4 : props.radius) + "px"};
    background-color: ${(props) => props.theme.color.bg_white};
`;

Card.defaultProps = {
    isNav: false,
    radius: 3,
    isArticle: false,
};

export default Card;
