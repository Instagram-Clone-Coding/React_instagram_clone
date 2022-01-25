import Home from "pages/Home";
import SignUp from "components/Signup/SignUp";
import LoginPage from "pages/Login";
import Direct from "pages/Direct";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "components/Common/Header";

import { useAppSelector } from "app/store/hooks";

export const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0MzEyNDE4N30.1cDekafQGl7dLdfaPs8YciAOM_f9rhAesVJvvoOpdLfWBc3FHAgE_mZEMeRQyxOUXB6mHhybXrB0kZjYx9VDmA";
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/accounts/signin" component={LoginPage} />
                <Route path="/accounts/emailsignup" component={SignUp} />

                <Route component={AuthedContainer} />
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
    // const userInfo = useAppSelector((state) => state.auth.userInfo);
    // return !userInfo ? (
    //     <Redirect to="/accounts/signin" />
    // ) : (
    //     <>
    //         <Header />
    //         <Route path="*">
    //             <Redirect to="/" />
    //         </Route>
    //         <Route exact path="/" component={Home} />
    //         {/* Direct */}
    //         <Route path="/direct" component={Direct} />
    //         {/*  */}
    //     </>
    // );
};

export default Routes;
