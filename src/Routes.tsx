import Home from "pages/Home";
import Direct from "pages/Direct";
import Profile from "pages/Profile";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "components/Common/Header";

import { useAppSelector } from "app/store/Hooks";
import Landing from "pages/Landing";
import AuthPage from "pages/Auth";
import ResetPassword from "components/Auth/ResetPassword";
import ResetPasswordForm from "components/Auth/ResetPassword/ResetPasswordForm";
import Edit from "pages/Edit";
import Paragraph from "pages/Paragraph/Paragraph";
import ModalsInEveryRoutes from "ModalsInEveryRoutes";

const Routes = () => {
    const isLogin = useAppSelector((state) => state.auth.isLogin);

    return (
        <>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                {/* {!isLogin ? (
                    <Redirect to="/accounts/signin" />
                ) : (
                    <Route component={AuthedContainer} />
                )} */}
                {isLogin ? (
                    <Switch>
                        {AuthedContainer()}
                        {/*<Header />*/}
                        {/*<Route exact path="/" component={Home} />*/}
                        {/*<Redirect to="/" />*/}
                        {/* 인스타그램에서는 404처리 하지만 일단 rediect 처리 */}
                    </Switch>
                ) : (
                    <Switch>
                        {/* <Route exact path="/" component={Home} /> */}
                        <Route exact path="/" component={Landing} />
                        <Route path="/accounts/emailsignup">
                            <AuthPage router="signUp" />
                        </Route>
                        <Route path="/accounts/login">
                            <AuthPage router="signIn" />
                        </Route>
                        <Route
                            exact
                            path="/accounts/password/reset/"
                            component={ResetPassword}
                        />
                        <Route
                            path="/accounts/password/reset/confirm"
                            component={ResetPasswordForm}
                        />
                        <Route path="/error">
                            <h1>404 page</h1>
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                )}
            </BrowserRouter>
        </>
    );
};

const AuthedContainer = () => {
    return (
        <>
            <ModalsInEveryRoutes />

            <Header />
            <Route path="/profile/:username" component={Profile} />
            <Route path="/accounts/edit" component={Edit} />

            <Route exact path="/" component={Home} />
            {/* Direct */}
            <Route path="/direct" component={Direct} />
            <Route path="/p/:postId" component={Paragraph} />
            {/* 404 페이지 필요*/}
        </>
    );
};

export default Routes;
