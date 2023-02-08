import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

var jwt = require(`jsonwebtoken`);

export const customAxios: AxiosInstance = axios.create({
    baseURL: `http://ec2-52-79-71-191.ap-northeast-2.compute.amazonaws.com:8080`,
    withCredentials: true,
});

export const authorizedCustomAxios: AxiosInstance = axios.create({
    baseURL: `http://ec2-52-79-71-191.ap-northeast-2.compute.amazonaws.com:8080`,
    withCredentials: true,
});

export const checkToken = async (config: AxiosRequestConfig) => {
    const accessToken =
        authorizedCustomAxios.defaults.headers.common.Authorization.split(
            " ",
        )[1];
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
            // 토큰재발급 실패한 경우(refreshToken 쿠키 제거 - httpOnly쿠키라, 백엔드에서만 제거가능)
            customAxios.post(`/logout/only/cookie`);
            window.location.replace("/"); // FIXME: 새로고침 => 토큰 재발급 불필요하게 호출 **
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
