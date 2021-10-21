import React, { useState, useEffect, lazy, Suspense } from "react";

import { useParams } from "react-router-dom";
import { Route } from "react-router-dom";

import { db, storage } from "../../firebase/firebase_config";
import ProfileTabs from "./profile_components/ProfileTabs";

import ProfileBodyTop from "./profile_components/profile_body/ProfileBodyTop";

import ProfileBio from "./profile_components/profile_bio/ProfileBio";
import ProfileRecentActivity from "./profile_components/profile_recent_activity/ProfileRecentActivity.js";
import Nav from "../../components/nav_bar/Nav";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import ForumIcon from "@mui/icons-material/Forum";

import { InlineShareButtons } from "sharethis-reactjs";

import platform from "platform-detect/os.mjs";
import encodeurl from "encodeurl";

import "./styles/profile.scss";

const style = {
    position: "absolute",
    color: "#37434f",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

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

const businessList = [
    {
        businessId: "RlXadqupuRGrvxy2SORx",
        logoUrl:
            "https://firebasestorage.googleapis.com/v0/b/reward-club-defbe.appspot.com/o/shop%2FRlXadqupuRGrvxy2SORx%2Flogo%2Flogo.png?alt=media&token=ca23b49d-c79c-4355-b982-021a7fb8cb1c",
        businessName: "The Chicken Shack",
        numPrizes: "3",
    },
    {
        businessId: "RlXadqupuRGrvxy2SORx",
        logoUrl:
            "https://firebasestorage.googleapis.com/v0/b/reward-club-defbe.appspot.com/o/shop%2FRlXadqupuRGrvxy2SORx%2Flogo%2Flogo.png?alt=media&token=ca23b49d-c79c-4355-b982-021a7fb8cb1c",
        businessName: "The Chicken Shack",
        numPrizes: "3",
    },
    {
        businessId: "RlXadqupuRGrvxy2SORx",
        logoUrl:
            "https://firebasestorage.googleapis.com/v0/b/reward-club-defbe.appspot.com/o/shop%2FRlXadqupuRGrvxy2SORx%2Flogo%2Flogo.png?alt=media&token=ca23b49d-c79c-4355-b982-021a7fb8cb1c",
        businessName: "The Chicken Shack",
        numPrizes: "3",
    },
    {
        businessId: "RlXadqupuRGrvxy2SORx",
        logoUrl:
            "https://firebasestorage.googleapis.com/v0/b/reward-club-defbe.appspot.com/o/shop%2FRlXadqupuRGrvxy2SORx%2Flogo%2Flogo.png?alt=media&token=ca23b49d-c79c-4355-b982-021a7fb8cb1c",
        businessName: "The Chicken Shack",
        numPrizes: "3",
    },
];

function Profile() {
    const [user, setUser] = useState();

    const { userId } = useParams();

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

    const encodeMsg = encodeurl(
        `Wanted to share this with you. Check them out. ${
            shareBusiness
                ? shareBusiness.businessName +
                  ": http://localhost:3000/shops/" +
                  shareBusiness.businessId
                : "undefined"
        }/${userId}`
    );
    const smsMessage =
        platform.macos || platform.ios
            ? `sms:&body=${encodeMsg}`
            : `sms:?body=${encodeMsg}`;

    //every time a new post is added this code fires
    useEffect(() => {
        // Get User Info
        db.collection("user")
            .doc(userId)
            .onSnapshot((doc) => {
                setUser({
                    userId: doc.id,
                    userInfo: doc.data(),
                });
            });

        // Get Posts
        db.collection("user")
            .doc(userId)
            .collection("posts")
            .onSnapshot((snapshot) => {
                setPosts(
                    snapshot.docs.map((doc) => ({
                        postId: doc.id,
                        post: doc.data(),
                    }))
                );
            });

        // Get BizRelationsip Following
        // Get Posts
        db.collection("user")
            .doc(userId)
            .collection("bizRelationship")
            .onSnapshot((snapshot) => {
                setBizRelationships(
                    snapshot.docs.map((doc) => ({
                        relationshipId: doc.id,
                        relationship: doc.data(),
                    }))
                );
            });
    }, []);
    // const { user } = useContext(UserContext);

    console.log("Profile user: ", user);

    console.log("Posts: ", posts);

    console.log("Biz Relationships Profile: ", bizRelationships);

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
                        {posts ? (
                            <ProfileTabs
                                posts={posts}
                                bizRelationships={bizRelationships}
                                handleOpenShareModal={handleOpenShareModal}
                            />
                        ) : (
                            <div>...Loading</div>
                        )}
                    </CardContent>
                </Card>

                <Modal
                    open={openShareModal}
                    onClose={handleCloseShareModal}
                    aria-labelledby="modal2-modal-title"
                    aria-describedby="modal2-modal-description"
                >
                    <Box sx={style}>
                        <Typography
                            id="modal2-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ textAlign: "center", borderColor: "#f0f0f0" }}
                        >
                            Shout Out Your Favorite Shops and Get Paid!
                        </Typography>
                        <Typography
                            id="modal2-modal-description"
                            sx={{ mt: 2, textAlign: "center" }}
                        >
                            Click Below and Go Social !!
                        </Typography>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "15px",
                            }}
                        >
                            <InlineShareButtons
                                config={{
                                    alignment: "center", // alignment of buttons (left, center, right)
                                    color: "social", // set the color of buttons (social, white)
                                    enabled: true, // show/hide buttons (true, false)
                                    font_size: 16, // font size for the buttons
                                    labels: "cta", // button labels (cta, counts, null)
                                    language: "en", // which language to use (see LANGUAGES)
                                    networks: [
                                        // which networks to include (see SHARING NETWORKS)
                                        "whatsapp",
                                        "linkedin",
                                        "messenger",
                                        "facebook",
                                        "twitter",
                                    ],
                                    padding: 12, // padding within buttons (INTEGER)
                                    radius: 4, // the corner radius on each button (INTEGER)
                                    show_total: true,
                                    size: 40, // the size of each button (INTEGER)

                                    // OPTIONAL PARAMETERS
                                    // url: `https://smartseedtech.com/${
                                    //     shareBusiness
                                    //         ? shareBusiness.businessId
                                    //         : "undefined"
                                    // }`, // (defaults to current url)
                                    url: "https://www.chickenshacknyc.com/",
                                    description: `Business Name: ${
                                        shareBusiness
                                            ? shareBusiness.businessName
                                            : "undefined"
                                    }`, // (defaults to og:description or twitter:description)
                                    title: `Business Name: ${
                                        shareBusiness
                                            ? shareBusiness.businessName
                                            : "undefined"
                                    }`, // (defaults to og:title or twitter:title)
                                    message: `Business Name: ${
                                        shareBusiness
                                            ? shareBusiness.businessName
                                            : "undefined"
                                    }`, // (only for email sharing)
                                    subject: `Business Name: ${
                                        shareBusiness
                                            ? shareBusiness.businessName
                                            : "undefined"
                                    }`, // (only for email sharing)
                                }}
                            />
                            <div>
                                <center>
                                    <h3>or Send a Text! </h3>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: "36px",
                                                marginRight: "20px",
                                            }}
                                        >
                                            {String.fromCodePoint(0x1f449)}
                                        </span>
                                        <a href={smsMessage}>
                                            <ForumIcon
                                                sx={{
                                                    color: "#1c76d2",
                                                    fontSize: "52px",
                                                }}
                                            />
                                        </a>
                                    </div>
                                </center>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default Profile;
