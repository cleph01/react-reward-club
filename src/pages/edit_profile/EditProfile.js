import { useState, useEffect, forwardRef, useContext } from "react";
import { useParams } from "react-router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import ProfileImageUpload from "./components/ProfileImageUpload";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { UserContext } from "../../contexts/UserContext";

import { db } from "../../firebase/firebase_config";
import * as FUNCTIONS from "./functions/edit_profile_functions";

import "./styles/profile_edit.scss";
import { Unsubscribe } from "@mui/icons-material";

function EditProfile() {
    const { userState, userDispatch } = useContext(UserContext);

    const [updateObj, setUpdateObj] = useState({});

    const [openSnackBar, setOpenSnackBar] = useState(false);

    const [alertMsg, setAlertMsg] = useState({
        message: "",
        severity: "",
    });

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleChange = (name) => (event) => {
        setUpdateObj({ ...updateObj, [name]: event.target.value });
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackBar(false);
    };

    const handleUdate = () => {
        if (
            !FUNCTIONS.isUpdateObjEmpty(updateObj, setAlertMsg, setOpenSnackBar)
        ) {
            if (!!updateObj.displayName) {
                FUNCTIONS.updateDisplayNameIfAvailable(
                    userState.userId,
                    updateObj,
                    setAlertMsg,
                    setOpenSnackBar,
                    setUpdateObj
                );
            } else if (!!!updateObj.displayName && !!updateObj.aboutMe) {
                FUNCTIONS.updateUserInfo(
                    userState.userId,
                    updateObj,
                    setAlertMsg,
                    setOpenSnackBar,
                    setUpdateObj
                );
            }
        }
    };

    if (!userState.isAuthenticated) {
        return <div>...Loading</div>;
    }

    console.log("Edit Profile Reducer State: ", userState);
    console.log("Edit Profile Object: ", updateObj);

    return (
        <>
            <div className="edit-profile-container">
                <Card className="card">
                    <CardContent className="card-content">
                        <Typography variant="h5">Edit Profile</Typography>
                        <ProfileImageUpload
                            userId={userState.userId}
                            imgUrl={userState.avatarUrl}
                            altName={userState.displayName}
                        />
                        <TextField
                            id="displayName"
                            label="Display Name"
                            value={
                                updateObj.displayName || userState.displayName
                            }
                            onChange={handleChange("displayName")}
                            margin="normal"
                        />
                        <div
                            style={{
                                color: "#55ab6e",
                                display: !!!updateObj.displayName
                                    ? "block"
                                    : "none",
                            }}
                        >
                            <small>Original Details</small>
                        </div>
                        <br />
                        <TextField
                            id="aboutMe"
                            label="About Me"
                            value={
                                updateObj.aboutMe ||
                                userState.aboutMe ||
                                "Tell Us Something About Yourself"
                            }
                            onChange={handleChange("aboutMe")}
                            margin="normal"
                            multiline
                        />
                        <div
                            style={{
                                color: "#55ab6e",
                                display: !!!updateObj.aboutMe
                                    ? "block"
                                    : "none",
                            }}
                        >
                            <small>Original Details</small>
                        </div>
                        <br />{" "}
                    </CardContent>
                    <div className="btn-wrapper">
                        <div className="submit-btn" onClick={handleUdate}>
                            Submit
                        </div>
                    </div>
                </Card>
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

export default EditProfile;
