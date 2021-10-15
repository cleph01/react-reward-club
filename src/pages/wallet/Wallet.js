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

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

    const [open, setOpen] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleOpen = (itemId) => {
        setOpen(true);
        setWalletItemId(itemId);

        console.log("itemId: ", itemId);
    };
    const handleClose = () => setOpen(false);

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
                setOpen(false);
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
                                item_details={item.walletItem}
                                handleOpen={() => {
                                    handleOpen(item.walletItemId);
                                }}
                                handleClose={handleClose}
                            />
                        ))
                    ) : (
                        <div>Empty Wallet</div>
                    )}
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
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
                        <Button color="error" onClick={handleClose}>
                            Cancel
                        </Button>
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
