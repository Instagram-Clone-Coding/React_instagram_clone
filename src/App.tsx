import { authAction } from "app/store/ducks/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { customAxios, setAccessTokenInAxiosHeaders } from "customAxios";
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
                    data: AuthType.TokenResponse;
                } = await customAxios.post(`/reissue`);
                if (data) {
                    setAccessTokenInAxiosHeaders(data);
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
            dispatch(authAction.finishRefreshTokenChecking()); // finally로 빼기
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
