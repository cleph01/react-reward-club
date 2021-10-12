import React from "react";
import ProfileIsSeller from "./ProfileIsSeller";
import "../../styles/profile_body_right.scss";

function ProfileBodyRight({ user }) {
    console.log("Body Right: ", user.displayName);

    return (
        <div className="profile-body__right">
            <div className="profile__personal-details">
                <div className="name">{user.displayName}</div>
                <div className="handle">@cleph01</div>
                <div className="email"> {user.email}</div>
            </div>
            <ProfileIsSeller />
            <div className="profile__follow-btn">Follow Button</div>
        </div>
    );
}

export default ProfileBodyRight;
