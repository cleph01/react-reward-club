import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {
    doesUserExist,
    getUserByUserId,
    createNewUser,
} from "../firebase/db_functions";

function useUser() {
    // const [activeUser, setActiveUser] = useState({});

    const { authUser, userDispatch, userState } = useContext(UserContext);

    useEffect(() => {
        const getUserObjectByUserId = async (authUser) => {
            const userExists = await doesUserExist(authUser.uid);

            console.log("Auth User Exists: ", userExists);

            try {
                if (userExists) {
                    const user = await getUserByUserId(authUser.uid);

                    userDispatch({
                        type: "USER/SET_EXISTING_USER",
                        payload: user,
                    });

                    // setActiveUser(user);
                } else {
                    const newUserData = {
                        displayName: authUser.email,
                        avatarUrl: authUser.photoURL,
                        seller: false,
                        email: authUser.email,
                        phoneNumber: authUser.phoneNumber,
                        timestamp: Date.now(),
                        aboutMe: "Tell Us Something About You!! 🙌",
                        socials: {},
                        followingFriends: [],
                        followersFriends: [],
                        followingBusinesses: [],
                        userId: authUser.uid,
                    };

                    createNewUser(authUser.uid, newUserData);

                    userDispatch({
                        type: "USER/CREATE_NEW_USER",
                        payload: newUserData,
                    });

                    // setActiveUser(newUserData);
                }
            } catch (error) {
                console.log("Error in Auth Component: ", error);
            }
        };

        return () => {
            getUserObjectByUserId(authUser);
        };
    }, [authUser]);

    return userState;
}

export default useUser;
