import styled from "styled-components";

const LineStyle = styled.div`
    margin: 10px 40px 18px;
    display: flex;

    & > span {
        color: #8e8e8e;
        font-size: 13px;
        font-weight: ${(props) => props.theme.font.bold};
        margin: 0 18px;
        line-height: 15px;
    }

    & > div {
        background-color: ${(props) => props.theme.color.bd_gray};
        height: 1px;
        flex-grow: 1;
        flex-shrink: 1;
        top: 0.45em;
        position: relative;
    }
`;

export default function Line() {
    return (
        <LineStyle>
            <div />
            <span>또는</span>
            <div />
        </LineStyle>
    );
}
