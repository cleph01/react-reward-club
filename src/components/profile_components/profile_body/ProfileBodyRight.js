import React from "react";
import ProfileIsSeller from "./ProfileIsSeller";
import "../../../styles/profile/profile_body_right.scss";

function ProfileBodyRight() {
    return (
        <div className="profile-body__right">
            <div className="profile__personal-details">
                <div className="name">Charlie</div>
                <div className="handle">@cleph01</div>
                <div className="email"> email@email.com</div>
            </div>
            <ProfileIsSeller />
            <div className="profile__follow-btn">Follow Button</div>
        </div>
    );
}

export default ProfileBodyRight;
