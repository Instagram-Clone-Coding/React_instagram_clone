import Input from "components/Common/Input";
import SubmitButton from "components/Common/SubmitButton";
import { useState } from "react";

export default function InputAndButton() {
    const [userData, setUserData] = useState({
        name: "",
        password: "",
        phone: "",
        username: "",
    });

    const changeUserData = (changed: {
        name?: string;
        password?: string;
        phone?: string;
        username?: string;
    }) => {
        setUserData({ ...userData, ...changed });
    };

    return (
        <>
            {inputData.map((data, index) => {
                return (
                    <Input
                        key={index}
                        inputName={data[0]}
                        innerText={data[1]}
                        setUserData={changeUserData}
                    />
                );
            })}
            <SubmitButton disabled>가입</SubmitButton>
        </>
    );
}

const inputData = [
    ["phone", "휴대폰 번호 또는 이메일 주소"],
    ["name", "성명"],
    ["username", "사용자 이름"],
    ["password", "비밀번호"],
];
