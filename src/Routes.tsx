import SignUp from "components/Signup/SignUp";
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
        </BrowserRouter>
    );
};

export default Routes;
