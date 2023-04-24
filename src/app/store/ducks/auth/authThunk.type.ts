export interface SignInRequestType {
    username: string;
    password: string;
}

export type FormState = "signUp" | "confirmEmail" | "signIn";

export type LoginDevice = {
    tokenId: string;
    location: {
        city: string;
        longitude: string;
        latitude: string;
    };
    device: string;
    lastLoginDate: string;
    current: boolean;
};
