export interface SignInRequestType {
    id: string;
    password: string;
}

export interface Token {
    status: number;
    code: number;
    message: string;
    data: {
        type: string;
        accessToken: string;
        refreshToken: string;
        accessTokenExpires: string;
    };
}
