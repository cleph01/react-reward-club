import React, { lazy, Suspense, useState, useReducer, useEffect } from "react";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
} from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
// Import AuthReducer to manage state change in Context API
import UserReducer from "./reducers/user-reducer/userReducer.js";
import { auth, db, firebase } from "./firebase/firebase_config";
import * as ROUTES from "./routing/routes";
import * as COMPONENTS from "./routing/routeComponents";
import PrivateRoute from "./routing/PrivateRoute";

const Nav = lazy(() => import("./components/nav_bar/Nav"));

const initialState = {
    isAuthenticated: false,
    userId: null,
    displayName: null,
    email: null,
    aboutMe: null,
    avatarUrl: null,
    created: null,
    seller: null,
    isLoading: true,
};

function App() {
    const [userState, userDispatch] = useReducer(UserReducer, initialState);

    // Adding this as a auth status flag for protected route condition
    // prevents infinite re-rendering

    // Authenticate/Signin User
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // user has logged in...
                console.log("Auth User at App: ", authUser);
                // this state survives a refresh
                // onAuthStateChanged listener uses cookie tracking
                // to persist this state (state by default is not persistent)
                // userDispatch({ type: "AUTH/LOGIN", payload: authUser });
                userExists(authUser);
            } else {
                // user has logged out...

                userDispatch({ type: "AUTH/LOGOUT" });
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    // Update User Object if they exist in the DB

    const userExists = async (authUser) => {
        try {
            const result = await db.collection("user").doc(authUser.uid).get();

            if (result.exists) {
                // If USer exists, update state with db Record
                userDispatch({
                    type: "USER/SET_EXISTING_DETAILS",
                    payload: { ...result.data(), userId: authUser.uid },
                });

                console.log("User State after Setting: ", userState);
            } else {
                // If User does not Exist, Create New User
                const newUserData = {
                    displayName: authUser.email,
                    avatarUrl: authUser.photoURL,
                    seller: false,
                    email: authUser.email,
                    phoneNumber: authUser.phoneNumber,
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                    aboutMe: "Tell Us Something About You!! 🙌",
                    socials: {},
                    followingFriends: [],
                    followersFriends: [],
                };

                createNewUser(newUserData, authUser.uid);
            }
        } catch (error) {
            console.log("Error Checking User Exists: ", error);
        }
    };

    const createNewUser = (userData, userId) => {
        db.collection("user")
            .doc(userId)
            .set(userData)
            .then(() => {
                console.log("New User Created!");
                userDispatch({
                    type: "USER/SET_NEW_USER",
                    payload: { ...userData, userId: userId },
                });
            })
            .catch((error) => {
                console.error("Error Creating User: ", error);
            });
    };

    console.log("useReducer User: ", userState);

    if (userState.isLoading) {
        return <div>...Loading</div>;
    }
    return (
        <div className="App">
            <UserContext.Provider value={{ userState, userDispatch }}>
                <Router>
                    <Suspense fallback={<p>Loading...</p>}>
                        {userState.isAuthenticated && (
                            <Nav isAuthenticated={userState.isAuthenticated} />
                        )}
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
                            <PrivateRoute
                                path={ROUTES.DASHBOARD}
                                isAuthenticated={userState.isAuthenticated}
                            >
                                <COMPONENTS.Dashboard />
                            </PrivateRoute>
                            {/**
                             *  My Profile
                             *  Private
                             */}
                            <PrivateRoute
                                exact
                                path={ROUTES.MY_PROFILE}
                                isAuthenticated={userState.isAuthenticated}
                            >
                                <COMPONENTS.MyProfile />
                            </PrivateRoute>
                            {/**
                             *  Other User Profile
                             *  Public
                             */}
                            <Route
                                exact
                                path={ROUTES.USER_PROFILE}
                                component={COMPONENTS.UserProfile}
                            />

                            <PrivateRoute
                                exact
                                path={ROUTES.EDIT_PROFILE}
                                isAuthenticated={userState.isAuthenticated}
                            >
                                <COMPONENTS.EditProfile />
                            </PrivateRoute>
                            {/**
                             *  Shoutout Add NewPosts
                             *  Private
                             */}
                            <PrivateRoute
                                exact
                                path={ROUTES.NEW_POST}
                                isAuthenticated={userState.isAuthenticated}
                            >
                                <COMPONENTS.NewPost />
                            </PrivateRoute>
                            {/**
                             *  Shoutout Display Post
                             *  Public
                             */}
                            <Route
                                exact
                                path={ROUTES.POST}
                                component={COMPONENTS.Post}
                            />

                            <PrivateRoute
                                exact
                                path={ROUTES.USER_POSTS}
                                isAuthenticated={userState.isAuthenticated}
                            >
                                <COMPONENTS.UserPosts />
                            </PrivateRoute>

                            {/**
                             *  Digital Wallet Routes
                             *  Private
                             */}
                            <PrivateRoute
                                path={ROUTES.WALLET}
                                isAuthenticated={userState.isAuthenticated}
                            >
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
                            <PrivateRoute
                                path={ROUTES.MY_SHOPS}
                                isAuthenticated={userState.isAuthenticated}
                            >
                                <COMPONENTS.MyShop />
                            </PrivateRoute>
                            <PrivateRoute
                                path={ROUTES.NEW_SHOP}
                                isAuthenticated={userState.isAuthenticated}
                            >
                                <COMPONENTS.NewShop />
                            </PrivateRoute>
                            <PrivateRoute
                                path={ROUTES.EDIT_SHOP}
                                isAuthenticated={userState.isAuthenticated}
                            >
                                <COMPONENTS.EditShop />
                            </PrivateRoute>
                            <PrivateRoute
                                path={ROUTES.NEW_PRIZE}
                                isAuthenticated={userState.isAuthenticated}
                            >
                                <COMPONENTS.NewPrize />
                            </PrivateRoute>
                            <PrivateRoute
                                path={ROUTES.EDIT_PRIZE}
                                isAuthenticated={userState.isAuthenticated}
                            >
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
