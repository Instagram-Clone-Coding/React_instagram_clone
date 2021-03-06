import { authAction } from "app/store/ducks/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import Input from "components/Common/Input";
import Loading from "components/Common/Loading";
import SubmitButton from "components/Auth/SubmitButton";
import {
    emailFormValidator,
    nameValidator,
    passwordValidator,
    usernameValidator,
} from "components/Auth/SignUpForm/validator";
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
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const dispatch = useAppDispatch();

    const signUpButtonClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(authAction.changeButtonLoadingState(true));

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
                dispatch(authAction.changeButtonLoadingState(false));

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
                dispatch(authAction.changeButtonLoadingState(false));
                // false?????? ?????????, ??????????????? ??????????????? ??????????????? ??? ??????????
                // ???????????? ????????? ????????????, ????????? ????????? ????????? ??????
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
                innerText="????????? ??????"
                inputProps={emailInputProps}
                isValid={emailIsValid}
                isFocus={emailIsFocus}
                hasValidator={emailFormValidator}
            />
            <Input
                inputName="name"
                type="text"
                innerText="??????"
                inputProps={nameInputProps}
                isValid={nameIsValid}
                isFocus={nameIsFocus}
                hasValidator={nameValidator}
            />
            <Input
                inputName="username"
                type="text"
                innerText="????????? ??????"
                inputProps={usernameInputProps}
                isValid={usernameIsValid}
                isFocus={usernameIsFocus}
                hasValidator={usernameValidator}
            />
            <Input
                inputName="password"
                type="password"
                innerText="????????????"
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
                {isLoading ? <Loading size={18} isInButton={true} /> : "??????"}
            </SubmitButton>
        </>
    );
}
