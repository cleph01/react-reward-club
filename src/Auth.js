import React, { useContext } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { UserContext } from "./contexts/UserContext";
import { firebase, auth, db } from "./firebase/firebase_config";

function Auth() {
    const { user, setUser } = useContext(UserContext);

    const handleSignOut = (e) => {
        e.preventDefault();

        auth.signOut();
    };

    console.log("User from State: ", user);

    return (
        <>
            {user ? (
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
                                setUser(authUser.user);

                                db.collection("user")
                                    .doc(authUser.user.uid)
                                    .get()
                                    .then((doc) => {
                                        const inputData = {
                                            displayName:
                                                authUser.user.displayName,
                                            avatarUrl: authUser.user.photoURL,
                                            seller: false,
                                            created:
                                                firebase.firestore.FieldValue.serverTimestamp(),
                                        };

                                        if (!doc.exists) {
                                            // Create a new doc with UID as DocId
                                            db.collection("user")
                                                .doc(authUser.user.uid)
                                                .set(inputData)
                                                .then(() => {
                                                    console.log(
                                                        "Document successfully written!"
                                                    );
                                                })
                                                .catch((error) => {
                                                    console.error(
                                                        "Error writing document: ",
                                                        error
                                                    );
                                                });
                                        } else {
                                            // doc.data() will be undefined in this case
                                            console.log("User Exists!");
                                        }
                                    })
                                    .catch((error) => {
                                        console.log(
                                            "Error getting document:",
                                            error
                                        );
                                    });
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
