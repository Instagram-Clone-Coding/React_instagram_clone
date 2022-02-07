import Home from "pages/Home";
import SignUp from "pages/SignUp";
import Login from "pages/Login";
import Direct from "pages/Direct";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "components/Common/Header";

import { useAppSelector } from "app/store/Hooks";

export const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0MzEyNDE4N30.1cDekafQGl7dLdfaPs8YciAOM_f9rhAesVJvvoOpdLfWBc3FHAgE_mZEMeRQyxOUXB6mHhybXrB0kZjYx9VDmA";
const Routes = () => {
    const { isLogin } = useAppSelector((state) => state.auth);

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
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
