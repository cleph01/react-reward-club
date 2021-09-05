import { lazy, Suspense, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";

// START Lazy Rendering functions
const Home = lazy(() => import("./pages/Home.js"));
const Store = lazy(() => import("./pages/Store.js"));
const User = lazy(() => import("./pages/User.js"));

// END Lazy Rendering functions

function App() {
    return (
        <div className="App">
            <Router>
                <Suspense fallback={<p>Loading...</p>}>
                    <Switch>
                        <Route exact path={ROUTES.HOME} component={Home} />
                        <Route path={ROUTES.USER} component={User} />
                        <Route path={ROUTES.STORE} component={Store} />
                    </Switch>
                </Suspense>
            </Router>
        </div>
    );
}

export default App;
