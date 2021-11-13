import { NewCardProps } from "components/Login/types";
import styled from "styled-components";
import Card from "UI/Card/Card";

const ContentBox = styled(Card)<NewCardProps>`
    margin: ${(props) => props.margin};
    padding: ${(props) => props.padding};
    border-radius: 1px;

    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export default ContentBox;
