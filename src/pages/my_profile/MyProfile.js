import React, { useState, useEffect, useContext, useMemo } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import useUser from "../../hooks/use-user";
import ProfileTabs from "./profile_components/ProfileTabs";

import AvatarSocials from "./profile_components/AvatarSocials";

import ProfileBio from "./profile_components/ProfileBio";
import ProfileRecentActivity from "./profile_components/ProfileRecentActivity.js";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Divider from "@mui/material/Divider";

import { db } from "../../firebase/firebase_config";

import "./styles/profile.scss";

function Profile({ authUser }) {
    // const { user } = useUser(authUser);

    console.log("AuthUser in top Profile: ", authUser);

    const [activeUser, setActiveUser] = useState();
    const { userState, userDispatch } = useContext(UserContext);

    useEffect(() => {
        // Try and Refactor with Async/Await

        // Check if User Exists
        console.log("In Auth Use Effect");
        if (!userState.id) {
            db.collection("users")
                .doc(authUser.uid)
                .get()
                .then((user) => {
                    // If User exists,
                    //Set User Context with Reducer
                    console.log("User in Check User: ", user);
                    if (user.exists) {
                        console.log("User Exists");
                        userDispatch({
                            type: "USER/SET_EXISTING_USER",
                            payload: { ...user.data(), userId: user.id },
                        });

                        setActiveUser({ ...user.data(), userId: authUser.uid });
                    } else {
                        // If doesn't Exist, Create New User and set State with Reducer
                        console.log("User Doesn't Exists");
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

                        db.collection("users")
                            .doc(authUser.uid)
                            .set(newUserData)
                            .then((docRef) => {
                                userDispatch({
                                    type: "USER/CREATE_NEW_USER",
                                    payload: newUserData,
                                });

                                setActiveUser(newUserData);

                                console.log(
                                    "Created User with Id: ",
                                    authUser.uid
                                );
                            })
                            .catch((error) => {
                                console.log("Error Creating New User: ", error);
                            });
                    }
                })
                .catch((error) => {
                    console.log("Error Checking User Exists: ", error);
                });
        }
    }, []);

    // const [activeUser, setActiveUser ] = useState()
    // State to Hold Posts
    const [posts, setPosts] = useState();

    // State to Hold Following
    const [bizRelationships, setBizRelationships] = useState();

    // State to control Share Modal
    const [openShareModal, setOpenShareModal] = useState(false);

    const handleCloseShareModal = () => setOpenShareModal(false);

    const [shareBusiness, setShareBusiness] = useState();

    const handleOpenShareModal = (itemObj) => {
        setShareBusiness(itemObj);
        setOpenShareModal(true);
    };

    console.log("UserState Context at Profile: ", userState);

    if (!activeUser) {
        return <div>...Loading My Profile</div>;
    }

    // console.log("User State at Profile: ", userState);

    // return <p>My profile</p>;
    return (
        <>
            <div className="profile-container">
                <Card
                    sx={{
                        maxWidth: 350,
                    }}
                >
                    <CardContent className="card-content">
                        <div className="profile-body-wrapper">
                            <AvatarSocials user={activeUser} />
                            <Link to="/profile/edit">
                                <div className="edit-profile-btn">
                                    Edit Profile
                                </div>
                            </Link>
                        </div>
                        <ProfileBio user={activeUser} />

                        {/* <ProfileRecentActivity userId={user.userId} /> */}

                        <Divider />

                        <div className="post-shoutout__wrapper">
                            <Link to={`/post/${activeUser?.userId}/new`}>
                                <div className="post-shoutout-btn">
                                    Click to Shoutout Your <br /> Brands and Get
                                    Paid
                                </div>
                            </Link>
                        </div>

                        <ProfileTabs
                            userId={activeUser.userId}
                            bizRelationships={bizRelationships}
                            handleOpenShareModal={handleOpenShareModal}
                            followingFriends={userState.followingFriends}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default React.memo(Profile);
