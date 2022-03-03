export interface SignInRequestType {
    username: string;
    password: string;
}

export type FormState = "signUp" | "confirmEmail" | "signIn";
