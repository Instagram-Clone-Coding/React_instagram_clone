import ContentBox from "components/Common/ContentBox";
import ImageSprite from "components/Common/ImageSprite";
import sprite from "assets/Images/sprite2.png";
import Input from "components/Common/Input";
import useInput from "hooks/useInput";
import SubmitButton from "../SubmitButton";
import { MouseEvent } from "react";
import Line from "../Line";
import { Link } from "react-router-dom";
import { customAxios } from "customAxios";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { authAction } from "app/store/ducks/auth/authSlice";
import Loading from "components/Common/Loading";
import styled from "styled-components";
import Notification from "styles/UI/Notification";

const Container = styled.section`
    height: 92%;
    .form-position {
        display: flex;
        min-height: 100%;
        align-items: center;

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
                        background-color: ${(props) =>
                            props.theme.color.bg_gray};
                        border: 1px solid #dbdbdb;
                    }
                }
            }
        }
    }
`;

const image: CommonType.ImageProps = {
    width: 96,
    height: 96,
    position: `-129px 0`,
    url: sprite,
};

export default function ResetPasswordEmailRequestForm() {
    const [inputProps, isValid, isFocus] = useInput(
        "",
        undefined,
        (value) => value.length > 0,
    );

    const dispatch = useAppDispatch();
    const { isLoading, hasNotification } = useAppSelector(
        (state) => state.auth,
    );

    const submitButtonClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(authAction.changeButtonLoadingState(true));
        const callPasswordChangeEmailAPI = async () => {
            try {
                const config = {
                    params: {
                        username: inputProps.value,
                    },
                };
                const {
                    data: { data },
                } = await customAxios.post(
                    `/accounts/password/email`,
                    null,
                    config,
                );
                dispatch(authAction.insertUserEmail({ email: data }));
            } catch {
                dispatch(authAction.showNotification());
                setTimeout(() => dispatch(authAction.closeNotification), 5000);
                console.log(
                    `error, /accounts/password/email(비밀번호 재설정메일 전송) api in resetPasswordForm Component`,
                );
            } finally {
                dispatch(authAction.changeButtonLoadingState(false));
            }
        };
        callPasswordChangeEmailAPI();
    };

    return (
        <Container>
            <div className="form-position">
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
                                    입력하시면 계정에 다시 액세스할 수 있는
                                    링크를 보내드립니다.
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
                                {isLoading ? (
                                    <Loading size={18} isInButton={true} />
                                ) : (
                                    "로그인 링크 보내기"
                                )}
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
            </div>
            {hasNotification && (
                <Notification text="사용자를 찾을 수 없습니다." />
            )}
        </Container>
    );
}
