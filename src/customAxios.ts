import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import {
    EXPIRED_TOKEN_MESSAGE,
    FAIL_TO_REISSUE_MESSAGE,
    INVALID_TOKEN_MESSAGE,
} from "utils/constant";

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

    const decode = jwt.decode(accessToken);
    const nowDate = new Date().getTime() / 1000;

    // 토큰 만료시간이 지났다면 !authorizedCustomAxios.defaults.headers
    if (decode.exp < nowDate) {
        try {
            const {
                data: { data, message },
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
            } else if (
                message === INVALID_TOKEN_MESSAGE ||
                message === EXPIRED_TOKEN_MESSAGE
            ) {
                return Promise.reject(FAIL_TO_REISSUE_MESSAGE);
            }
        } catch (error) {
            return Promise.reject(FAIL_TO_REISSUE_MESSAGE);
        }
    }
    return config; // 이거 실패 시, isLogin = false로 해서 화면 로그인으로
};

export const setAccessTokenInAxiosHeaders = (token: AuthType.Token) => {
    authorizedCustomAxios.defaults.headers.common[
        `Authorization`
    ] = `${token.type} ${token.accessToken}`;
};

authorizedCustomAxios.interceptors.request.use(checkToken);
