import { useContext } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebase, auth } from "./firebase/firebase_config";
import {
    doesUserExist,
    getUserByUserId,
    createNewUser,
} from "./firebase/db_functions";
import { UserContext } from "./contexts/UserContext";

function Auth({ setAlertMsg, setOpenSnackBar }) {
    const { authUser, userDispatch } = useContext(UserContext);

    const handleSignOut = (e) => {
        e.preventDefault();

        auth.signOut();
    };

    console.log("AuthUser at Auth: ", authUser);

    return (
        <>
            {authUser ? (
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
                        signInSuccessUrl: "/profile",
                        callbacks: {
                            signInSuccessWithAuthResult: (
                                authUser,
                                redirectUrl
                            ) => {
                                return true;
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
