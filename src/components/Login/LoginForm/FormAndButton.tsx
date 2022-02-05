import Input from "components/Common/Input";
import { useState, MouseEvent, useRef } from "react";
import SubmitButton from "components/Common/SubmitButton";

import { useAppDispatch } from "app/store/Hooks";
import { signIn } from "app/store/ducks/auth/authThunk";

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
    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });
    const dispatch = useAppDispatch();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const submitButtonClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (usernameRef.current && passwordRef.current) {
            const newUserData = {
                username: usernameRef.current.value,
                password: passwordRef.current.value,
            };
            callSignInAPI(dispatch, newUserData);
            setUserData((prev) => ({ ...prev, ...newUserData }));
        }
    };

    return (
        <>
            <Input
                type="text"
                inputName="username"
                innerText={placeholder.username}
                ref={usernameRef}
            />
            <Input
                type="password"
                inputName="password"
                innerText={placeholder.password}
                ref={passwordRef}
            />
            <SubmitButton
                type="submit"
                onClick={submitButtonClickHandler}
                // disabled={
                //     userData.username.length > 0 && userData.password.length > 5
                //         ? false
                //         : true
                // }
                // click해야 user정보 가져오기때문에, 그 전에 계속 보고있으려면 어떻게 해야할까?
            >
                로그인
            </SubmitButton>
        </>
    );
}
