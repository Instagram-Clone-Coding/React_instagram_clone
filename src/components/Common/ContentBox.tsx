import { Login } from "@type";

import styled from "styled-components";
import Card from "styles/UI/Card/Card";

const ContentBox = styled(Card)<Login.NewCardProps>`
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
