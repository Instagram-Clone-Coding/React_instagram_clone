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
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
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

    const reg = /[0-9a-zA-Z]+/g;
    if (username.match(reg) === null) {
        return false;
    }
    return true;
};

export const isValidPassword = (password: string): Boolean => {
    if (!isValidLengthScope(password, 4, 20)) {
        return false;
    }
    return true;
};
