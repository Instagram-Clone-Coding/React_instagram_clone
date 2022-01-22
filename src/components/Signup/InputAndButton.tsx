import Input from "components/Common/Input";
import SubmitButton from "components/Common/SubmitButton";
import { useState } from "react";

type inputName = "email" | "name" | "username" | "password";

const inputData: Array<[inputName, string]> = [
    ["email", "이메일 주소"],
    ["name", "성명"],
    ["username", "사용자 이름"],
    ["password", "비밀번호"],
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
                const [inputName, value] = data;
                const inputType =
                    inputName === "password" ? "password" : "text";

                return (
                    <Input
                        key={index}
                        value={userData[inputName]}
                        inputName={inputName}
                        type={inputType}
                        innerText={value}
                        onUserDataUpdater={changeUserData}
                    />
                );
            })}
            <SubmitButton disabled>가입</SubmitButton>
        </>
    );
}
