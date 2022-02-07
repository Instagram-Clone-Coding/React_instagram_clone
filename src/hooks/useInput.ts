import { ChangeEvent, useState } from "react";

type ReturnType = [
    Login.useInputProps,
    boolean | null,
    boolean,
    () => void,
    () => void,
];

const useInput = (
    initialValue: string,
    onBlurValidator?: (value: string) => boolean,
    onChangeValidator?: (value: string) => boolean,
): ReturnType => {
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        onChangeValidator && setIsValid(onChangeValidator(value));
    };

    const onFocus = () => {
        setIsFocus(true);
        onBlurValidator && !isValid && setIsValid(null);
    };

    const resetValue = () => setValue("");
    const resetIsValid = () => setIsValid(null);

    const onBlur = () => {
        setIsFocus(false);
        onBlurValidator && setIsValid(onBlurValidator(value));
    };

    return [
        onBlurValidator
            ? { value, onChange, onBlur, onFocus }
            : onChangeValidator
            ? { value, onChange, onFocus }
            : { value, onChange },
        isValid,
        isFocus,
        resetValue,
        resetIsValid,
    ];
};

export default useInput;
