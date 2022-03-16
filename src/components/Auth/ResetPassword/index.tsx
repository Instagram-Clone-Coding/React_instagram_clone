import { Footer } from "components/Common/Footer/Footer";
import styled from "styled-components";
import navLogo from "assets/Images/nav-logo.png";
import { Link } from "react-router-dom";
import ContentBox from "components/Common/ContentBox";
import ImageSprite from "components/Common/ImageSprite";
import sprite from "assets/Images/sprite2.png";
import Input from "components/Common/Input";
import useInput from "hooks/useInput";
import SubmitButton from "../SubmitButton";
import { MouseEvent } from "react";
import Line from "../Line";

// flow
// 이메일 전송 [이메일폼 화면, 이메일화면]
// -> 이메일 버튼으로 페이지이동(백엔드에서 페이지처리함)
// -> 비밀번호 재설정

const Container = styled.section`
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

    .form-container {
        margin: 60px auto 44px;
        max-width: 388px;

        .form-content {
            display: flex;
            flex-direction: column;
            .image-container {
                display: flex;
                justify-content: center;
                margin: 24px 0 16px 0;
                .image {
                    background-size: 440px 411px;
                }
            }

            .description {
                text-align: center;

                h4 {
                    font-weight: 600;
                    margin: -6px 44px 10px 44px;
                    font-size: 16px;
                    line-height: 24px;
                }

                & > div {
                    color: #8e8e8e;
                    font-weight: 400;
                    margin: -3px 44px 12px 44px;
                    font-size: 14px;
                    line-height: 18px;
                }
            }

            a {
                font-size: 14px;
                font-weight: 600;
                text-align: center;
                text-decoration: none;
            }

            .comeback-signup {
                margin: 0 44px 16px 44px;
                text-align: center;
            }

            .comeback-login {
                margin-top: 68px;
                .login-box {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 44px;
                    background-color: #fafafa;
                    border: 1px solid #dbdbdb;
                }
            }
        }
    }
`;

const image: Common.ImageProps = {
    width: 96,
    height: 96,
    position: `-129px 0`,
    url: sprite,
};

export default function ResetPasswordForm() {
    const [inputProps, isValid, isFocus] = useInput(
        "",
        undefined,
        (value) => value.length > 0,
    );

    const submitButtonClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // api 연결
    };

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
            <main className="form-container">
                <ContentBox padding="0" margin="0 0 0 0">
                    <div className="form-content">
                        <div className="image-container">
                            <ImageSprite {...image} className="image" />
                        </div>
                        <div className="description">
                            <h4>로그인에 문제가 있나요?</h4>
                            <div>
                                이메일 주소, 전화번호 또는 사용자 이름을
                                입력하시면 계정에 다시 액세스할 수 있는 링크를
                                보내드립니다.
                            </div>
                        </div>
                        <Input
                            type="text"
                            inputName="username"
                            innerText="사용자 이름"
                            isFocus={isFocus}
                            inputProps={inputProps}
                        />
                        <SubmitButton
                            type="submit"
                            onClick={submitButtonClickHandler}
                            disabled={!isValid}
                        >
                            로그인 링크 보내기
                        </SubmitButton>
                        <Line margin="16px 44px" />
                        <div className="comeback-signup">
                            <Link to="/accounts/emailsignup/">
                                새 계정 만들기
                            </Link>
                        </div>
                        <div className="comeback-login">
                            <div className="login-box">
                                <Link to="/accounts/login">
                                    로그인으로 돌아가기
                                </Link>
                            </div>
                        </div>
                    </div>
                </ContentBox>
            </main>
            <Footer />
        </Container>
    );
}
