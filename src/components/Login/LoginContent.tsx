import styled, { css } from "styled-components";
import Card from "UI/Card/Card";
import phoneUrl from "./img/home-phone.png";

// interface
interface imageType {
    height: number;
    width: number;
}

// styled component
const flexRowCenter = css`
    display: flex;
    justify-content: center;
`;

const Layout = styled.article`
    ${flexRowCenter}
    padding-bottom: 32px;
    margin-top: 32px;
`;

// - image
const Image = styled.img<imageType>`
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
`;

const ImageMedia = styled(Image)`
    @media (max-width: 875px) {
        display: none;
    }
`;

const Contents = styled.div`
    ${flexRowCenter}
    width: 350px;
    height: 606px;
    flex-direction: column;
    margin-top: 12px;
`;

// - Container
interface NewCardType {
    width?: number;
    height?: number;
    hasPadding?: boolean;
    hasMargin?: boolean;
    isColumn?: boolean;
}

export const NewCard = styled(Card)<NewCardType>`
    ${flexRowCenter}
    align-items: center;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    margin-bottom: ${(props) => (props.hasMargin ? 10 : 0)}px;
    padding: ${(props) => (props.hasPadding ? "10px 0px" : "0px 0px")};
    flex-direction: ${(props) => (props.isColumn ? "column" : "row")};
`;

NewCard.defaultProps = {
    width: 350,
    height: 377.8,
    hasPadding: true,
    hasMargin: true,
    isColumn: false,
};

const DownloadApp = () => {
    return <div></div>;
};

// render
function LoginContent() {
    const phone = {
        src: `${phoneUrl}`,
        width: 454,
        height: 618,
    };

    const radius: number = 1;
    return (
        <>
            <main>
                <Layout>
                    <ImageMedia
                        src={phone.src}
                        width={phone.width}
                        height={phone.height}
                    />
                    <Contents>
                        <NewCard radius={radius} isColumn={true}></NewCard>
                        <NewCard radius={radius} height={62.6}></NewCard>
                        <DownloadApp />
                    </Contents>
                    {/* <LoginForm /> */}
                </Layout>
            </main>
            <footer></footer>
        </>
    );
}

export default LoginContent;
