import React, { lazy, Suspense, useState, useEffect } from "react";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
} from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { auth } from "./firebase/firebase_config";
import * as ROUTES from "./routing/routes";
import * as COMPONENTS from "./routing/routeComponents";
import PrivateRoute from "./routing/PrivateRoute";

const Nav = lazy(() => import("./components/nav_bar/Nav"));

function App() {
    const [user, setUser] = useState(null);
    // Adding this as a auth status flag for protected route condition
    // prevents infinite re-rendering

    let history = useHistory();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // user has logged in...
                console.log(authUser);
                // this state survives a refresh
                // onAuthStateChanged listener uses cookie tracking
                // to persist this state (state by default is not persistent)
                setUser(authUser);
                // Switches Flag Off for Protected Route logic

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
            <UserContext.Provider value={{ user, setUser }}>
                <Router>
                    <Suspense fallback={<p>Loading...</p>}>
                        {user && <Nav />}
                        <Switch>
                            {/**
                             *  Auth Routes
                             *  Public
                             */}
                            <Route
                                exact
                                path={ROUTES.HOME}
                                component={COMPONENTS.Home}
                            />
                            <Route
                                exact
                                path={ROUTES.LOGIN}
                                component={COMPONENTS.Login}
                            />
                            {/**
                             * Dashboard Routes
                             * Private
                             */}
                            <PrivateRoute path={ROUTES.DASHBOARD}>
                                <COMPONENTS.Dashboard />
                            </PrivateRoute>
                            {/**
                             *  User Profile
                             *  Private
                             */}
                            <PrivateRoute path={ROUTES.PROFILE}>
                                <COMPONENTS.Profile />
                            </PrivateRoute>
                            <PrivateRoute path={ROUTES.EDIT_PROFILE}>
                                <COMPONENTS.EditProfile />
                            </PrivateRoute>
                            {/**
                             *  Digital Wallet Routes
                             *  Private
                             */}
                            <PrivateRoute path={ROUTES.WALLET}>
                                <COMPONENTS.Wallet />
                            </PrivateRoute>
                            {/**
                             *  Shops Community
                             *  Public Routes
                             */}
                            <Route
                                path={ROUTES.SHOPS}
                                component={COMPONENTS.AllShops}
                            />
                            <Route
                                exact
                                path={ROUTES.SHOP}
                                component={COMPONENTS.Shop}
                            />
                            {/**
                             *  Store QR Code Routes
                             *  Public Routes
                             */}
                            <Route
                                path={ROUTES.STORE}
                                component={COMPONENTS.Store}
                            />
                            <Route
                                path={ROUTES.CHECKIN}
                                component={COMPONENTS.Checkin}
                            />
                            {/**
                             *  User Ownerd Shop Routes
                             *  Private Routes
                             */}
                            <PrivateRoute path={ROUTES.MY_SHOPS}>
                                <COMPONENTS.MyShop />
                            </PrivateRoute>
                            <PrivateRoute path={ROUTES.NEW_SHOP}>
                                <COMPONENTS.NewShop />
                            </PrivateRoute>
                            <PrivateRoute path={ROUTES.EDIT_SHOP}>
                                <COMPONENTS.EditShop />
                            </PrivateRoute>
                            <PrivateRoute path={ROUTES.NEW_PRIZE}>
                                <COMPONENTS.NewPrize />
                            </PrivateRoute>
                            <PrivateRoute path={ROUTES.EDIT_PRIZE}>
                                <COMPONENTS.EditPrize />
                            </PrivateRoute>
                        </Switch>
                    </Suspense>
                </Router>
            </UserContext.Provider>
        </div>
    );
}

export default App;
