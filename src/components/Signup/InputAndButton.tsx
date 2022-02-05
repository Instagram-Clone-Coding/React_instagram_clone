import { useState } from "react";
import Input from "components/Common/Input";
import SubmitButton from "components/Common/SubmitButton";
import {
    isValidEmailForm,
    isValidName,
    isValidPassword,
    isValidUsername,
} from "components/Signup/validator";

type inputName = "email" | "name" | "username" | "password";

const inputData: Array<[inputName, string, Function]> = [
    ["email", "이메일 주소", isValidEmailForm],
    ["name", "성명", isValidName],
    ["username", "사용자 이름", isValidUsername],
    ["password", "비밀번호", isValidPassword],
];

export default function InputAndButton() {
    const [userData, setUserData] = useState({
        name: "",
        password: "",
        email: "",
        username: "",
    });

    const changeUserData = (changed: {
        name?: string;
        password?: string;
        email?: string;
        username?: string;
    }) => {
        setUserData((prevUserData) => ({ ...prevUserData, ...changed }));
    };

    return (
        <>
            {inputData.map((data, index) => {
                const [inputName, value, validator] = data;
                const inputType =
                    inputName === "password" ? "password" : "text";

                return (
                    <Input
                        key={index}
                        inputName={inputName}
                        type={inputType}
                        innerText={value}
                        validator={validator}
                    />
                );
            })}
            <SubmitButton disabled>가입</SubmitButton>
        </>
    );
}
