import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import ProfileImageUpload from "./components/ProfileImageUpload";

import { db } from "../../firebase/firebase_config";

import "./styles/profile_edit.scss";

function EditProfile() {
    const { userId } = useParams();

    const [user, setUser] = useState();

    const [updateObj, setUpdateObj] = useState({});

    const handleChange = (name) => (event) => {
        setUpdateObj({ ...updateObj, [name]: event.target.value });
    };

    const handleUdate = () => {
        if (!!!updateObj.displayName && !!!updateObj.aboutMe) {
            console.log("Not Empty Updates");
        } else if (!!updateObj.displayName) {
            console.log("Update Object: ", updateObj);
            //Check if Display Name is Available
            db.collection("user")
                .where("displayName", "==", updateObj.displayName)
                .get()
                .then((querySnapshot) => {
                    if (querySnapshot.docs.length > 0) {
                        console.log("Display Name Already Exists");
                    } else {
                        console.log("Display Name is Available");
                    }
                })
                .catch((error) => {
                    console.log("error checking display name: ", error);
                });
        } else if (!!!updateObj.displayName && !!updateObj.aboutMe) {
            //update db directly
        }
    };
    useEffect(() => {
        db.collection("user")
            .doc(userId)
            .onSnapshot(
                (doc) => {
                    setUser(doc.data());
                },
                (error) => {
                    console.log("Error setting User: ", error);
                }
            );
    }, []);

    if (!user) {
        return <div>...Loading</div>;
    }

    return (
        <div className="edit-profile-container">
            <Card className="card">
                <CardContent className="card-content">
                    <Typography variant="h5">Edit Profile</Typography>
                    <ProfileImageUpload imgUrl={user.avatarUrl} />
                    <TextField
                        id="displayName"
                        label="Display Name"
                        value={updateObj.displayName || user.displayName}
                        onChange={handleChange("displayName")}
                        margin="normal"
                    />
                    <div
                        style={{
                            color: "#55ab6e",
                            display: !!updateObj.displayName ? "block" : "none",
                        }}
                    >
                        <small>Original Details</small>
                    </div>
                    <br />
                    <TextField
                        id="aboutMe"
                        label="About Me"
                        value={updateObj.aboutMe || user.aboutMe}
                        onChange={handleChange("aboutMe")}
                        margin="normal"
                        multiline
                    />
                    <div
                        style={{
                            color: "#55ab6e",
                            display: !!updateObj.displayName ? "block" : "none",
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
    );
}

export default EditProfile;
