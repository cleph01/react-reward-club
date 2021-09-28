import React, { useState } from "react";
import Button from "@mui/material/Button";
import { storage, db } from "../../firebase/firebase_config";
import firebase from "firebase";
import "../../styles/image_upload/profile_image_upload.scss";

function ProfileImageUpload({ imgUrl, userId, username, setOpenUpload }) {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(imgUrl);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (image) {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);

            uploadTask.on(
                "state-changed",
                (snapshot) => {
                    // progress bar function
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then((url) => {
                            // post image inside db
                            db.collection("posts").add({
                                timestamp:
                                    firebase.firestore.FieldValue.serverTimestamp(),

                                imageUrl: url,
                                username: username,
                                userId: userId,
                            });

                            setProgress(0);

                            setImage(null);
                            setOpenUpload(false);
                        });
                }
            );
        } else {
            alert("Image Upload Failed");
        }
    };
    return (
        <div className="profile-imageupload">
            <center>
                <img className="avatar" src={url} alt="avatar" />
            </center>

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
                    Change Image
                    <p className="file-name"></p>
                </label>
            </div>

            <Button
                style={!image && { display: "none" }}
                onClick={handleUpload}
            >
                Upload
            </Button>
        </div>
    );
}

export default ProfileImageUpload;
