import { authAction } from "app/store/ducks/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/store/Hooks";
import { customAxios, setAccessTokenInAxiosHeaders } from "customAxios";
import InstagramLoading from "InstagramLoading";
import { useEffect } from "react";
import Routes from "Routes";

function App() {
    const isRefreshTokenChecking = useAppSelector(
        (state) => state.auth.isRefreshTokenChecking,
    );
    const dispatch = useAppDispatch();
    useEffect(() => {
        const reIssueToken = async () => {
            try {
                const {
                    data: { data },
                }: {
                    data: AuthType.TokenResponse;
                } = await customAxios.post(`/reissue`);
                if (data) {
                    setAccessTokenInAxiosHeaders(data);
                    dispatch(authAction.login());
                }
                // - refresh token: 없음 | 만료됨 -> 401에러 -> catch로 넘어감
            } finally {
                dispatch(authAction.finishRefreshTokenChecking());
            }
        };
        reIssueToken();
    }, [dispatch]);

    return (
        <div className="App">
            {isRefreshTokenChecking ? <InstagramLoading /> : <Routes />}
        </div>
    );
}

export default App;
