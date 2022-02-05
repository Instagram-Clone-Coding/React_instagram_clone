import { Token } from "app/store/ducks/auth/authThunk.type";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

var jwt = require(`jsonwebtoken`);

export const customAxios: AxiosInstance = axios.create({
    baseURL: `http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080`,
});

export const authorizedCustomAxios: AxiosInstance = axios.create({
    baseURL: `http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080`,
});

export const checkToken = async (config: AxiosRequestConfig) => {
    const accessToken =
        authorizedCustomAxios.defaults.headers.common.Authorization.split(
            " ",
        )[1];

    const decode = jwt.decode(accessToken);
    const nowDate = new Date().getTime() / 1000;

    console.log(accessToken);

    // 토큰 만료시간이 지났다면 !authorizedCustomAxios.defaults.headers
    if (decode.exp < nowDate) {
        try {
            const {
                data: { type, accessToken },
            }: AuthType.Token = await customAxios.post(`/reissue`);

            authorizedCustomAxios.defaults.headers.common[
                `Authorization`
            ] = `${type} ${accessToken}`;

            if (config.headers) {
                config.headers[`Authorization`] = `${type} ${accessToken}`;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    // } else {
    //     const accessToken =
    //         authorizedCustomAxios.defaults.headers.common.Authorization.split(
    //             " ",
    //         )[1];

    //     const decode = jwt.decode(accessToken);
    //     const nowDate = new Date().getTime() / 1000;

    //     if (decode?.exp < nowDate) {
    //     }
    // }
    return config; // 이거 실패 시, isLogin = false로 해서 화면 로그인으로
};

//  다른사람들은 어디 두는지 알아보기 **
export const saveToken = (token: Token) => {
    const { type, accessToken } = token.data;

    authorizedCustomAxios.defaults.headers.common[
        `Authorization`
    ] = `${type} ${accessToken}`;
};

authorizedCustomAxios.interceptors.request.use(checkToken);
