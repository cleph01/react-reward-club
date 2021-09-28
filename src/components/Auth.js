import React, { useContext } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { UserContext } from "../contexts/UserContext";
import { firebase, auth } from "../firebase/firebase_config";

// let uiConfig = ;

function Auth() {
    const { user, setUser, isSignedIn, setIsSignedIn } =
        useContext(UserContext);

    const handleSignOut = (e) => {
        e.preventDefault();

        setIsSignedIn(!isSignedIn);

        auth.signOut();
    };

    console.log("User from State: ", user);
    console.log("isSignedIn: ", isSignedIn);

    return (
        <>
            {isSignedIn ? (
                <div>
                    <div>Signed In!</div>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            ) : (
                <StyledFirebaseAuth
                    uiConfig={{
                        signInFlow: "popup",
                        signInOptions: [
                            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                        ],
                        callbacks: {
                            signInSuccessWithAuthResult: (authUser) => {
                                setUser(authUser);
                                setIsSignedIn(!isSignedIn);
                            },
                        },
                    }}
                    firebaseAuth={firebase.auth()}
                />
            )}
        </>
    );
}

export default Auth;
