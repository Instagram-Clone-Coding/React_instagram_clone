import styled, { css } from "styled-components";
import { imageProps, ImgSprite } from "components/common/Sprite";
import { Link } from "react-router-dom";
import React, { useRef } from "react";

export function Forms() {
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
                    <div>
                        {/** id, password, btn, line, facebook */}
                        <Input innerText={placeholder.id} />
                        <Input innerText={placeholder.password} />
                    </div>
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

// component
function Input({ innerText }: textProps) {
    const textType = innerText === placeholder.id ? "text" : "password";

    const TextRef = useRef<HTMLSpanElement>(null);
    const InputRef = useRef<HTMLInputElement>(null);

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
        <Div>
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
        </Div>
    );
}

// style
const FormContainer = styled.div`
    .logo {
        margin: 22px auto 12px;
    }
`;

const InputContainer = styled.div`
    margin-bottom: 10px;
    max-width: 350px;
    width: 100%;
`;

const InputForm = styled.form`
    display: flex;
    flex-direction: column;
    & > div {
        margin-top: 24px;
    }
`;

const Div = styled.div`
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
