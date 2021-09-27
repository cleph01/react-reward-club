import React, { useState } from "react";
import ProfileTabs from "../components/profile_components/profile_body/ProfileTabs";
import ProfileHeader from "../components/profile_components/profile_header/ProfileHeader";
import ProfileBodyLeft from "../components/profile_components/profile_body/ProfileBodyLeft";
import ProfileBodyRight from "../components/profile_components/profile_body/ProfileBodyRight";
import ProfileBio from "../components/profile_components/profile_bio/ProfileBio";
import ProfileRecentActivity from "../components/profile_components/profile_recent_activity/ProfileRecentActivity.js";
import FollowGrid from "../components/follow_grid_component/FollowGrid";

import "../styles/profile/profile.scss";

function Profile() {
    const [tabsBar, setTabsBar] = useState({
        showPosts: false,
        showFollowing: false,
        showFollowers: false,
    });
    const [showPosts, setShowPosts] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);

    const handleShowPost = () => {
        setShowPosts(!showPosts);
    };

    const handleShowFollowing = () => {
        setShowFollowing(!showFollowing);
    };

    const handleShowFollowers = () => {
        setShowFollowers(!showFollowers);
    };

    return (
        <div className="profile-container">
            <ProfileHeader />
            <div className="profile-body-wrapper">
                <ProfileBodyLeft />
                <ProfileBodyRight />
            </div>
            <ProfileBio />
            <ProfileRecentActivity />
            <ProfileTabs
                handleShowPost={handleShowPost}
                handleShowFollowing={handleShowFollowing}
                handleShowFollowers={handleShowFollowers}
            />
            {showPosts && <FollowGrid />}
            {showFollowing && <FollowGrid />}
            {showFollowers && <FollowGrid />}
            {/* <ul>
                <li>
                    Videos/Images Created by User Promoting/Endorsing a Business
                </li>
                <li>Others can Litte up videos and images</li>
                <li>The more litts you get, the more free stuff you win</li>
                <li></li>
            </ul> */}
        </div>
    );
}

export default Profile;
