import React, { useState, useEffect, useContext, forwardRef } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Auth from "../../Auth";
import { InlineShareButtons } from "sharethis-reactjs";

import platform from "platform-detect/os.mjs";

import encodeurl from "encodeurl";

import { getBizRelationship } from "./helper_functions/helper_functions";
import { firebase, db } from "../../firebase/firebase_config";
import productPic from "../../assets/images/chickenshack-product.jpg";
import GetLocation from "./components/GetLocation";
import CheckinAuth from "./components/CheckInAuth";
import AvailablePrizes from "./components/AvailablePrizes";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ShareIcon from "@mui/icons-material/Share";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import ForumIcon from "@mui/icons-material/Forum";

import { getDistanceBetween } from "geolocation-distance-between";

import "./styles/checkin.scss";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function Checkin() {
    const { user } = useContext(UserContext);

    const { storeId } = useParams();
    const [business, setBusiness] = useState();

    const [prizes, setPrizes] = useState();

    const [userBizRelationship, setUserBizRelationship] = useState();

    const [walletPrize, setwalletPrize] = useState();

    // State to control Add Prize to Wallet Modal
    const [openClaimModal, setOpenClaimModal] = useState(false);

    // State to control Share Modal
    const [openShareModal, setOpenShareModal] = useState(false);

    const handleOpenClaimModal = (itemObj) => {
        if (goStatus.gotDistance && user) {
            setOpenClaimModal(true);
            setwalletPrize(itemObj);

            console.log("Wallet Prize: ", walletPrize);
        } else {
            setAlertMsg({
                message: "Please Provide Your Location and Be logged in",
                severity: "error",
            });

            setOpenSnackBar(true);
        }
    };
    const handleCloseClaimModal = () => setOpenClaimModal(false);

    const handleOpenShareModal = () => {
        setOpenShareModal(true);
    };

    const handleCloseShareModal = () => setOpenShareModal(false);

    const handleAddToWallet = () => {
        console.log("Add to wallet invoked: ", walletPrize);

        if (
            walletPrize.prizeDetails.pointThreshold <=
            userBizRelationship.relationshipInfo.pointSum
        ) {
            //Add Prize to Wallet and Update pointsSum in Biz Relationship
            let walletRef = db
                .collection("user")
                .doc(user.uid)
                .collection("wallet");

            walletRef
                .add({
                    businessId: storeId,
                    businessName: business.businessName,
                    emojiHexCode: walletPrize.prizeDetails.emojiHexCode,
                    itemDescription: walletPrize.prizeDetails.itemDescription,
                    itemId: walletPrize.prizeId,
                    redeemed: false,
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then((docRef) => {
                    console.log("Prize Added to Wallet with ID: ", docRef.id);

                    // Decrement Points Sum from BizRelationship
                    let userRef = db
                        .collection("user")
                        .doc(user.uid)
                        .collection("bizRelationship")
                        .doc(userBizRelationship.realtionshipId);

                    userRef
                        .update({
                            pointSum: firebase.firestore.FieldValue.increment(
                                -walletPrize.prizeDetails.pointThreshold
                            ),
                        })
                        .then(() => {
                            console.log("PointSum successfully updated!");
                        })
                        .catch((error) => {
                            // The document probably doesn't exist.
                            console.error("Error updating PointSume: ", error);
                        });

                    setAlertMsg({
                        message: "Item Added to Wallet.",
                        severity: "success",
                    });
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        } else {
            setAlertMsg({
                message: "Not Enouguh Points.",
                severity: "error",
            });
        }

        setOpenClaimModal(false);
        setOpenSnackBar(true);
    };

    const [geoDistance, setGeoDistance] = useState();

    const [goStatus, setGoStatus] = useState({
        fetchingDistance: false,
        gotDistance: false,
    });

    const [alertMsg, setAlertMsg] = useState({
        message: "",
        severity: "success",
    });

    const [openSnackBar, setOpenSnackBar] = useState(false);

    useEffect(() => {
        console.log("Ready to Go: ", goStatus);
    }, [goStatus]);

    const handleGeoLocation = () => {
        setGoStatus({ ...goStatus, fetchingDistance: true });

        if ("geolocation" in navigator) {
            console.log("Available");

            // Get RealTIme Connection to that BizRelationship
            // to listen and update if/when customer decides to claim
            // a prize

            db.collection("user")
                .doc(user.uid)
                .collection("bizRelationship")
                .doc(storeId)
                .onSnapshot(
                    (doc) => {
                        console.log(
                            "Realtime Listerner to Updated Biz Relationship: ",
                            doc.data()
                        );

                        setUserBizRelationship({
                            realtionshipId: doc.id,
                            relationshipInfo: doc.data(),
                        });
                    },
                    (error) => {
                        console.log(
                            "Error getting User Biz Relationship: ",
                            error
                        );
                    }
                );
            /**
             *
             * After RealTime Relationship Data is retrieved
             * Do distance calcs
             */
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);

                let coordinateOne = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                let coordinateTwo = {
                    latitude: 40.7599133,
                    longitude: -73.9228225,
                };

                let distanceBetween = getDistanceBetween(
                    coordinateOne,
                    coordinateTwo
                );

                console.log("Kilometers: ", distanceBetween);

                setGeoDistance(distanceBetween);
                setGoStatus({
                    ...goStatus,
                    gotDistance: true,
                    fetchingDistance: false,
                });
            });
        } else {
            console.log("Geolocation Not Available in Your Browser");
        }
    };

    useEffect(() => {
        // Get Business Info
        db.collection("shops")
            .doc(storeId)
            .get()
            .then((doc) => {
                setBusiness(doc.data());
            })
            .catch((err) => {
                console.log("Error getting Business Info: ", err);
            });

        db.collection("shops")
            .doc(storeId)
            .collection("loyaltyPrizes")
            .get()
            .then((doc) => {
                console.log("docs: ", doc);
                setPrizes(
                    doc.docs.map((doc) => ({
                        prizeId: doc.id,
                        prize: doc.data(),
                    }))
                );
            })
            .catch((err) => {
                console.log("Error getting Prizes: ", err);
            });
    }, []);

    console.log("Business info: ", business);
    console.log("Prizes: ", prizes);
    console.log("User: ", user);
    console.log("Wallet Prize: ", walletPrize);

    //every time a new post is added this code fires
    const handleCheckin = () => {
        const currTime = new Date(Date.now());

        const len = userBizRelationship.relationshipInfo.visitLog.length;

        let lastCheckin =
            userBizRelationship.relationshipInfo.visitLog[len - 1];

        const lastCheckinObj = lastCheckin.toDate();

        console.log("Last Checkin To String: ", lastCheckinObj);

        const timeDiff = Math.abs(currTime - lastCheckinObj);

        const diffInMinutes = Math.ceil(timeDiff / (1000 * 60));

        console.log("Difference in Minutes: ", diffInMinutes);

        // First Check if Proximity is confirmed and user is logged in
        const goodToGo = goStatus.gotDistance && user ? true : false;

        if (!goodToGo) {
            setGoStatus({
                ...goStatus,
                error: "Provide Location & Ensure Login",
            });

            console.log("Check IN Button Go Status Not 100");
            return;
        }

        // console.log("Check In Button Working - goodToGo: ", goodToGo);

        // Check if Relationship with business exists
        db.collection("user")
            .doc(user.uid)
            .collection("bizRelationship")
            .doc(storeId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    console.log("Relationship Exists:", doc.data());

                    // Update the data
                    //**//

                    const timeStamp = new Date(Date.now());
                    // Update Counts and Log
                    db.collection("user")
                        .doc(user.uid)
                        .collection("bizRelationship")
                        .doc(storeId)
                        .update({
                            visitCount:
                                firebase.firestore.FieldValue.increment(1),
                            pointSum:
                                firebase.firestore.FieldValue.increment(1),
                            visitLog:
                                firebase.firestore.FieldValue.arrayUnion(
                                    timeStamp
                                ),
                        })
                        .then(() => {
                            console.log(
                                "BizRelationship Points Successfully Updated!"
                            );
                        })
                        .catch((error) => {
                            // The document probably doesn't exist.
                            console.error(
                                "Error updating BizRelationship Points: ",
                                error
                            );
                        });
                } else {
                    // doc.data() will be undefined in this case
                    console.log("Relationhip Doesn't Exist !");

                    const timeStamp = new Date(Date.now());
                    // Add New Relationship Doc Here
                    db.collection("user")
                        .doc(user.uid)
                        .collection("bizRelationship")
                        .doc(storeId)
                        .set({
                            visitCount: 1,
                            pointSum: 1,
                            redeemCount: 0,
                            redeemLog: [],
                            visitLog: [timeStamp],
                        })
                        .then(() => {
                            console.log("Document successfully written!");
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });
                }
            })
            .catch((error) => {
                console.log("Error getting relationship document:", error);
            });
    };

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackBar(false);
    };

    const encodeMsg = encodeurl(
        `Wanted to share this with you. Check them out. http://localhost:3000/shop/${storeId}/`
    );
    
      
    const smsMessage =
        platform.macos || platform.ios
            ? `sms:&body=${encodeMsg}`
            : `sms:?body=${encodeMsg}`;

    if (!business) {
        return <div>...Loading</div>;
    }

  if (!user) {
        return <div>...Loading</div>;
    }
    return (
        <div className="container">
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar
                            loading="lazy"
                            alt={business.businessName}
                            src={business.logoUrl}
                            sx={{
                                /* bgcolor: red[500],*/
                                width: 50,
                                height: 50,
                                margin: "auto",
                                padding: "10px",
                                border: "1px solid #f0f0f0",
                            }}
                        />
                    }
                    action={
                        <IconButton aria-label="add to favorites">
                            <LocalFireDepartmentIcon />
                        </IconButton>
                    }
                    title="Chick Shack"
                    subheader="36-19 Broadway, Astoria NY"
                />
                <Divider />

                <CardContent>
                    <AvailablePrizes
                        prizes={prizes}
                        handleOpenClaimModal={handleOpenClaimModal}
                        storeId={storeId}
                        handleOpenShareModal={handleOpenShareModal}
                    />
                    <Typography variant="body1" color="text.secondary">
                        Login Each Time You Visit and Get a Chance to Win a
                        Prize!
                    </Typography>
                    <br />
                    <Typography variant="body2" color="text.secondary">
                        Share With a Friend and they AUTOMATICALLY win the prize
                        when they Login
                    </Typography>
                </CardContent>
            </Card>
            {goStatus.gotDistance ? (
                // Created this component to render a different view
                // based on whether user is logged in already & thus
                // update useEffect dependancy variable to trigger db update
                <div>
                    {userBizRelationship ? (
                        <h3 style={{ color: "#f1f1f1" }}>
                            {" "}
                            Your Current {business.businessName} Points:{" "}
                            {userBizRelationship.relationshipInfo.pointSum}
                        </h3>
                    ) : (
                        <h3 style={{ color: "#f1f1f1" }}>
                            {" "}
                            Your Current {business.businessName} Points: 0
                        </h3>
                    )}

                    <CheckinAuth user={user} handleCheckin={handleCheckin} />
                </div>
            ) : (
                <GetLocation
                    handleGeoLocation={handleGeoLocation}
                    goStatus={goStatus}
                />
            )}

            <Modal
                open={openClaimModal}
                onClose={handleCloseClaimModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ textAlign: "center", borderColor: "#f0f0f0" }}
                    >
                        Sure About Adding To Your Wallet?
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, textAlign: "center" }}
                    >
                        Your Points Will Be Adjusted and Can't be Reversed.
                    </Typography>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            marginTop: "15px",
                        }}
                    >
                        <Button color="primary" onClick={handleAddToWallet}>
                            Add to Wallet
                        </Button>
                        <Button color="error" onClick={handleCloseClaimModal}>
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Modal>

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
                                url: `https://smartseedtech.com/${storeId}`, // (defaults to current url)

                                description: `Business Name: ${business.businessName}`, // (defaults to og:description or twitter:description)
                                title: `Business Name: ${business.businessName}`, // (defaults to og:title or twitter:title)
                                message: `Business Name: ${business.businessName}`, // (only for email sharing)
                                subject: `Business Name: ${business.businessName}`, // (only for email sharing)
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
                                    <a href={smsMessage+user.uid}>
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

            <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackBar}
                >
                    <Alert
                        onClose={handleCloseSnackBar}
                        severity={alertMsg.severity}
                        sx={{ width: "100%" }}
                    >
                        {alertMsg.message}
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    );
}

export default Checkin;
