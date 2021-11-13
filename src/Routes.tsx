import Home from "pages/Home";
import SignUp from "components/Signup/SignUp";
import LoginPage from "pages/Login";
import Direct from "pages/Direct";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                {/* Direct */}
                <Route path="/direct" component={Direct} />
                {/*  */}
                <Route exact path="/accounts/signin" component={LoginPage} />
                <Route exact path="/accounts/emailsignup" component={SignUp} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
