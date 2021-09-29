import styled, { css } from "styled-components";
import phoneUrl from "./img/home-phone.png";

// interface
interface imageType {
    height: number;
    width: number;
}

// styled component
const flexCenter = css`
    display: flex;
    justify-content: center;
`;

const Layout = styled.article`
    ${flexCenter}
    padding-bottom: 32px;
    margin-top: 32px;
`;

// image
const Image = styled.img<imageType>`
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
`;

const ImageMedia = styled(Image)`
    @media (max-width: 875px) {
        display: none;
    }
`;

// render
function LoginContent() {
    const phone = {
        src: `${phoneUrl}`,
        width: 454,
        height: 618,
    };

    return (
        <>
            <main>
                <Layout>
                    <ImageMedia
                        src={phone.src}
                        width={phone.width}
                        height={phone.height}
                    />
                    {/* <LoginForm /> */}
                </Layout>
            </main>
            <footer></footer>
        </>
    );
}

export default LoginContent;
