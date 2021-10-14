import React, { useState } from "react";
import Button from "@mui/material/Button";
import { storage, db } from "../../../firebase/firebase_config";

import "../styles/shop_logo_upload.scss";

import UploadIcon from "@mui/icons-material/Upload";

function ShopLogoUpload({ imgUrl, businessId }) {
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
            // get file extension
            const lastDot = image.name.lastIndexOf(".");
            const ext = image.name.substring(lastDot);

            const uploadTask = storage
                .ref(`shop/${businessId}/logo/logo${ext}`)
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
                        .ref(`shop/${businessId}/logo`)
                        .child(`logo${ext}`)
                        .getDownloadURL()
                        .then((url) => {
                            // post image inside db
                            db.collection("shops").doc(businessId).update({
                                logoUrl: url,
                            });

                            setProgress(0);

                            setImage(null);
                            // setOpenUpload(false);
                        })
                        .catch((error) => {
                            // The document probably doesn't exist.
                            console.error("Error updating LogoUrl: ", error);
                        });
                }
            );
        } else {
            alert("Image Upload Failed");
        }
    };

    console.log("Logo Upload: ", businessId);
    return (
        <div className="profile-imageupload">
            <center>
                <img className="avatar" src={imgUrl} alt="avatar" />
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
                    Change Logo <UploadIcon />
                    <p className="file-name"></p>
                </label>
            </div>

            <Button
                // style={!image && { display: "none" }}
                onClick={handleUpload}
            >
                Upload
            </Button>
        </div>
    );
}

export default ShopLogoUpload;
