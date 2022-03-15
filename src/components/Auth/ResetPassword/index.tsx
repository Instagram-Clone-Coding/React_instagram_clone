import { Footer } from "components/Common/Footer/Footer";
import styled from "styled-components";
import navLogo from "assets/Images/nav-logo.png";
import { Link } from "react-router-dom";
import ContentBox from "components/Common/ContentBox";

// flow
// 이메일 전송 [이메일폼 화면, 이메일화면]
// -> 이메일 버튼으로 페이지이동(백엔드에서 페이지처리함)
// -> 비밀번호 재설정

const Container = styled.section`
    .header {
        display: flex;
        align-items: center;
        padding: 0 20px 0 20px;

        background-color: #fff;
        background-color: rgba(var(--d87, 255, 255, 255), 1);
        border-bottom: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
        height: 60px;
        position: fixed;
        top: 0;

        width: 100%;
        z-index: 101;

        .image-container {
            display: flex;
        }
    }

    .form-container {
        position: relative;
        margin: 44px 0;
        .form-style {
            margin: 60px auto 0;
        }
    }
`;

export default function ResetPasswordForm() {
    // form
    // - 이미지
    // - 폼 & 버튼
    // 또는
    // 새계정만들기(회원가입)
    // 로그인으로 돌아가기(로그인)
    return (
        <Container>
            <nav className="header">
                <Link to="/">
                    <div className="image-contaienr">
                        <img
                            src={navLogo}
                            alt="상단바 인스타 로고"
                            srcSet={navLogo + " 2x"}
                        />
                    </div>
                </Link>
            </nav>
            <main className="form-container">
                <div className="form-style">
                    <ContentBox padding="0" margin="0 0 0 0">
                        <div>reset Password form</div>
                    </ContentBox>
                </div>
            </main>
            <Footer />
        </Container>
    );
}
