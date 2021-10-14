import React, { useState, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase_config";
import Nav from "../../components/nav_bar/Nav";
import EditShopMod from "./components/EditShopMod";

import NewPromoButton from "../../components/products/NewPromoButton";

import EditAvailablePrizes from "./components/EditAvailablePrizes";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import "./styles/edit_shop.scss";

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

function EditShop() {
    const { shopId } = useParams();
    const [businessData, setBusinessData] = useState();
    const [prizes, setPrizes] = useState();
    // State to control Add Prize to Wallet Modal
    const [openEditModal, setOpenEditModal] = useState(false);
    // State to control Share Modal
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [promoDetails, setPromoDetails] = useState();
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [alertMsg, setAlertMsg] = useState({
        message: "",
        severity: "success",
    });

    useEffect(() => {
        // Query DB - Get Business Info
        db.collection("shops")
            .doc(shopId)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());

                    setBusinessData({
                        businessId: doc.id,
                        info: doc.data(),
                    });
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            });

        // Query DB - Get Loyalty Prizes
        db.collection("shops")
            .doc(shopId)
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

    const handleOpenEditModal = (itemObj) => {
        setOpenEditModal(true);
        setPromoDetails(itemObj);

        console.log("Promo Details: ", itemObj);
    };
    const handleCloseEditModal = () => setOpenEditModal(false);

    const handleSubmitEdit = () => {
        setAlertMsg({
            message: "Edit Submitted",
            severity: "success",
        });

        setOpenSnackBar(true);
    };

    const handleOpenDeleteModal = (itemObj) => {
        setOpenDeleteModal(true);
        setPromoDetails(itemObj);

        console.log("Promo Details: ", itemObj);
    };

    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const handleDelete = () => {
        setAlertMsg({
            message: "Promotion Deleted",
            severity: "success",
        });

        setOpenSnackBar(true);
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

    console.log("Store Id: ", shopId);
    console.log("Business Data: ", businessData);

    if (!businessData) {
        return <div>...Loading</div>;
    }
    return (
        <div>
            <Nav />
            <div className="edit-shop-container">
                <Card sx={{ maxWidth: 345, minWidth: 345 }}>
                    <EditShopMod businessData={businessData} />
                </Card>
                <Card sx={{ maxWidth: 345, minWidth: 345, margin: "15px 0px" }}>
                    <CardContent>
                        <div className="edit-product-wrapper">
                            <h3>Promotions</h3>
                            <Link to="/google">
                                <NewPromoButton />
                            </Link>
                        </div>

                        <EditAvailablePrizes
                            prizes={prizes}
                            shopId={shopId}
                            handleOpenDeleteModal={handleOpenDeleteModal}
                        />
                    </CardContent>
                </Card>
            </div>

            <Modal
                open={openEditModal}
                onClose={handleCloseEditModal}
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
                        Edit Prize Details
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, textAlign: "center" }}
                    >
                        Add Form
                    </Typography>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            marginTop: "15px",
                        }}
                    >
                        <Button color="primary" onClick={handleSubmitEdit}>
                            Submit
                        </Button>
                        <Button color="error" onClick={handleCloseEditModal}>
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
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
                        Delete this Promotion?
                    </Typography>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContents: "center",
                            border: "1px solid #e5e5e5",
                            borderRadius: "5px",
                            padding: "20px",
                            marginTop: "10px",
                        }}
                    >
                        <div style={{ fontSize: "56px" }}>
                            {promoDetails
                                ? promoDetails.prizeDetails.emoji
                                : "undefined"}
                        </div>
                        <div style={{ fontSize: "26px" }}>
                            {promoDetails
                                ? promoDetails.prizeDetails.itemDescription
                                : "undefined"}
                        </div>
                    </div>
                    <Typography
                        id="modal2-modal-description"
                        sx={{ mt: 2, textAlign: "center" }}
                    >
                        Cannot be Reversed
                    </Typography>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            marginTop: "15px",
                        }}
                    >
                        <Button color="primary" onClick={handleDelete}>
                            Yes, Delete
                        </Button>
                        <Button color="error" onClick={handleCloseDeleteModal}>
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

export default EditShop;
