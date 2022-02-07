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
import { useEffect, useState } from "react";

export default function InputAndButton() {
    const [isValidUsername, setIsValidUsername] = useState<boolean | null>(
        null,
    );

    const [emailInputProps, emailIsValid, emailIsFocus] = useInput(
        "",
        emailFormValidator,
    );
    const [nameInputProps, nameIsValid, nameIsFocus] = useInput(
        "",
        nameValidator,
    );
    const [usernameInputProps, isValidUsernameBeforeAxios, usernameIsFocus] =
        useInput("", usernameValidator);
    const [passwordInputProps, passwordIsValid, passwordIsFocus] = useInput(
        "",
        passwordValidator,
    );

    useEffect(() => {
        const usernameValidatorWithDispatch = async (username: string) => {
            try {
                console.log(`db check`);
                const config = {
                    params: {
                        username,
                    },
                };
                const {
                    data: { data },
                } = await customAxios.post(`/accounts/check`, null, config);
                setIsValidUsername(data);
            } catch (error) {
                setIsValidUsername(null);
            }
        };

        isValidUsernameBeforeAxios &&
            usernameValidatorWithDispatch(usernameInputProps.value);
    }, [isValidUsernameBeforeAxios, usernameInputProps.onBlur]);
    // true -> true 체크가 안됨. -> onBlur 이벤트 발생 시?

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
                isValid={isValidUsernameBeforeAxios && isValidUsername}
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
                        isValidUsername &&
                        passwordIsValid
                    )
                }
            >
                가입
            </SubmitButton>
        </>
    );
}
