import Input from "components/Common/Input";
import { useState, MouseEvent } from "react";
import SubmitButton from "components/Common/SubmitButton";

import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { signIn } from "app/store/ducks/auth/signinThunk";
import { setUserName } from "app/store/ducks/auth/signinSlice";
import { Redirect } from "react-router-dom";

const placeholder = {
    username: "사용자 이름",
    password: "비밀번호",
};

const callSignInAPI = (
    e: MouseEvent<HTMLButtonElement>,
    dispatch: Function,
    userData: { username: string; password: string },
) => {
    e.preventDefault();
    const requestSignIn = async () =>
        await dispatch(
            signIn({
                username: userData.username,
                password: userData.password,
            }),
        ).unwrap(); // try catch하기 -> 에러처리
    requestSignIn();
};

export default function LoginFormAndButton() {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
    }); // useReducer

    const changeUserData = (changed: {
        username?: string;
        password?: string;
    }) => {
        setUserData((prev) => ({ ...prev, ...changed }));
    };

    const dispatch = useAppDispatch();
    const isLogin = useAppSelector((state) => state.auth.isLogin);
    if (isLogin) {
        dispatch(setUserName({ username: userData.username })); // thunk에서 처리하기
        return <Redirect to="/" />; // 해당 라우트 최상단에서 처리 **
    }

    return (
        <>
            <Input
                value={userData.username}
                type="text"
                inputName="username"
                innerText={placeholder.username}
                onUserDataUpdater={changeUserData}
            />
            <Input
                value={userData.password}
                type="password"
                inputName="password"
                innerText={placeholder.password}
                onUserDataUpdater={changeUserData}
            />
            <SubmitButton
                type="submit"
                disabled={
                    userData.username.length > 0 && userData.password.length > 5
                        ? false
                        : true
                }
                onClick={(e) => callSignInAPI(e, dispatch, userData)}
            >
                로그인
            </SubmitButton>
        </>
    );
}
