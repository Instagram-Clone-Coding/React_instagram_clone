import Home from "pages/Home";
import Direct from "pages/Direct";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                {/* Direct */}
                <Route path="/direct" component={Direct} />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
