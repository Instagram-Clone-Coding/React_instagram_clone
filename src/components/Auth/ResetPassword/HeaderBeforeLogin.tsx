import navLogo from "assets/Images/nav-logo.png";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    header {
        display: flex;
        justify-content: center;

        background-color: #fff;
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
                margin-top: 7px;
            }

            .logo {
                opacity: 1;
                transition: opacity 0.1s ease-out;
            }
            .logo:active {
                opacity: 0.3;
            }
        }
    }

    .fake-header {
        height: 44px;
    }
`;

export default function HeaderBeforeLogin() {
    return (
        <Container>
            <header>
                <div className="header-content">
                    <div className="logo-container">
                        <Link to="/">
                            <div className="logo">
                                <img
                                    src={navLogo}
                                    alt="상단바 인스타 로고"
                                    srcSet={navLogo + " 2x"}
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="empty"></div>
                </div>
            </header>
            <div className="fake-header" />
        </Container>
    );
}
