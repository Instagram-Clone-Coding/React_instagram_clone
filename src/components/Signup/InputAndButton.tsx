import Input from "components/Common/Input";
import SubmitButton from "components/Common/SubmitButton";
import {
    emailFormValidator,
    nameValidator,
    passwordValidator,
    usernameValidator,
} from "components/Signup/validator";
import { customAxios } from "customAxios";
import useInput from "hooks/useInput";
import { MouseEvent } from "react";

export default function InputAndButton() {
    const [emailInputProps, emailIsValid, emailIsFocus] = useInput(
        "",
        emailFormValidator,
    );
    const [nameInputProps, nameIsValid, nameIsFocus] = useInput(
        "",
        nameValidator,
    );
    const [usernameInputProps, usernameIsValid, usernameIsFocus] = useInput(
        "",
        usernameValidator,
    );
    const [passwordInputProps, passwordIsValid, passwordIsFocus] = useInput(
        "",
        passwordValidator,
    );

    const signUpButtonClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const callEmailConfirmAPI = async ({
            email,
            username,
        }: {
            email: string;
            username: string;
        }) => {
            try {
                await customAxios.post(`/accounts/email`, {
                    email,
                    username,
                });
            } catch (error) {
                console.log(error, `user email confirm api error`);
            }
        };
        callEmailConfirmAPI({
            email: emailInputProps.value,
            username: usernameInputProps.value,
        });
    };

    return (
        <>
            <Input
                inputName="email"
                type="text"
                innerText="이메일 주소"
                inputProps={emailInputProps}
                isValid={emailIsValid}
                isFocus={emailIsFocus}
            />
            <Input
                inputName="name"
                type="text"
                innerText="성명"
                inputProps={nameInputProps}
                isValid={nameIsValid}
                isFocus={nameIsFocus}
            />
            <Input
                inputName="username"
                type="text"
                innerText="사용자 이름"
                inputProps={usernameInputProps}
                isValid={usernameIsValid}
                isFocus={usernameIsFocus}
            />
            <Input
                inputName="password"
                type="password"
                innerText="비밀번호"
                inputProps={passwordInputProps}
                isValid={passwordIsValid}
                isFocus={passwordIsFocus}
            />
            <SubmitButton
                disabled={
                    !(
                        emailIsValid &&
                        nameIsValid &&
                        usernameIsValid &&
                        passwordIsValid
                    )
                }
                onClick={signUpButtonClickHandler}
            >
                가입
            </SubmitButton>
        </>
    );
}
