import React from "react";
import styled from "styled-components";
import { footerTextProps } from "./types";

function FooterTextPiece(props: footerTextProps) {
    return (
        <ContentStyle>
            {props.url ? (
                <a href={props.url}>
                    <Text>{props.text}</Text>
                </a>
            ) : (
                <Text>{props.text}</Text>
            )}
        </ContentStyle>
    );
}

export default FooterTextPiece;

const ContentStyle = styled.div`
    margin: 0 8px 12px 8px;
    a {
        text-decoration: none;
    }
`;

const Text = styled.div`
    color: #8e8e8e;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    margin: -2px 0 -3px;
`;
