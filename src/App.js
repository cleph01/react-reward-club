import { lazy, Suspense, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { UserContext } from "./contexts/UserContext";
// Import AuthReducer to manage state change in Context API
import UserReducer from "./reducers/user-reducer/userReducer.js";

import useAuthListener from "./hooks/use-auth-listener";

import * as ROUTES from "./routing/routes";
import * as COMPONENTS from "./routing/routeComponents";
import PrivateRoute from "./routing/PrivateRoute";
import IsUserLoggedIn from "./routing/IsUserLoggedIn";

import { db } from "./firebase/firebase_config";

const Nav = lazy(() => import("./components/nav_bar/Nav"));

const initialState = {
    displayName: null,
    avatarUrl: null,
    seller: null,
    email: null,
    phoneNumber: null,
    timestamp: null,
    aboutMe: null,
    socials: {},
    followingFriends: null,
    followersFriends: null,
    followingBusinesses: null,
    userId: null,
};

function App() {
    const [userState, userDispatch] = useReducer(UserReducer, initialState);

    const { authUser } = useAuthListener();

    // const { user } = useUser(authUser);

    // useEffect(() => {
    //     // Try and Refactor with Async/Await
    //     if (authUser) {
    //         // Check if User Exists
    //         console.log("In Auth Use Effect");
    //         db.collection("users")
    //             .doc(authUser.uid)
    //             .get()
    //             .then((user) => {
    //                 // If User exists,
    //                 //Set User Context with Reducer
    //                 console.log("User in Check User: ", user);
    //                 if (user.exists) {
    //                     console.log("User Exists");
    //                     userDispatch({
    //                         type: "USER/SET_EXISTING_USER",
    //                         payload: { ...user.data(), userId: user.id },
    //                     });
    //                 } else {
    //                     // If doesn't Exist, Create New User and set State with Reducer
    //                     console.log("User Doesn't Exists");
    //                     const newUserData = {
    //                         displayName: authUser.email,
    //                         avatarUrl: authUser.photoURL,
    //                         seller: false,
    //                         email: authUser.email,
    //                         phoneNumber: authUser.phoneNumber,
    //                         timestamp: Date.now(),
    //                         aboutMe: "Tell Us Something About You!! 🙌",
    //                         socials: {},
    //                         followingFriends: [],
    //                         followersFriends: [],
    //                         followingBusinesses: [],
    //                         userId: authUser.uid,
    //                     };

    //                     db.collection("users")
    //                         .doc(authUser.uid)
    //                         .set(newUserData)
    //                         .then((docRef) => {
    //                             userDispatch({
    //                                 type: "USER/CREATE_NEW_USER",
    //                                 payload: newUserData,
    //                             });

    //                             console.log(
    //                                 "Created User with Id: ",
    //                                 authUser.uid
    //                             );
    //                         })
    //                         .catch((error) => {
    //                             console.log("Error Creating New User: ", error);
    //                         });
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.log("Error Checking User Exists: ", error);
    //             });
    //     }
    // }, [authUser]);

    console.log("Auth User at App: ", authUser);
    console.log("User State at App: ", userState);

    // if (!userState.userId) {
    //     return <div>...Loading App</div>;
    // }

    return (
        <div className="App">
            <UserContext.Provider value={{ authUser, userState, userDispatch }}>
                <Router>
                    <Suspense fallback={<p>Loading Fallback...</p>}>
                        {authUser && <Nav authUser={authUser} />}
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
                            <IsUserLoggedIn
                                authUser={authUser}
                                path={ROUTES.LOGIN}
                                loggedInPath={ROUTES.MY_PROFILE}
                            >
                                <COMPONENTS.Login />
                            </IsUserLoggedIn>
                            {/**
                             * Dashboard Routes
                             * Private
                             */}
                            <PrivateRoute
                                path={ROUTES.DASHBOARD}
                                authUser={authUser}
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
                                authUser={authUser}
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
                                authUser={authUser}
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
                                authUser={authUser}
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
                                authUser={authUser}
                            >
                                <COMPONENTS.UserPosts />
                            </PrivateRoute>

                            {/**
                             *  Digital Wallet Routes
                             *  Private
                             */}
                            <PrivateRoute
                                path={ROUTES.WALLET}
                                authUser={authUser}
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
                                authUser={authUser}
                            >
                                <COMPONENTS.MyShop />
                            </PrivateRoute>
                            <PrivateRoute
                                path={ROUTES.NEW_SHOP}
                                authUser={authUser}
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
                            <Route component={COMPONENTS.NotFound} />
                        </Switch>
                    </Suspense>
                </Router>
            </UserContext.Provider>
        </div>
    );
}

export default App;
