import React, { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase/firebase";

let uiConfig = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: (user) => {
            localStorage.setItem("user", user);
            console.log("User in Config CB: ", user);
        },
    },
};

function Auth() {
    const [user, setUser] = useState();
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setIsSignedIn(!isSignedIn);
            setUser(user);
        });

        console.log("Did Mount Listener");
    }, [user]);

    const handleSignOut = (e) => {
        e.preventDefault();

        // setIsSignedIn(!isSignedIn);

        firebase.auth().signOut();
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
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            )}
        </>
    );
}

export default Auth;
