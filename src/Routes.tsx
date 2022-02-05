import Home from "pages/Home";
import SignUp from "pages/SignUp";
import Login from "pages/Login";
import Direct from "pages/Direct";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "components/Common/Header";

import { useAppSelector } from "app/store/Hooks";

const Routes = () => {
    const { isLogin } = useAppSelector((state) => state.auth);

    return (
        <BrowserRouter>
            <Switch>
                {/* {!isLogin ? (
                    <Redirect to="/accounts/signin" />
                ) : (
                    <Route component={AuthedContainer} />
                )} */}
                {isLogin ? (
                    <>
                        <Route exact path="/" component={Home} />
                        <Redirect to="/" />
                    </>
                ) : (
                    <>
                        <Route exact path="/" component={Home} />
                        <Route path="/accounts/signin" component={Login} />
                        {/* <Route
                            path="/accounts/emailsignup"
                            component={SignUp}
                        /> */}
                        {/* <Redirect to="/accounts/signin" /> */}
                    </>
                )}
            </Switch>
        </BrowserRouter>
    );
};

const AuthedContainer = () => {
    return (
        <>
            <Header />
            <Route path="*">
                <Redirect to="/" />
            </Route>
            <Route exact path="/" component={Home} />
            {/* Direct */}
            <Route path="/direct" component={Direct} />
            {/*  */}
        </>
    );
};

export default Routes;
