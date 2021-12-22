import styled, { css } from "styled-components";
import { imageProps, ImgSprite } from "components/Common/Sprite";

import { Link, useHistory } from "react-router-dom";
import React, { useRef, MouseEvent } from "react";
import Button from "UI/Button/Button";

import { useAppDispatch } from "app/hooks";
import { setUserInfo } from "features/Auth/authSlice";

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

export function Forms() {
    const dispatch = useAppDispatch();
    const history = useHistory();

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
                    <Div>
                        {/** id, password, btn, line, facebook */}
                        <Input innerText={placeholder.id} />
                        <Input innerText={placeholder.password} />
                        <LoginButton
                            onClick={(e) => callSignInAPI(e, dispatch, history)}
                        >
                            로그인
                        </LoginButton>
                        <Line />
                        <Facebook />
                    </Div>
                </InputForm>
                <Link to="/accounts/password/reset/">
                    비밀번호를 잊으셨나요?
                </Link>
            </InputContainer>
        </FormContainer>
    );
}

// interface
interface textProps {
    innerText: string;
}

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

const facebook: imageProps = {
    width: 16,
    height: 16,
    position: `-414px -259px`,
};

// component
function Input({ innerText }: textProps) {
    const textType = innerText === placeholder.id ? "text" : "password";

    const TextRef = useRef<HTMLSpanElement>(null);
    const InputRef = useRef<HTMLInputElement>(null);

    // input에 값이 있을 때, 설명 작게 조절
    const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
        const check = event.target.value.length;
        const explanText = TextRef.current;
        if (check) {
            explanText?.classList.add("small");
            InputRef.current?.classList.add("inputSmall");
        } else {
            explanText?.classList.remove("small");
            InputRef.current?.classList.remove("inputSmall");
        }
    };

    return (
        <Wrapper>
            <InputContent>
                <Label>
                    <Span ref={TextRef}>{innerText}</Span>
                    <WritingForm
                        onChange={handleText}
                        type={textType}
                        ref={InputRef}
                    />
                </Label>
                <State></State>
            </InputContent>
        </Wrapper>
    );
}

function Line() {
    return (
        <LineStyle>
            <div />
            <span>또는</span>
            <div />
        </LineStyle>
    );
}

function Facebook() {
    return (
        <FacebookStyle>
            <button>
                <ImgSprite
                    width={facebook.width}
                    height={facebook.height}
                    position={facebook.position}
                />
                <span>Facebook으로 로그인</span>
            </button>
        </FacebookStyle>
    );
}

// style
const flexColumn = css`
    display: flex;
    flex-direction: column;
`;

const Div = styled.div`
    ${flexColumn}
`;

const FormContainer = styled.div`
    .logo {
        margin: 22px auto 12px;
    }
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

const Wrapper = styled.div`
    margin: 0 40px 6px;
`;

const InputContent = styled.div`
    display: flex;
    font-size: 14px;
    position: relative;
    width: 100%;
    border: 1px solid ${(props) => props.theme.color.bd_gray};
    background-color: ${(props) => props.theme.color.bg_gray};
    border-radius: 3px;
`;

const Label = styled.label`
    height: 36px;
    flex: 1 0 0;
    padding: 0;
    margin: 0;
    min-width: 0;
    position: relative;
    cursor: text;

    // input에 값이 쓰이면 이벤트
    .small {
        transform: scale(0.83333) translateY(-10px);
        left: -15px;
    }
    .inputSmall {
        padding: 12px 0 2px 8px;
    }
`;

const Span = styled.span`
    color: #8e8e8e;
    font-size: 12px;
    height: 36px;
    left: 8px;
    line-height: 36px;
    position: absolute;
    right: 0;
`;

const WritingForm = styled.input`
    border: 0;
    flex: 1 0 auto;
    margin: 0;
    outline: 0;
    padding: 9px 0 7px 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    height: 100%;
    font-size: 12px;
`;

const State = styled.div`
    height: 100%;
    padding-right: 8px;
`;

const LoginButton = styled(Button)`
    margin: 8px 40px;
    opacity: 0.3;
`;

const LineStyle = styled.div`
    margin: 10px 40px 18px;
    display: flex;
    align-items: center;

    & > span {
        color: #8e8e8e;
        font-size: 13px;
        font-weight: ${(props) => props.theme.font.bold};
        margin: 0 18px;
        line-height: 15px;
    }

    & > div {
        background-color: ${(props) => props.theme.color.bd_gray};
        height: 1px;
        flex-grow: 1;
        flex-shrink: 1;
        top: 0.45em;
    }
`;

const FacebookStyle = styled.div`
    margin: 8px 40px;

    & > button {
        width: 100%;

        & > div {
            display: inline-block;
            margin-right: 8px;
        }

        & > span {
            color: #385185;
        }
    }
`;
