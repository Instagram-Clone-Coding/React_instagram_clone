import { ChangeEvent, useState } from "react";

const useInput = (
    initialValue: string,
    onBlurValidator?: (value: string) => boolean,
) => {
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const onFocus = () => {
        !isValid && setIsValid(null);
    };

    const resetValue = () => setValue("");

    const onBlur = () => {
        onBlurValidator && setIsValid(onBlurValidator(value));
    };

    return onBlurValidator
        ? [resetValue, isValid, { value, onChange, onBlur, onFocus }]
        : [resetValue, { value, onChange }];
};

export default useInput;