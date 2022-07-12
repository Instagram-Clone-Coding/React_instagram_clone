import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

var jwt = require(`jsonwebtoken`);

export const customAxios: AxiosInstance = axios.create({
    baseURL: `http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080`,
    withCredentials: true,
});
// customAxios interceptor -> url: reissue, method: post인 케이스만 따로 처리 **

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
    if (decode.exp < nowDate) {
        // FIXME: ! 바꿔야한디 !
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
            // 새로고침 => 토큰 재발급 불필요하게 호출 **
            // TODO: want : isLogin = false;
            // access token을 처리할 필요는 없어. 왜냐면 access token이 만료돼서 호출한 토큰재발급이 실패한거니까
            // 근데 문제는, 제거한다고, 바로 로그인페이지로 안가. 왜냐고? isLogin이 바뀌지 않잖아.
            // 그럼 계속 홈에 있을거고, 계속 여기로와서 저 api를 계속 호출하고, 실제로 유저가 보기엔 먹통이겠지?
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
