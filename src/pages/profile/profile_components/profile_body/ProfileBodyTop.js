import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import "../../styles/profile_body_top.scss";

const imageSrc =
    "https://firebasestorage.googleapis.com/v0/b/socialiite-instagram-clone.appspot.com/o/images%2FIMG_82B4B1E571E6-1.jpeg?alt=media&token=4db7c353-d0a5-47c9-bc8a-31cdbbdad1e9";
// const imageSrc =
//     "https://firebasestorage.googleapis.com/v0/b/socialiite-instagram-clone.appspot.com/o/images%2Fnagatoshi-shimamura-slydelcNjYU-unsplash.jpg?alt=media&token=c5200024-941a-4b65-ac2d-2a308ce7e304";
function ProfileBodyTop({ user, userId }) {
    return (
        <div className="profile-body__top">
            <Avatar
                src={user.userInfo.avatarUrl}
                alt={user.userInfo.displayName}
                sx={{ width: 56, height: 56 }}
            />

            <Link to={`/profile/edit/${userId}`}>
                <div className="edit-profile-btn">Edit Profile</div>
            </Link>

            <div className="profile__personal-details">
                <div className="name">{user.userInfo.displayName}</div>

                <div className="email"> {user.userInfo.email}</div>
            </div>
        </div>
    );
}

export default ProfileBodyTop;
