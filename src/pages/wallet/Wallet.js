import React, { forwardRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles/wallet.scss";
import { firebase, db } from "../../firebase/firebase_config";

import WalletItem from "./components/WalletItem";

import Nav from "../../components/nav_bar/Nav";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import ForumIcon from "@mui/icons-material/Forum";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import platform from "platform-detect/os.mjs";

import encodeurl from "encodeurl";

import { InlineShareButtons } from "sharethis-reactjs";

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

const Wallet = (props) => {
    // State to hold post data from Firebase call

    const { userId } = useParams();

    const [wallet, setWallet] = useState([]);
    const [walletItemId, setWalletItemId] = useState();

    // businessId for share modal
    const [shareBusiness, setShareBusiness] = useState();

    const [openClaimModal, setOpenClaimModal] = useState(false);
    // State to control Share Modal
    const [openShareModal, setOpenShareModal] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleOpen = (itemId) => {
        setOpenClaimModal(true);
        setWalletItemId(itemId);

        console.log("itemId: ", itemId);
    };
    const handleCloseClaimModal = () => setOpenClaimModal(false);

    const handleCloseShareModal = () => setOpenShareModal(false);

    //every time a new post is added this code fires
    useEffect(() => {
        db.collection(`user/${userId}/wallet`)
            .where("redeemed", "==", false)
            .onSnapshot((snapshot) => {
                setWallet(
                    snapshot.docs.map((doc) => ({
                        walletItemId: doc.id,
                        walletItem: doc.data(),
                    }))
                );
            });
    }, []);

    const handleRedeem = () => {
        db.collection("user")
            .doc(userId)
            .collection("wallet")
            .doc(walletItemId)
            .update({
                redeemed: true,
                redeemedOn: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
                console.log("Document successfully updated!");
                setOpenClaimModal(false);
                setOpenSnackBar(true);
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
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
        `Wanted to share this with you. Check them out. http://localhost:3000/shop/${
            shareBusiness.businessId
        }/${userId ? userId : "undefined"}`
    );
    const smsMessage =
        platform.macos || platform.ios
            ? `sms:&body=${encodeMsg}`
            : `sms:?body=${encodeMsg}`;

    console.log("Wallet: ", wallet);

    return (
        <>
            <div className="container">
                <Nav />

                <div className="wallet-wrapper">
                    <div className="header">
                        <h3>&#x1F4B0; Digital Wallet &#x1F4B0;</h3>
                    </div>
                    {wallet.length > 0 ? (
                        wallet.map((item, index) => (
                            <WalletItem
                                key={index}
                                itemId={item.walletItemId}
                                itemDetails={item.walletItem}
                                handleOpen={() => {
                                    handleOpen(item.walletItemId);
                                }}
                                handleCloseClaimModal={handleCloseClaimModal}
                                setShareBusiness={setShareBusiness}
                            />
                        ))
                    ) : (
                        <div>Empty Wallet</div>
                    )}
                </div>
            </div>
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
                        Please Show to Attendant
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, textAlign: "center" }}
                    >
                        Sure About Claiming Prize?
                    </Typography>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            marginTop: "15px",
                        }}
                    >
                        <Button color="primary" onClick={handleRedeem}>
                            Claim Prize
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
                                url: `https://smartseedtech.com/${shareBusiness.businessId}`, // (defaults to current url)

                                description: `Business Name: ${shareBusiness.businessName}`, // (defaults to og:description or twitter:description)
                                title: `Business Name: ${shareBusiness.businessName}`, // (defaults to og:title or twitter:title)
                                message: `Business Name: ${shareBusiness.businessName}`, // (only for email sharing)
                                subject: `Business Name: ${shareBusiness.businessName}`, // (only for email sharing)
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

            <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackBar}
                >
                    <Alert
                        onClose={handleCloseSnackBar}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Congratulations! Enjoy Your Prize.
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    );
};

export default Wallet;
