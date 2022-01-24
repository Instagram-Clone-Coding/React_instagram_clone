import React from "react";
import FooterTextPiece from "./FooterTextPiece";
import styled from "styled-components";
import FooterContentProps from "./FooterText.type";

const FlexRow = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

function FooterRow(props: FooterContentProps) {
    return (
        <FlexRow>
            {props.content.map((data, index) => (
                <FooterTextPiece text={data.text} url={data.url} key={index} />
            ))}
        </FlexRow>
    );
}

export default FooterRow;
