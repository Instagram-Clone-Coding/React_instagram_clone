import { authAction } from "app/store/ducks/auth/authSlice";
import { useAppDispatch } from "app/store/Hooks";
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

    const dispatch = useAppDispatch();

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
                const {
                    data: { status },
                } = await customAxios.post(`/accounts/email`, {
                    email,
                    username,
                });
                if (status === 200) {
                    dispatch(authAction.changeFormState("confirmEmail"));
                    dispatch(
                        authAction.saveUserInputTemporary({
                            email: emailInputProps.value,
                            name: nameInputProps.value,
                            username: usernameInputProps.value,
                            password: passwordInputProps.value,
                        }),
                    );
                }
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
                hasValidator={emailFormValidator}
            />
            <Input
                inputName="name"
                type="text"
                innerText="성명"
                inputProps={nameInputProps}
                isValid={nameIsValid}
                isFocus={nameIsFocus}
                hasValidator={nameValidator}
            />
            <Input
                inputName="username"
                type="text"
                innerText="사용자 이름"
                inputProps={usernameInputProps}
                isValid={usernameIsValid}
                isFocus={usernameIsFocus}
                hasValidator={usernameValidator}
            />
            <Input
                inputName="password"
                type="password"
                innerText="비밀번호"
                inputProps={passwordInputProps}
                isValid={passwordIsValid}
                isFocus={passwordIsFocus}
                hasValidator={passwordValidator}
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
