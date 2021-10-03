import styled, { css } from "styled-components";
import Card from "UI/Card/Card";
import phoneUrl from "./img/home-phone.png";
import sprite from "./img/sprite.png";
import LinkBox, { Linkdata } from "./LinkBox";
import { Form } from "./LoginForm";

// interface
interface imageType {
    height: number;
    width: number;
}

interface NewCardType {
    width?: number;
    height?: number;
    hasPadding?: boolean;
    hasMargin?: boolean;
    isColumn?: boolean;
}

interface ImgSpriteType {
    position: string;
    height: number;
    width: number;
    url: string;
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

const ContentBox = styled.div`
    ${flexRowCenter}
    width: 350px;
    height: 606px;
    flex-direction: column;
    margin-top: 12px;
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

const ImgSprite = styled.div<ImgSpriteType>`
    background-repeat: no-repeat;
    background: url(${(props) => props.url});
    background-position: ${(props) => props.position};
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
`;

// - Container
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

// Components
const DownloadApp = () => {
    return (
        <div>
            <p>앱을 다운로드하세요.</p>
            <div></div>
        </div>
    );
};

const LoginForm = () => {
    const Forms = styled.div`
        margin-top: 24px;
    `;

    return (
        <form>
            <Forms>
                <Form
                    description="전화번호 사용자 이름 또는 이메일"
                    inputType="text"
                />
                <Form description="비밀번호" inputType="password" />
                <button>로그인</button>
            </Forms>
        </form>
    );
};

const Logo = () => {
    const LogoStyle = styled.div`
        margin: 22px 86.5px 12px 86.5px;
    `;

    const Logo: ImgSpriteType = {
        width: 175,
        height: 51,
        position: "0 -130px",
        url: sprite,
    };

    return (
        <LogoStyle>
            <ImgSprite
                width={Logo.width}
                height={Logo.height}
                url={Logo.url}
                position={Logo.position}
            />
        </LogoStyle>
    );
};

const Contents = () => {
    const radius: number = 1;
    const data: Linkdata = {
        router: "accounts/emailsingup",
        message: "계정이 없으신가요?",
        linker: "가입하기",
    };

    return (
        <>
            <NewCard radius={radius} isColumn={true}>
                <Logo />
                <LoginForm />
            </NewCard>
            <LinkBox
                router={data.router}
                message={data.message}
                linker={data.linker}
            />
            <DownloadApp />
        </>
    );
};

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
                    <ContentBox>
                        <Contents />
                    </ContentBox>
                </Layout>
            </main>
            <footer>footer</footer>
        </>
    );
}

export default LoginContent;
