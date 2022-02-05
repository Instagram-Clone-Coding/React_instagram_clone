import { ChangeEvent, useState } from "react";

type ReturnType = [
    () => void,
    {
        value: string;
        onChange: (event: ChangeEvent<HTMLInputElement>) => void;
        onBlur?: () => void;
        onFocus?: () => void;
    },
    (Boolean | null)?,
    Boolean?,
];

const useInput = (
    initialValue: string,
    onBlurValidator?: Function,
): ReturnType => {
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const onFocus = () => {
        setIsFocus(true);
        !isValid && setIsValid(null);
    };

    const resetValue = () => setValue("");

    const onBlur = () => {
        setIsFocus(false);
        onBlurValidator && setIsValid(onBlurValidator(value));
    };

    return onBlurValidator
        ? [resetValue, { value, onChange, onBlur, onFocus }, isValid, isFocus]
        : [resetValue, { value, onChange }];
};

export default useInput;
