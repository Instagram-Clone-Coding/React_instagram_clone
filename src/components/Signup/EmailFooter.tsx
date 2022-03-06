import styled from "styled-components";
import ImageSprite from "components/Common/ImageSprite";
import sprite from "assets/Images/sprite3.png";

const Footer = styled.footer`
    text-align: center;
    padding-bottom: 52px;
    .logo_container {
        display: flex;
        justify-content: center;
    }
    .meta_logo {
        background-size: 569px 521px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    & > div {
        color: #abadae;
        font-size: 5px;
        margin-bottom: 5px;
    }
`;

const metaLogo: Common.ImageProps = {
    width: 52,
    height: 26,
    position: ` -427px -398px`,
    url: sprite,
};

export default function EmailFooter({ sentence }: { sentence: string[] }) {
    return (
        <Footer>
            <div className="logo_container">
                <ImageSprite {...metaLogo} className="meta_logo" />
            </div>
            <div>
                © Instagram. Meta Platforms, Inc., 1601 Willow Road, Menlo Park,
                CA 94025
            </div>
            {sentence.map((row) => (
                <div>{row}</div>
            ))}
        </Footer>
    );
}
