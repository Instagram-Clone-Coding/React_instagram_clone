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
