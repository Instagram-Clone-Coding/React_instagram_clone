import Home from "pages/Home";
import SignUp from "pages/SignUp";
import Login from "pages/Login";
import Direct from "pages/Direct";
import Profile from "pages/Profile";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "components/Common/Header";

import { useAppSelector } from "app/store/Hooks";

const Routes = () => {
    const { isLogin } = useAppSelector((state) => state.auth);
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
                        <Route path="/accounts/signin" component={Login} />
                        <Route
                            path="/accounts/emailsignup"
                            component={SignUp}
                        />

                        <Redirect to="/accounts/signin" />
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
