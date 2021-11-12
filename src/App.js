import { lazy, Suspense, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { UserContext } from "./contexts/UserContext";
// Import AuthReducer to manage state change in Context API
import UserReducer from "./reducers/user-reducer/userReducer.js";

import useAuthListener from "./hooks/use-auth-listener";

import * as ROUTES from "./routing/routes";
import * as COMPONENTS from "./routing/routeComponents";
import PrivateRoute from "./routing/PrivateRoute";

const Nav = lazy(() => import("./components/nav_bar/Nav"));

const initialState = {
    userId: null,
    displayName: null,
    email: null,
    aboutMe: null,
    avatarUrl: null,
    created: null,
    seller: null,
    isLoading: true,
    followingFriends: [],
    followingBusinesses: [],
    followers: [],
};

function App() {
    const [userState, userDispatch] = useReducer(UserReducer, initialState);

    const { authUser } = useAuthListener();

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged((authUser) => {
    //         if (authUser) {
    //             // user has logged in...
    //             console.log("Auth User at App: ", authUser);
    //             // this state survives a refresh
    //             // onAuthStateChanged listener uses cookie tracking
    //             // to persist this state (state by default is not persistent)
    //             // userDispatch({ type: "AUTH/LOGIN", payload: authUser });
    //             userExists(authUser);
    //         } else {
    //             // user has logged out...

    //             userDispatch({ type: "AUTH/LOGOUT" });
    //         }
    //     });
    //     return () => {
    //         unsubscribe();
    //     };
    // }, []);

    // // Update User Object if they exist in the DB

    // const userExists = (authUser) => {
    //     db.collection("user")
    //         .doc(authUser.uid)
    //         .onSnapshot(
    //             (doc) => {
    //                 console.log("Doc at App: ", doc.exists);
    //                 if (doc.exists) {
    //                     // If USer exists, update state with db Record
    //                     userDispatch({
    //                         type: "USER/SET_EXISTING_DETAILS",
    //                         payload: {
    //                             ...doc.data(),
    //                             userId: authUser.uid,
    //                         },
    //                     });

    //                     history.push("/profile");

    //                     console.log("User State after Setting: ", userState);
    //                 } else {
    //                     // If User does not Exist, Create New User
    //                     const newUserData = {
    //                         displayName: authUser.email,
    //                         avatarUrl: authUser.photoURL,
    //                         seller: false,
    //                         email: authUser.email,
    //                         phoneNumber: authUser.phoneNumber,
    //                         created: Date.now(),
    //                         aboutMe: "Tell Us Something About You!! 🙌",
    //                         socials: {},
    //                         followingFriends: [],
    //                         followersFriends: [],
    //                         followingBusinesses: [],
    //                     };

    //                     FUNCTIONS.createNewUser(
    //                         newUserData,
    //                         authUser.uid,
    //                         userDispatch
    //                     );
    //                 }
    //             },
    //             (error) => {
    //                 console.log("Error getting User: ", error);
    //             }
    //         );
    // };

    // const createNewUser = (userData, userId) => {
    //     db.collection("user")
    //         .doc(userId)
    //         .set(userData)
    //         .then(() => {
    //             console.log("New User Created!");
    //             userDispatch({
    //                 type: "USER/SET_NEW_USER",
    //                 payload: { ...userData, userId: userId },
    //             });
    //         })
    //         .catch((error) => {
    //             console.error("Error Creating User: ", error);
    //         });
    // };

    console.log("useReducer User: ", userState);

    console.log("Auth User: ", authUser);

    return (
        <div className="App">
            <UserContext.Provider value={{ authUser, userState, userDispatch }}>
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
                                isAuthenticated={!!authUser}
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
                                isAuthenticated={!!authUser}
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
                                isAuthenticated={!!authUser}
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
                                isAuthenticated={!!authUser}
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
                                isAuthenticated={!!authUser}
                            >
                                <COMPONENTS.UserPosts />
                            </PrivateRoute>

                            {/**
                             *  Digital Wallet Routes
                             *  Private
                             */}
                            <PrivateRoute
                                path={ROUTES.WALLET}
                                isAuthenticated={!!authUser}
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
                                isAuthenticated={!!authUser}
                            >
                                <COMPONENTS.MyShop />
                            </PrivateRoute>
                            <PrivateRoute
                                path={ROUTES.NEW_SHOP}
                                isAuthenticated={!!authUser}
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
