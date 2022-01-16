import styled, { css } from "styled-components";
import ImgSprite from "components/Common/LoginSprite";
import { Link, useHistory } from "react-router-dom";
import Line from "components/Common/Line";
import FacebookLogin from "../../Common/FacebookLogin";
import Input from "components/Common/Input";
import { useState, MouseEvent } from "react";
import SubmitButton from "components/Common/SubmitButton";

import { useAppDispatch } from "app/store/hooks";
import { setUserInfo } from "features/Auth/authSlice";

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
    history: any,
) => {
    e.preventDefault();
    dispatch(
        setUserInfo({
            name: "minsoo",
        }),
    );
    history.replace("/");
};

const LoginFormAndButton = () => {
    const [userData, setUserData] = useState({
        id: "",
        password: "",
    });

    const changeUserData = (changed: { id?: string; password?: string }) => {
        setUserData({ ...userData, ...changed });
    };

    const dispatch = useAppDispatch();
    const history = useHistory();

    return (
        <>
            <Input
                innerText={placeholder.id}
                inputName="id"
                setUserData={changeUserData}
            />
            <Input
                innerText={placeholder.password}
                inputName="password"
                setUserData={changeUserData}
            />
            <SubmitButton
                type="submit"
                disabled={
                    userData.id.length > 0 && userData.password.length > 5
                        ? false
                        : true
                }
                onClick={(e) => callSignInAPI(e, dispatch, history)}
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
    id: "전화번호, 사용자 이름 또는 이메일",
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
