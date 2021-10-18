import React, { useState, useEffect, lazy, Suspense } from "react";

import { useParams } from "react-router-dom";
import { Route } from "react-router-dom";

import { db, storage } from "../../firebase/firebase_config";
import ProfileTabs from "./profile_components/profile_body/ProfileTabs";

import ProfileBodyTop from "./profile_components/profile_body/ProfileBodyTop";

import ProfileBio from "./profile_components/profile_bio/ProfileBio";
import ProfileRecentActivity from "./profile_components/profile_recent_activity/ProfileRecentActivity.js";
import Nav from "../../components/nav_bar/Nav";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import "./styles/profile.scss";

const itemData = [
    {
        img: "https://firebasestorage.googleapis.com/v0/b/reward-club-defbe.appspot.com/o/shop%2FRlXadqupuRGrvxy2SORx%2Flogo%2Flogo.png?alt=media&token=ca23b49d-c79c-4355-b982-021a7fb8cb1c",

        caption:
            "There may be situations where you don't need the actual data for a stored file, but rather will want the URL. You can do this in a similar fashion as the last two examples by using the getDownloadUrl() method on your StorageReference, which will give you a Uri pointing to the file's location.",
        businessName: "The Chicken Shack",
    },
    {
        img: "https://firebasestorage.googleapis.com/v0/b/reward-club-defbe.appspot.com/o/shop%2FRlXadqupuRGrvxy2SORx%2Flogo%2Flogo.png?alt=media&token=ca23b49d-c79c-4355-b982-021a7fb8cb1c",
        caption:
            "There may be situations where you don't need the actual data for a stored file, but rather will want the URL. You can do this in a similar fashion as the last two examples by using the getDownloadUrl() method on your StorageReference, which will give you a Uri pointing to the file's location.",
        businessName: "The Chicken Shack",
    },
    {
        youtubeId: "T3V97M2PZD0",
        caption:
            "There may be situations where you don't need the actual data for a stored file, but rather will want the URL. You can do this in a similar fashion as the last two examples by using the getDownloadUrl() method on your StorageReference, which will give you a Uri pointing to the file's location.",
        businessName: "The Chicken Shack",
    },
    {
        youtubeId: "T3V97M2PZD0",
        caption:
            "There may be situations where you don't need the actual data for a stored file, but rather will want the URL. You can do this in a similar fashion as the last two examples by using the getDownloadUrl() method on your StorageReference, which will give you a Uri pointing to the file's location.",
        businessName: "The Chicken Shack",
    },
    {
        youtubeId: "T3V97M2PZD0",
        caption:
            "There may be situations where you don't need the actual data for a stored file, but rather will want the URL. You can do this in a similar fashion as the last two examples by using the getDownloadUrl() method on your StorageReference, which will give you a Uri pointing to the file's location.",
        businessName: "The Chicken Shack",
    },
    {
        youtubeId: "T3V97M2PZD0",
        caption:
            "There may be situations where you don't need the actual data for a stored file, but rather will want the URL. You can do this in a similar fashion as the last two examples by using the getDownloadUrl() method on your StorageReference, which will give you a Uri pointing to the file's location.",
        businessName: "The Chicken Shack",
    },
    {
        youtubeId: "T3V97M2PZD0",
        caption:
            "There may be situations where you don't need the actual data for a stored file, but rather will want the URL. You can do this in a similar fashion as the last two examples by using the getDownloadUrl() method on your StorageReference, which will give you a Uri pointing to the file's location.",
        businessName: "The Chicken Shack",
    },
    {
        youtubeId: "T3V97M2PZD0",
        caption:
            "There may be situations where you don't need the actual data for a stored file, but rather will want the URL. You can do this in a similar fashion as the last two examples by using the getDownloadUrl() method on your StorageReference, which will give you a Uri pointing to the file's location.",
        businessName: "The Chicken Shack",
    },
    {
        youtubeId: "T3V97M2PZD0",
        caption:
            "There may be situations where you don't need the actual data for a stored file, but rather will want the URL. You can do this in a similar fashion as the last two examples by using the getDownloadUrl() method on your StorageReference, which will give you a Uri pointing to the file's location.",
        businessName: "The Chicken Shack",
    },
    {
        youtubeId: "T3V97M2PZD0",
        caption:
            "There may be situations where you don't need the actual data for a stored file, but rather will want the URL. You can do this in a similar fashion as the last two examples by using the getDownloadUrl() method on your StorageReference, which will give you a Uri pointing to the file's location.",
        businessName: "The Chicken Shack",
    },
    {
        img: "https://firebasestorage.googleapis.com/v0/b/reward-club-defbe.appspot.com/o/shop%2FRlXadqupuRGrvxy2SORx%2Flogo%2Flogo.png?alt=media&token=ca23b49d-c79c-4355-b982-021a7fb8cb1c",
        caption: "Sea star",
        businessName: "The Chicken Shack",
    },
    {
        img: "https://firebasestorage.googleapis.com/v0/b/reward-club-defbe.appspot.com/o/shop%2FRlXadqupuRGrvxy2SORx%2Flogo%2Flogo.png?alt=media&token=ca23b49d-c79c-4355-b982-021a7fb8cb1c",
        caption: "Bike",
        businessName: "The Chicken Shack",
    },
];

function Profile() {
    const [user, setUser] = useState();

    const { userId } = useParams();

    //every time a new post is added this code fires
    useEffect(() => {
        db.collection("user")
            .doc(userId)
            .onSnapshot((doc) => {
                setUser({
                    userId: doc.id,
                    userInfo: doc.data(),
                });
            });
    }, []);
    // const { user } = useContext(UserContext);

    console.log("Profile user: ", user);

    if (!user) {
        return <div>...Loading</div>;
    }

    return (
        <>
            <Nav />
            <div className="profile-container">
                <Card
                    sx={{
                        maxWidth: 350,
                    }}
                >
                    <CardContent className="card-content">
                        <div className="profile-body-wrapper">
                            <ProfileBodyTop user={user} userId={userId} />
                        </div>
                        <ProfileBio user={user} />
                        <ProfileRecentActivity userId={userId} />
                        <ProfileTabs user={itemData} posts={itemData} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default Profile;
