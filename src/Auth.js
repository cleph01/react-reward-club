import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { UserContext } from "./contexts/UserContext";
import { firebase, auth } from "./firebase/firebase_config";

function Auth({referrerId}) {
    const { userState } = useContext(UserContext);

    const history = useHistory();

    const handleSignOut = (e) => {
        e.preventDefault();

        auth.signOut();
    };

    return (
        <>
            {userState.isAuthenticated ? (
                <div>
                    <div>Signed In!</div>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            ) : (
                <StyledFirebaseAuth
                    uiConfig={{
                        signInFlow: "redirect",
                        signInOptions: [
                            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                        ],
                        callbacks: {
                            signInSuccessWithAuthResult: (authUser) => {
                                history.push("/profile");
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
