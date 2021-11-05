import { firebase, db } from "../../../firebase/firebase_config";

const getExistingUser = (authUser, userDispatch, setExistingUser) => {
    db.collection("user")
        .doc(authUser.uid)
        .onSnapshot(
            (doc) => {
                // If USer exists, update state with db Record
                if (doc.exists) {
                    userDispatch({
                        type: "USER/SET_EXISTING_DETAILS",
                        payload: { ...doc.data(), userId: authUser.uid },
                    });

                    setExistingUser({ ...doc.data(), userId: authUser.uid });
                }
            },
            (error) => {
                console.log("Error Getting UserExists Doc: ", error);
            }
        );
};

const createNewUser = (userData, userId, userDispatch) => {
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

export { getExistingUser, createNewUser };
