const lengthScopeValidator = (
    value: string,
    minLength: number,
    maxLength: number,
): boolean => {
    const Length = value.length;
    return Length >= minLength && Length <= maxLength;
};

const hasSpecialChar = (value: string) => {
    const specialChar = /[^0-9a-zA-Z]/g;
    return specialChar.test(value);
};

export const emailFormValidator = (email: string): boolean => {
    const emailFormat =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return emailFormat.test(email);
};

export const nameValidator = (name: string): boolean => {
    return lengthScopeValidator(name, 2, 12);
};

export const usernameValidator = (username: string): boolean => {
    if (!lengthScopeValidator(username, 4, 12)) {
        return false;
    }

    return !hasSpecialChar(username);
};

export const passwordValidator = (password: string): boolean => {
    if (!lengthScopeValidator(password, 8, 20)) {
        return false;
    }

    if (hasSpecialChar(password)) {
        return false;
    }

    // 숫자,영어 최소 1개 있는지 체크하는 정규식
    // 참고) https://stackoverflow.com/questions/7684815/regex-pattern-to-match-at-least-1-number-and-1-character-in-a-string
    return /(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)/.test(password);
};
