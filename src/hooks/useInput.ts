import { usernameValidator } from "components/Auth/SignUpForm/validator";
import { customAxios } from "customAxios";
import { ChangeEvent, useState } from "react";

type ReturnType = [AuthType.useInputProps, boolean | null, boolean, () => void];

const useInput = (
    initialValue: string,
    onBlurValidator?: (value: string) => boolean,
    onChangeValidator?: (value: string) => boolean,
): ReturnType => {
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const processdValue = event.target.value.trim();
        setValue(processdValue);
        onChangeValidator && setIsValid(onChangeValidator(processdValue));
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
                        const config = {
                            params: {
                                username,
                            },
                        };
                        const {
                            data: { data },
                        } = await customAxios.get(`/accounts/check`, config);
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
