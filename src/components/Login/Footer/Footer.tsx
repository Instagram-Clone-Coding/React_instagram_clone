import styled from "styled-components";
import FooterRow from "./FooterRow";
import InstagramLinks from "./InstagramLinks";

const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 16px;

    .copyrightContainer {
        margin: 12px 0;
        width: 100%;
    }
`;

const copyright = [{ text: "한국어" }, { text: "© 2021 Instagram from Meta" }];

export function Footer() {
    return (
        <FooterContainer>
            <InstagramLinks />
            <div className="copyrightContainer">
                <FooterRow content={copyright} />
            </div>
        </FooterContainer>
    );
}
