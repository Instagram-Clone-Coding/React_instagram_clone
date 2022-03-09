import styled from "styled-components";

const ContentStyle = styled.div`
    margin: 0 8px 12px 8px;
    a {
        text-decoration: none;
    }

    .text {
        color: #8e8e8e;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        margin: -2px 0 -3px;
    }
`;

function FooterTextPiece(props: CommonType.FooterTextProps) {
    return (
        <ContentStyle>
            {props.url ? (
                <a href={props.url}>
                    <div className="text">{props.text}</div>
                </a>
            ) : (
                <div className="text">{props.text}</div>
            )}
        </ContentStyle>
    );
}

export default FooterTextPiece;
