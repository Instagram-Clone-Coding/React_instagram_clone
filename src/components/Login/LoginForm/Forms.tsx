import styled, { css } from "styled-components";
import ImgSprite from "components/Common/LoginSprite";
import { Link, Redirect } from "react-router-dom";
import Line from "components/Common/Line";
import FacebookLogin from "../../Common/FacebookLogin";
import Input from "components/Common/Input";
import { useState, MouseEvent } from "react";
import SubmitButton from "components/Common/SubmitButton";

import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { signIn } from "app/store/ducks/auth/signinThunk";
import { setUserName } from "app/store/ducks/auth/signinSlice";

export default function Forms() {
    return (
        <FormContainer>
            <ImgSprite
                width={instagramImage.width}
                height={instagramImage.height}
                position={instagramImage.position}
                className="logo"
            />
            <InputContainer>
                <InputForm>
                    <FlexColumn>
                        <LoginFormAndButton />
                        <Line />
                        <FacebookLogin bgColor="#fff" color="#385185" />
                    </FlexColumn>
                </InputForm>
                <Link to="/accounts/password/reset/">
                    비밀번호를 잊으셨나요?
                </Link>
            </InputContainer>
        </FormContainer>
    );
}

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

const LoginFormAndButton = () => {
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
};

// Props
const instagramImage: Login.ImageProps = {
    width: 175,
    height: 51,
    position: `0 -130px`,
};

const placeholder = {
    username: "사용자 이름",
    password: "비밀번호",
};

// style
const flexColumn = css`
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled.div`
    ${flexColumn}
    margin-bottom: 10px;
    max-width: 350px;
    width: 100%;

    a {
        margin-top: 12px;
        font-size: 12px;
        line-height: 16px;
        color: #385185;
        width: 100%;
        text-align: center;
        text-decoration: none;
    }
`;

const InputForm = styled.form`
    ${flexColumn}
    & > div {
        margin-top: 24px;
    }
`;

const FlexColumn = styled.div`
    ${flexColumn}
`;

const FormContainer = styled.div`
    .logo {
        margin: 22px auto 12px;
    }
`;
