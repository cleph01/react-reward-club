import React, { useState } from "react";
import { useHistory } from "react-router";
import CardMedia from "@mui/material/CardMedia";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { storage, db, firebase } from "../../../firebase/firebase_config";

import PostActionBar from "./PostActionBar";
import "../styles/add_post_image_upload.scss";

function AddPostImageUpload({
    userId,
    businessInfo,
    businessPageRedirect,
    inputValues,
    displayName,
    setAlertMsg,
    setOpenSnackBar,
}) {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState();
    const [progress, setProgress] = useState(0);

    const history = useHistory();

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (
            !!!image ||
            !!!inputValues.caption ||
            !!!businessInfo.businessName
        ) {
            setAlertMsg({
                message: "Image, Caption, and Shop Must Be Filled In",
                severity: "error",
            });

            setOpenSnackBar(true);
        } else {
            if (image) {
                const uploadTask = storage
                    .ref(`user/${userId}/avatar/${image.name}`)
                    .put(image);

                uploadTask.on(
                    "state-changed",
                    (snapshot) => {
                        // progress bar function
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                                100
                        );

                        setProgress(progress);
                    },
                    (error) => {
                        // Error function
                        console.log(error);
                        alert(error.message);
                    },
                    () => {
                        // complete function...
                        storage
                            .ref(`user/${userId}/avatar/`)
                            .child(image.name)
                            .getDownloadURL()
                            .then((url) => {
                                // post image inside db
                                let postData = {
                                    imageUrl: url,
                                    caption: inputValues.caption,
                                    businessId: businessInfo.businessId,
                                    businessName: businessInfo.businessName,
                                    likes: [],
                                    timestamp:
                                        firebase.firestore.FieldValue.serverTimestamp(),
                                };

                                db.collection("user")
                                    .doc(userId)
                                    .collection("posts")
                                    .add(postData)
                                    .then((docRef) => {
                                        setAlertMsg({
                                            message:
                                                "Successfully Published Shoutout",
                                            severity: "success",
                                        });

                                        setOpenSnackBar(true);

                                        history.push(
                                            `/post/${userId}/${docRef.id}`
                                        );
                                    })
                                    .catch((error) => {
                                        setAlertMsg({
                                            message:
                                                "Error Publishin Shoutout. Try Again",
                                            severity: "error",
                                        });

                                        setOpenSnackBar(true);
                                    });

                                setProgress(0);

                                setImage(null);
                            });
                    }
                );
            } else {
                setAlertMsg({
                    message: "Image Upload Failed",
                    severity: "error",
                });

                setOpenSnackBar(true);
            }
        }
    };
    return (
        <div className="post-imageupload">
            {image ? (
                <CardMedia
                    component="img"
                    alt={image ? image.name : ""}
                    height="300"
                    src={!!image ? URL.createObjectURL(image) : ""}
                />
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #dcdcdc",
                        padding: "15px 35px",
                        borderRadius: "25px",
                    }}
                >
                    <InsertPhotoIcon
                        sx={{ color: "silver", fontSize: "93px" }}
                    />

                    <h4>Upload Image and Write Caption</h4>
                    <span style={{ fontSize: "36px" }}>👇</span>
                </div>
            )}

            <PostActionBar
                userId={userId}
                businessId={businessInfo.businessId}
                businessPageRedirect={businessPageRedirect}
                caption={inputValues.caption}
                displayName={displayName}
            />
            <progress
                className="imageupload__progress"
                value={progress}
                max="100"
            />
            <div className="file-input">
                <input
                    type="file"
                    className="file"
                    id="file"
                    onChange={handleChange}
                />
                <label htmlFor="file">
                    {!!image ? "Change Image" : "Upload Image"}
                    <p className="file-name"></p>
                </label>
            </div>

            <div
                className="upload__btn"
                style={{
                    display:
                        !!!image ||
                        inputValues.caption === "" ||
                        !!!businessInfo.businessName
                            ? "none"
                            : "flex",
                }}
                onClick={handleUpload}
            >
                Post
            </div>
        </div>
    );
}

export default AddPostImageUpload;
