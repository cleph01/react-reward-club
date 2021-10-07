import React from "react";
import Avatar from "@mui/material/Avatar";
import "../../../styles/profile/profile_body_left.scss";

const imageSrc =
    "https://firebasestorage.googleapis.com/v0/b/socialiite-instagram-clone.appspot.com/o/images%2FIMG_82B4B1E571E6-1.jpeg?alt=media&token=4db7c353-d0a5-47c9-bc8a-31cdbbdad1e9";
// const imageSrc =
//     "https://firebasestorage.googleapis.com/v0/b/socialiite-instagram-clone.appspot.com/o/images%2Fnagatoshi-shimamura-slydelcNjYU-unsplash.jpg?alt=media&token=c5200024-941a-4b65-ac2d-2a308ce7e304";
function ProfileBodyLeft({ user }) {
    return (
        <div className="profile-body__left">
            <Avatar
                src={user.userInfo.avatarUrl}
                alt={user.userInfo.displayName}
                sx={{ width: 56, height: 56 }}
            />
            <div className="profile__personal-details">
                <div className="name">{user.userInfo.displayName}</div>
                <div className="handle">@cleph01</div>
                <div className="email"> {user.userInfo.email}</div>
            </div>
        </div>
    );
}

export default ProfileBodyLeft;
