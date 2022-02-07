import { authAction } from "app/store/ducks/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import Loading from "components/Common/Loading";
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
                const { data, message }: AuthType.Token =
                    await customAxios.post(`/reissue`);
                if (data) {
                    authorizedCustomAxios.defaults.headers.common[
                        `Authorization`
                    ] = `${data.type} ${data.accessToken}`;
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
