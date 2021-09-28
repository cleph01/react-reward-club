import { lazy, Suspense, useReducer, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { auth } from "./firebase/firebase_config";
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
const EditProfile = lazy(() => import("./pages/EditProfile.js"));

// END Lazy Rendering functions

function App() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // user has logged in...
                console.log(authUser);
                // this state survives a refresh
                // onAuthStateChanged listener uses cookie tracking
                // to persist this state (state by default is not persistent)
                setUser(authUser);

                // if (authUser.displayName) {
                //     // don't update username
                // } else {
                //     // update profile name
                //     return authUser.updateProfile({
                //         displayName: username,
                //     });
                // }
            } else {
                // user has logged out...
                setUser(null);
            }
        });
        return () => {
            // perform some cleanup actions
            // i.e. detaches the listener previously attached
            // from initial useEffect call since we are listening
            // to frontend changes to user & username variables
            unsubscribe();
        };
    }, [user]);

    return (
        <div className="App">
            <UserContext.Provider
                value={{ user, setUser, isSignedIn, setIsSignedIn }}
            >
                <Router>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Switch>
                            <Route exact path={ROUTES.HOME} component={Home} />
                            <Route path={ROUTES.PROFILE} component={Profile} />
                            <Route path={ROUTES.STORE} component={Store} />
                            <Route path={ROUTES.CHECKIN} component={Checkin} />
                            <Route path={ROUTES.WALLET} component={Wallet} />
                            <Route path={ROUTES.MARKET} component={Market} />
                            <Route
                                path={ROUTES.EDITPROFILE}
                                component={EditProfile}
                            />
                        </Switch>
                    </Suspense>
                </Router>
            </UserContext.Provider>
        </div>
    );
}

export default App;
