import Input from "components/Common/Input";
import { MouseEvent } from "react";
import SubmitButton from "components/Common/SubmitButton";

import { useAppDispatch } from "app/store/Hooks";
import { signIn } from "app/store/ducks/auth/authThunk";
import useInput from "hooks/useInput";

const placeholder = {
    username: "사용자 이름",
    password: "비밀번호",
};

const callSignInAPI = (
    dispatch: Function,
    userData: { username: string; password: string },
) => {
    const requestSignIn = async () => {
        await dispatch(
            signIn({
                username: userData.username,
                password: userData.password,
            }),
        );
    };
    requestSignIn();
};

export default function LoginFormAndButton() {
    const [usernameInputProps, usernameIsValid, usernameIsFocus] = useInput(
        "",
        undefined,
        (value) => value.length > 0,
    );
    const [passwordInputProps, passwordIsValid, passwordIsFocus] = useInput(
        "",
        undefined,
        (value) => value.length > 5,
    );

    const dispatch = useAppDispatch();

    const submitButtonClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        callSignInAPI(dispatch, {
            username: usernameInputProps.value,
            password: passwordInputProps.value,
        });
    };

    return (
        <>
            <Input
                type="text"
                inputName="username"
                innerText={placeholder.username}
                inputProps={usernameInputProps}
                isFocus={usernameIsFocus}
            />
            <Input
                type="password"
                inputName="password"
                innerText={placeholder.password}
                inputProps={passwordInputProps}
                isFocus={passwordIsFocus}
            />
            <SubmitButton
                type="submit"
                onClick={submitButtonClickHandler}
                disabled={!(usernameIsValid && passwordIsValid)}
            >
                로그인
            </SubmitButton>
        </>
    );
}
