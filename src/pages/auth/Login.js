import { useState, useContext, forwardRef } from "react";

import { Redirect } from "react-router";

import { useParams } from "react-router-dom";

import Auth from "../../Auth";

import { UserContext } from "../../contexts/UserContext";

import "./styles/login.scss";

import logo from "../../assets/images/logos/logo.png";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Login() {
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [alertMsg, setAlertMsg] = useState({
        message: "",
        severity: "success",
    });

    const { authUser } = useContext(UserContext);

    const { referrerId } = useParams();

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackBar(false);
    };

    if (authUser) {
        return <Redirect to="/profile" />;
    }

    console.log("ReferrerId: ", referrerId);

    return (
        <>
            <div className="container">
                <div className="body-wrapper">
                    <div className="image-wrapper">
                        <img className="logo" src={logo} alt="logo" />
                    </div>

                    <h3>Win Stuff, Trade Stuff, Share Stuff</h3>
                    <h3>and Get Paid</h3>

                    <Auth
                        referrerId={referrerId}
                        setAlertMsg={setAlertMsg}
                        openSnackBar={openSnackBar}
                    />
                    
                </div>
            </div>
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
        </>
    );
}

export default Login;
