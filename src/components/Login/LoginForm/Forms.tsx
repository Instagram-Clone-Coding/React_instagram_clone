import styled, { css } from "styled-components";
import ImgSprite from "components/common/Sprite";
import { Link } from "react-router-dom";
import Button from "UI/Button/Button";
import Line from "components/common/Line";
import Facebook from "./FacebookLogin";
import { imageProps } from "../types";
import Input from "components/common/Input";
import { useState } from "react";

export default function Forms() {
    return (
        <FormContainer>
            <ImgSprite
                width={test.width}
                height={test.height}
                position={test.position}
                className="logo"
            />
            <InputContainer>
                <InputForm>
                    <FlexColumn>
                        <LoginFormAndButton />
                        <Line />
                        <Facebook />
                    </FlexColumn>
                </InputForm>
                <Link to="/accounts/password/reset/">
                    비밀번호를 잊으셨나요?
                </Link>
            </InputContainer>
        </FormContainer>
    );
}

const LoginFormAndButton = () => {
    const [userData, setUserData] = useState({
        id: "",
        password: "",
    });

    const changeUserData = (changed: { id?: string; password?: string }) => {
        setUserData({ ...userData, ...changed });
    };

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
            <LoginButton
                type="submit"
                disabled={
                    userData.id.length > 0 && userData.password.length > 5
                        ? false
                        : true
                }
            >
                로그인
            </LoginButton>
        </>
    );
};

// Props
const test: imageProps = {
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

const LoginButton = styled(Button)`
    margin: 8px 40px;
    opacity: 1;
    border: 1px solid transparent;
    &:disabled {
        opacity: 0.3;
        pointer-events: none;
    }
`;
