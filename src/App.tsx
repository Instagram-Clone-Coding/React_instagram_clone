import { authAction } from "app/store/ducks/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { authorizedCustomAxios, customAxios } from "customAxios";
import InstagramLoading from "InstagramLoading";
import { useEffect } from "react";
import Routes from "Routes";
import { EXPIRED_TOKEN_MESSAGE, INVALID_TOKEN_MESSAGE } from "utils/constant";

function App() {
    const isRefreshTokenChecking = useAppSelector(
        (state) => state.auth.isRefreshTokenChecking,
    );
    const dispatch = useAppDispatch();
    useEffect(() => {
        const reIssueToken = async () => {
            try {
                const {
                    data: { data, message },
                }: {
                    data: AuthType.Token;
                } = await customAxios.post(`/reissue`);
                console.log(`토큰 재발급 응답값: ${data}`);

                if (data) {
                    authorizedCustomAxios.defaults.headers.common[
                        `Authorization`
                    ] = `${data.type} ${data.accessToken}`;
                    console.log(
                        `defaults headers로 accessToken 저장한 후, 
                        저장된 값:${
                            authorizedCustomAxios.defaults.headers.common[
                                `Authorization`
                            ]
                        }`,
                    );
                    dispatch(authAction.login());
                } else if (
                    message === INVALID_TOKEN_MESSAGE ||
                    message === EXPIRED_TOKEN_MESSAGE
                ) {
                    dispatch(authAction.logout());
                }
            } catch (error) {
                dispatch(authAction.logout());
                dispatch(authAction.finishRefreshTokenChecking());
            }
        };
        reIssueToken().then(() => {
            dispatch(authAction.finishRefreshTokenChecking());
        });
        // return () => {};
    }, [dispatch]);

    return (
        <div className="App">
            {isRefreshTokenChecking ? <InstagramLoading /> : <Routes />}
        </div>
    );
}

export default App;
