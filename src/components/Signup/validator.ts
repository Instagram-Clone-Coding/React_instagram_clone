const lengthScopeValidator = (
    value: string,
    minLength: number,
    maxLength: number,
): boolean => {
    const Length = value.length;
    return Length >= minLength && Length <= maxLength;
};

export const emailFormValidator = (email: string): boolean => {
    const reg =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const matchResult = email.match(reg);
    return matchResult === null ? false : true;
};

export const nameValidator = (name: string): boolean => {
    return lengthScopeValidator(name, 2, 8);
};

export const usernameValidator = (username: string): boolean => {
    if (!lengthScopeValidator(username, 4, 12)) {
        return false;
    }

    const reg = /[0-9a-zA-Z]+/g;
    if (username.match(reg) === null) {
        return false;
    }
    return true;
};

export const passwordValidator = (password: string): boolean => {
    if (!lengthScopeValidator(password, 4, 20)) {
        return false;
    }
    return true;
};
