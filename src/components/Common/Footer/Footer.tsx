import styled from "styled-components";
import FooterRow from "components/Common/Footer/FooterRow";
import InstagramLinks from "components/Common/Footer/InstagramLinks";

const FooterContainer = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 16px;
    margin-bottom: 40px;

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
