import React, { lazy, Suspense, useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { auth } from "./firebase/firebase_config";
import * as ROUTES from "./routing/routes";
import * as COMPONENTS from "./routing/routeComponents";

const Nav = lazy(() => import("./components/nav_bar/Nav"));

function App() {
    const [user, setUser] = useState(null);
    // const [username, setUsername] = useState("");

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
                            <Route
                                exact
                                path={ROUTES.DASHBOARD}
                                component={COMPONENTS.Dashboard}
                            />
                            {/**
                             *  User Profile
                             *  Private
                             */}
                            <Route
                                exact
                                path={ROUTES.PROFILE}
                                component={COMPONENTS.Profile}
                            />
                            <Route
                                path={ROUTES.EDIT_PROFILE}
                                component={COMPONENTS.EditProfile}
                            />
                            {/**
                             *  Digital Wallet Routes
                             *  Private
                             */}
                            <Route
                                path={ROUTES.WALLET}
                                component={COMPONENTS.Wallet}
                            />
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
                            <Route
                                path={ROUTES.MY_SHOPS}
                                component={COMPONENTS.MyShop}
                            />
                            <Route
                                path={ROUTES.NEW_SHOP}
                                component={COMPONENTS.NewShop}
                            />
                            <Route
                                path={ROUTES.EDIT_SHOP}
                                component={COMPONENTS.EditShop}
                            />
                            <Route
                                path={ROUTES.NEW_PRIZE}
                                component={COMPONENTS.NewPrize}
                            />
                            <Route
                                path={ROUTES.EDIT_PRIZE}
                                component={COMPONENTS.EditPrize}
                            />
                        </Switch>
                    </Suspense>
                </Router>
            </UserContext.Provider>
        </div>
    );
}

export default App;
