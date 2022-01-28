import { ChangeEvent, useState } from "react";

const useInput = (
    initialValue: string,
    onBlurValidator?: (value: string) => boolean,
) => {
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = event;
        if (onBlurValidator) {
            setIsValid(null);
        }
        setValue(value);
    };

    const resetValue = () => setValue("");

    const onBlur = () => {
        if (onBlurValidator) {
            setIsValid(onBlurValidator(value));
        }
    };

    return onBlurValidator
        ? [resetValue, isValid, { value, onChange, onBlur }]
        : [resetValue, { value, onChange }];
};

export default useInput;
