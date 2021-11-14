import React, { useState, useEffect, useContext } from "react";
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
    const { userState, userDispatch } = useContext(UserContext);

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

    if (!userState.userId) {
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
                            <AvatarSocials user={userState} />
                            <Link to="/profile/edit">
                                <div className="edit-profile-btn">
                                    Edit Profile
                                </div>
                            </Link>
                        </div>
                        <ProfileBio user={userState} />

                        {/* <ProfileRecentActivity userId={user.userId} /> */}

                        <Divider />

                        <div className="post-shoutout__wrapper">
                            <Link to={`/post/${userState?.userId}/new`}>
                                <div className="post-shoutout-btn">
                                    Click to Shoutout Your <br /> Brands and Get
                                    Paid
                                </div>
                            </Link>
                        </div>

                        <ProfileTabs
                            userId={userState.userId}
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

export default Profile;
