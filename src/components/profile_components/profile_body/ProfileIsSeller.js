import React, { useState } from "react";
import Switch from "react-switch";
import Button from "@mui/material/Button";

import "../../../styles/profile/profile_is_seller.scss";

function ProfileIsSeller() {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);
    };
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        seller: false,
        redirectToProfile: false,
        error: "",
    });

    const clickSubmit = () => {
        console.log("Submitted");
    };

    return (
        <>
            <div
                style={{
                    marginTop: "10px",
                    border: "0px solid #000",
                    borderRadius: "5px",
                }}
            >
                <label className="switch-label">
                    <span>Seller Account</span>
                    <Switch onChange={handleChange} checked={isChecked} />
                    <span>
                        {!values.seller && isChecked
                            ? "Pending Submit"
                            : "Not Active"}
                    </span>
                </label>

                <div className="submit-btn" onClick={clickSubmit}>
                    Submit
                </div>
            </div>
        </>
    );
}

export default ProfileIsSeller;
