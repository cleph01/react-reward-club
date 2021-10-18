import React from "react";
import "../../styles/profile_bio.scss";

function ProfileBio({ user }) {
    console.log("User in Bio", user);

    const dateJoined = user.userInfo.created.toDate().toDateString();
    return (
        <div className="profile__bio">
            <div className="profile__bio-textArea">
                <h3>About Me</h3>
                {user.userInfo.bio || "Tell Us Something"}
            </div>
            <div className="profile__bio-joined">Joined: {dateJoined}</div>
        </div>
    );
}

export default ProfileBio;
