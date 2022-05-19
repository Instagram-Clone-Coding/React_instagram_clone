import { useLocation } from "react-router-dom";
import queryString from "query-string";
import HeaderBeforeLogin from "./HeaderBeforeLogin";
import ContentBox from "components/Common/ContentBox";
import styled from "styled-components";
import SubmitButton from "../SubmitButton";
import useInput from "hooks/useInput";
import { useEffect, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { checkCurrentURL, resetPassword } from "app/store/ducks/auth/authThunk";

const Container = styled.section`
    background-color: #fff;
    text-align: center;
    height: 100vh;
    .form-position {
        margin: 80px auto 0;
        max-width: 360px;
        .form {
            display: flex;
            flex-direction: column;
            .form-title {
                margin-bottom: 8px;
                font-weight: 700;
                font-size: 16px;
                line-height: 1.3;
                padding: 32px 32px 0 32px;
            }
            .form-description {
                font-size: 14px;
                line-height: 1.3;
                color: rgb(142, 142, 142);
                padding: 0 53px 26px 53px;
            }
            input {
                margin: 0 53px 24px 52px;
                color: rgb(38, 38, 38);
                font-size: 13px;
                padding: 4px;
                height: 48px;
                border-radius: 4px;
                border: 1px solid rgb(219, 219, 219);
            }

            .new-password-input {
                margin: 0 53px 10px 52px;
            }

            .password-message {
                padding: 0 53px;
                height: 16px;
                font-size: 12px;
                line-height: 1.3;
                color: rgb(142, 142, 142);
                text-align: start;
            }

            button {
                margin: 20px 52px 60px 52px;
                height: 44px;
            }

            .error-message {
                color: #ed4956;
                font-size: 14px;
                line-height: 18px;
                text-align: center;
                margin: 10px 40px;
            }
        }
    }
`;

export default function ResetPasswordForm() {
    const { search } = useLocation();
    const { username, code } = queryString.parse(
        search,
    ) as AuthType.resetPasswordQuery;
    const dispatch = useAppDispatch();
    const { errorMessage } = useAppSelector((state) => state.auth);

    const [newPasswordInputProps, newPasswordIsValid] = useInput(
        "",
        undefined,
        (value) => value.length >= 6,
    );

    const [reEnterPasswordInputProps, reEnterPasswordIsValid] = useInput(
        "",
        undefined,
        (value) => newPasswordInputProps.value === value,
    );

    useEffect(() => {
        dispatch(checkCurrentURL({ code, username }));
    }, []);

    const resetPasswordClickHandler = (
        event: MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
        dispatch(
            resetPassword({
                code,
                username,
                newPassword: newPasswordInputProps.value,
            }),
        );
    };

    return (
        <Container>
            <HeaderBeforeLogin currentPage="resetPassword" />
            <main>
                <div className="form-position">
                    <ContentBox padding="48px 0 0 0" margin="0 0">
                        <form className="form">
                            <div className="form-title">
                                보안 수준이 높은 비밀번호 만들기
                            </div>
                            <div className="form-description">
                                비밀번호는 6글자 이상이어야 하고, <br />
                                영문, 숫자를 포함해야 합니다. <br />
                                공백은 포함할 수 없습니다.
                            </div>
                            <span className="password-message">
                                {!newPasswordIsValid &&
                                    newPasswordInputProps.value.length !== 0 &&
                                    "비밀번호는 6자 이상이어야 합니다."}
                            </span>
                            <input
                                className="new-password-input"
                                placeholder="새 비밀번호"
                                type="password"
                                {...newPasswordInputProps}
                            ></input>
                            <span className="password-message">
                                {!reEnterPasswordIsValid &&
                                    reEnterPasswordInputProps.value.length !==
                                        0 &&
                                    "비밀번호가 일치하지 않습니다."}
                            </span>
                            <input
                                placeholder="새 비밀번호 다시 입력"
                                type="password"
                                {...reEnterPasswordInputProps}
                            ></input>
                            <SubmitButton
                                disabled={
                                    !(
                                        newPasswordIsValid &&
                                        reEnterPasswordIsValid
                                    )
                                }
                                onClick={resetPasswordClickHandler}
                            >
                                비밀번호 재설정
                            </SubmitButton>
                            {errorMessage && (
                                <div className="error-message">
                                    <p>{errorMessage}</p>
                                </div>
                            )}
                        </form>
                    </ContentBox>
                </div>
            </main>
        </Container>
    );
}
