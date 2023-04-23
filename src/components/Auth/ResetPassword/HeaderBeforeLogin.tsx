import Logo from "assets/Images/logo-hello-world.png";
import SearchBar from "components/Common/Header/SearchBar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "styles/UI/Button";

const Container = styled.div`
    header {
        display: flex;
        justify-content: center;

        background-color: ${(props) => props.theme.color.bg_white};
        background-color: rgba(var(--d87, 255, 255, 255), 1);
        border-bottom: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
        height: 60px;
        position: fixed;
        top: 0;

        width: 100%;
        z-index: 101;

        .header-content {
            max-width: 975px;
            padding: 0 20px 0 20px;
            display: flex;
            align-items: center;
            width: 100%;

            & > div {
                flex: 1 0 127px;
            }

            img {
                width: 110px;
            }

            .logo {
                display: flex;
                opacity: 1;
                transition: opacity 0.1s ease-out;
            }
            .logo:active {
                opacity: 0.3;
            }
        }
    }

    .other-account-login {
        display: flex;
        justify-content: flex-end;
        button {
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
        }
    }

    .search-bar {
        display: flex;
        justify-content: center;
    }

    .login-signup {
        display: flex;
        justify-content: flex-end;
    }

    .fake-header {
        height: 44px;
    }
`;

export default function HeaderBeforeLogin({
    currentPage,
}: {
    currentPage?: "sentResetPasswordEmail" | "resetPassword";
}) {
    return (
        <Container>
            <header>
                <div className="header-content">
                    <div className="logo-container">
                        <Link to="/">
                            <div className="logo">
                                <img src={Logo} alt="hello world 로고" />
                            </div>
                        </Link>
                    </div>

                    {currentPage === "sentResetPasswordEmail" && (
                        <div className="other-account-login">
                            <Link to="/accounts/login">
                                <button>다른 계정으로 로그인</button>
                            </Link>
                        </div>
                    )}
                    {currentPage === "resetPassword" && (
                        <>
                            <div className="search-bar">
                                <SearchBar />
                            </div>
                            <div className="login-signup">
                                <Link to="/accounts/login">
                                    <Button>로그인</Button>
                                </Link>
                                <Link to="/accounts/emailsignup">
                                    <Button bgColor="#ffffff" color="#0095F6">
                                        회원가입
                                    </Button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </header>
            <div className="fake-header" />
        </Container>
    );
}
