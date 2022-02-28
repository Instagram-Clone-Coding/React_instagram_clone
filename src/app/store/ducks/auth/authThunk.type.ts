export interface SignInRequestType {
    username: string;
    password: string;
}

export interface Token {
    status: number;
    code: number;
    message: string;
    data: {
        type: string;
        accessToken: string;
    };
}

export type FormState = "signUp" | "confirmEmail" | "signIn";

//해당 thunk 안에서만 쓰면 여기에
