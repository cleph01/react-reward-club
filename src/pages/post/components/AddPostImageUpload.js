import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { storage, db } from "../../../firebase/firebase_config";
import firebase from "firebase";
import "../styles/add_post_image_upload.scss";

function ProfileImageUpload({
    imgUrl,
    userId,

    altName,
}) {
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
            const uploadTask = storage
                .ref(`user/${userId}/avatar/${image.name}`)
                .put(image);

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
                        .ref(`user/${userId}/avatar/`)
                        .child(image.name)
                        .getDownloadURL()
                        .then((url) => {
                            // post image inside db
                            db.collection(`user`).doc(userId).update({
                                avatarUrl: url,
                            });

                            setProgress(0);

                            setImage(null);
                        });
                }
            );
        } else {
            alert("Image Upload Failed");
        }
    };
    return (
        <div className="profile-imageupload">
            <CardMedia
                component="img"
                alt={altName}
                height="140"
                src={!!image ? URL.createObjectURL(image) : imgUrl}
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
                    Change Image
                    <p className="file-name"></p>
                </label>
            </div>

            <div
                className="upload__btn"
                style={{ display: !!!image ? "none" : "flex" }}
                onClick={handleUpload}
            >
                Upload
            </div>
        </div>
    );
}

export default ProfileImageUpload;
