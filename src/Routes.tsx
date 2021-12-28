import Home from "pages/Home";
import SignUp from "components/Signup/SignUp";
import Login from "pages/Login";
import Direct from "pages/Direct";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "components/Common/Header";

import { useAppSelector } from "app/hooks";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/accounts/signin" component={Login} />
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
