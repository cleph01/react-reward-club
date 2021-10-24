import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import "../../styles/profile_body_top.scss";

function ProfileBodyTop({ user }) {
    return (
        <div className="profile-body__top">
            <Avatar
                src={user.avatarUrl}
                alt={user.displayName}
                sx={{ width: 56, height: 56 }}
            />

            <Link to="/profile/edit">
                <div className="edit-profile-btn">Edit Profile</div>
            </Link>

            <div className="profile__personal-details">
                <div className="name">{user.displayName}</div>

                <div className="email"> {user.email}</div>
            </div>
        </div>
    );
}

export default ProfileBodyTop;
