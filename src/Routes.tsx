import Home from "pages/Home";
import Direct from "pages/Direct";
import Profile from "pages/Profile";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "components/Common/Header";

import { useAppSelector } from "app/store/Hooks";
import Landing from "pages/Landing";
import AuthPage from "pages/Auth";
import ResetPasswordForm from "components/Auth/ResetPassword";
import Edit from "pages/Edit";

const Routes = () => {
    const isLogin = useAppSelector((state) => state.auth.isLogin);

    return (
        <>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Switch>
                    {/* {!isLogin ? (
                    <Redirect to="/accounts/signin" />
                ) : (
                    <Route component={AuthedContainer} />
                )} */}
                    {isLogin ? (
                        <>
                            {AuthedContainer()}
                            {/*<Header />*/}
                            {/*<Route exact path="/" component={Home} />*/}
                            {/*<Redirect to="/" />*/}
                            {/* 인스타그램에서는 404처리 하지만 일단 rediect 처리 */}
                        </>
                    ) : (
                        <>
                            {/* <Route exact path="/" component={Home} /> */}
                            <Route exact path="/" component={Landing} />
                            <Route path="/accounts/emailsignup">
                                <AuthPage router="signUp" />
                            </Route>
                            <Route path="/accounts/login">
                                <AuthPage router="signIn" />
                            </Route>
                            <Route
                                path="/accounts/password/reset/"
                                component={ResetPasswordForm}
                            />
                            <Redirect to="/" />
                        </>
                    )}
                </Switch>
            </BrowserRouter>
        </>
    );
};

const AuthedContainer = () => {
    return (
        <>
            <Header />
            <Route path="/profile/:username" component={Profile} />
            <Route path="/accounts/edit" component={Edit} />

            <Route exact path="/" component={Home} />
            {/* Direct */}
            <Route path="/direct" component={Direct} />
            {/*  */}
            <Route path="*">
                <Redirect to="/" />
            </Route>
        </>
    );
};

export default Routes;
