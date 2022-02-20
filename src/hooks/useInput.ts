import { usernameValidator } from "components/Signup/validator";
import { customAxios } from "customAxios";
import { ChangeEvent, useState } from "react";

type ReturnType = [Login.useInputProps, boolean | null, boolean, () => void];

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

    const onBlur = () => {
        setIsFocus(false);
        if (onBlurValidator) {
            const validResult = onBlurValidator(value);
            setIsValid(validResult);

            if (onBlurValidator === usernameValidator) {
                const usernameValidatorWithDispatch = async (
                    username: string,
                ) => {
                    try {
                        console.log(`db check`);
                        const config = {
                            params: {
                                username,
                            },
                        };
                        const {
                            data: { data },
                        } = await customAxios.post(
                            `/accounts/check`,
                            null,
                            config,
                        );
                        setIsValid(data);
                    } catch (error) {
                        setIsValid(null);
                    }
                };
                validResult && usernameValidatorWithDispatch(value);
            }
        }
    };

    return [
        onBlurValidator || onChangeValidator
            ? { value, onChange, onBlur, onFocus }
            : { value, onChange },
        isValid,
        isFocus,
        resetValue,
    ];
};

export default useInput;
