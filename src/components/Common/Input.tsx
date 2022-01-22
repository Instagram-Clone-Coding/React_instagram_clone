import styled, { css } from "styled-components";
import React, { useState } from "react";

interface InputProps {
    isSmallInnerText: boolean;
}

const InputContainer = styled.div<InputProps>`
    margin: 0 40px 6px;

    .inputContent {
        display: flex;
        font-size: 14px;
        position: relative;
        width: 100%;
        border: 1px solid ${(props) => props.theme.color.bd_gray};
        background-color: ${(props) => props.theme.color.bg_gray};
        border-radius: 3px;
        align-items: center;
    }

    .placeholder {
        height: 36px;
        flex: 1 0 0;
        padding: 0;
        margin: 0;
        min-width: 0;
        position: relative;
        cursor: text;

        .innerText {
            color: #8e8e8e;
            font-size: 12px;
            height: 36px;
            left: 8px;
            line-height: 36px;
            position: absolute;
            right: 0;
            transform-origin: left;
            user-select: none;
            transition: transform ease-out 0.1s;
            ${(props) =>
                props.isSmallInnerText &&
                css`
                    transform: scale(0.83333) translateY(-10px);
                `}
        }

        .writingForm {
            border: 0;
            flex: 1 0 auto;
            margin: 0;
            outline: 0;
            padding: ${(props) =>
                props.isSmallInnerText ? "14px 0 2px 8px" : "9px 0 7px 8px"};
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            height: 100%;
            font-size: 12px;
        }
    }

    .isShowPassword {
        height: 100%;
        padding-right: 8px;

        .showPassword {
            user-select: none;
        }
    }
`;

export default function Input(props: Login.InputProps) {
    const { innerText, onUserDataUpdater, type, inputName, value } = props;

    const [isSmallInnerText, setInnerTextSize] = useState(false);
    const [inputType, setInputType] = useState(type);
    const [isShowPassword, setShowPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState<
        "비밀번호 표시" | "숨기기"
    >("비밀번호 표시");

    const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const userInput = { [name]: value };
        const hasValue = value.length ? true : false;
        onUserDataUpdater(userInput);
        setInnerTextSize(hasValue);
        setShowPassword(inputName === "password" && hasValue);
    };

    const handlePasswordBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setInputType(inputType === "password" ? "text" : "password");
        setPasswordMessage(
            inputType === "password" ? "숨기기" : "비밀번호 표시",
        );
    };

    return (
        <InputContainer isSmallInnerText={isSmallInnerText}>
            <div className="inputContent">
                <label className="placeholder">
                    <span className="innerText">{innerText}</span>
                    <input
                        className="writingForm"
                        // onBlur={}
                        onChange={handleText}
                        type={inputType}
                        value={value}
                        name={inputName}
                    />
                </label>
                <div className="isShowPassword">
                    {isShowPassword && (
                        <button
                            className="showPassword"
                            type="button"
                            onClick={handlePasswordBtn}
                        >
                            {passwordMessage}
                        </button>
                    )}
                </div>
            </div>
        </InputContainer>
    );
}
