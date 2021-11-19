import styled from "styled-components";
import FooterRow from "./FooterRow";
import InstagramLinks from "./InstagramLinks";

export function Footer() {
    return (
        <FooterContainer>
            <InstagramLinks />
            <CopyrightContainer>
                <FooterRow content={copyright} />
            </CopyrightContainer>
        </FooterContainer>
    );
}

// props
const copyright = [{ text: "한국어" }, { text: "© 2021 Instagram from Meta" }];

// style
const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 16px;
`;

const CopyrightContainer = styled.div`
    margin: 12px 0;
    width: 100%;
`;
