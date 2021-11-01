import SignUp from "components/Signup/SignUp";
import Home from "pages/Home";
import LoginPage from "pages/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LoginPage} />
            </Switch>
            <Switch>
                <Route exact path="/accounts/emailsignup" component={SignUp} />
            </Switch>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
