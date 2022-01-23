import axios from "axios";

const isValidLengthScope = (
    value: string,
    minLength: number,
    maxLength: number,
): Boolean => {
    const Length = value.length;
    return Length >= minLength && Length <= maxLength;
};

export const isValidEmailForm = (email: string): Boolean => {
    const reg =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const matchResult = email.match(reg);
    return matchResult === null ? false : true;
};

export const isValidName = (name: string): Boolean => {
    return isValidLengthScope(name, 2, 8);
};

export const isValidUsername = (username: string): Boolean => {
    if (!isValidLengthScope(username, 4, 12)) {
        return false;
    }
    const reg = /[0-9a-zA-Z]/g;
    if (username.match(reg) === null) {
        return false;
    }

    const checkUnique = async () => {
        const { data } = await axios.post(
            `http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080/accounts/check?username=${username}`,
        );
        return data;
    };

    return true;
};

export const isValidPassword = (value: string) => {};
