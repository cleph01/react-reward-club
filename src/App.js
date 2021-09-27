import { lazy, Suspense, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";

// START FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";

import {
    faSearch,
    faBars,
    faLink,
    faExclamationTriangle,
    faCheckCircle,
    faSpinner,
    faPhone,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faBars,
    faSearch,
    faLink,
    faExclamationTriangle,
    faCheckCircle,
    faSpinner,
    faPhone,
    faShoppingCart
);
// END FontAwesome

// START Lazy Rendering functions
const Home = lazy(() => import("./pages/Home.js"));
const Store = lazy(() => import("./pages/Store.js"));
const Profile = lazy(() => import("./pages/Profile.js"));
const Checkin = lazy(() => import("./pages/Checkin.js"));
const Wallet = lazy(() => import("./pages/Wallet.js"));
const Market = lazy(() => import("./pages/Market.js"));

// END Lazy Rendering functions

function App() {
    return (
        <div className="App">
            <Router>
                <Suspense fallback={<p>Loading...</p>}>
                    <Switch>
                        <Route exact path={ROUTES.HOME} component={Home} />
                        <Route path={ROUTES.PROFILE} component={Profile} />
                        <Route path={ROUTES.STORE} component={Store} />
                        <Route path={ROUTES.CHECKIN} component={Checkin} />
                        <Route path={ROUTES.WALLET} component={Wallet} />
                        <Route path={ROUTES.MARKET} component={Market} />
                    </Switch>
                </Suspense>
            </Router>
        </div>
    );
}

export default App;
