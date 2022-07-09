import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

var jwt = require(`jsonwebtoken`);

export const customAxios: AxiosInstance = axios.create({
    baseURL: `http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080`,
    withCredentials: true,
});

export const authorizedCustomAxios: AxiosInstance = axios.create({
    baseURL: `http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080`,
    withCredentials: true,
});

export const checkToken = async (config: AxiosRequestConfig) => {
    const accessToken =
        authorizedCustomAxios.defaults.headers.common.Authorization.split(
            " ",
        )[1];
    console.log(accessToken);
    const decode = jwt.decode(accessToken);
    const nowDate = new Date().getTime() / 1000;
    if (decode.exp < nowDate) {
        try {
            const {
                data: { data },
            }: {
                data: AuthType.TokenResponse;
            } = await customAxios.post(`/reissue`);
            if (data) {
                setAccessTokenInAxiosHeaders(data);
                if (config.headers) {
                    config.headers[
                        `Authorization`
                    ] = `${data.type} ${data.accessToken}`;
                }
            }
        } catch (error) {
            // 토큰재발급 실패한 경우(refresh token만료)
            window.location.replace("/");
        }
    }
    return config;
};

export const setAccessTokenInAxiosHeaders = (token: AuthType.Token) => {
    authorizedCustomAxios.defaults.headers.common[
        `Authorization`
    ] = `${token.type} ${token.accessToken}`;
};

authorizedCustomAxios.interceptors.request.use(checkToken);
