import React from "react";
import "../../../styles/profile/profile_tabs.scss";

function ProfileTabs({
    handleShowPost,
    handleShowFollowing,
    handleShowFollowers,
}) {
    return (
        <div>
            <ul className="profile-tabs-block">
                <li className="profile-tabs__list-item">
                    <div onClick={handleShowPost}>SHOUT-OUTS</div>
                </li>
                <li className="profile-tabs__list-item">
                    <div onClick={handleShowFollowing}>FOLLOWING</div>
                </li>
                <li className="profile-tabs__list-item">
                    <div onClick={handleShowFollowers}>FOLLOWERS</div>
                </li>
            </ul>
        </div>
    );
}

export default ProfileTabs;
