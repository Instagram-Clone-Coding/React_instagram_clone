import React from "react";
import FooterTextPiece from "./FooterTextPiece";
import styled from "styled-components";
import { footerContentProps } from "./types";

function FooterRow(props: footerContentProps) {
    return (
        <FlexRow>
            {props.content.map((data) => (
                <FooterTextPiece text={data.text} url={data.url} />
            ))}
        </FlexRow>
    );
}

export default FooterRow;

//style
const FlexRow = styled.div`
    display: flex;
    justify-content: center;
`;
