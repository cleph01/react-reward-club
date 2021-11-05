import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "../styles/profile_tabs.scss";
import PostGrid from "../post_grid_component/PostGrid";
import FollowBizList from "../follow_business_list/FollowBizList";
import FollowFriendsList from "../follow_friends_list/FollowFriendsList";

const TabContainer = (props) => {
    return (
        <Typography component="div" style={{ padding: 8 * 2 }}>
            {props.children}
        </Typography>
    );
};

function ProfileTabs({
    userId,
    posts,
    bizRelationships,
    handleOpenShareModal,
    followingFriends,
}) {
    const [tab, setTab] = useState(0);

    const handleTabChange = (event, value) => {
        setTab(value);
    };

    return (
        <div className="profile-tabs-container">
            <AppBar position="static" color="default">
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="fullWidth"
                >
                    <Tab className="tab" label="My Shouts" />
                    <Tab className="tab" label="My Brands" />
                    <Tab className="tab" label="My People" />
                </Tabs>
            </AppBar>
            {tab === 0 && (
                <TabContainer>
                    <PostGrid posts={posts} userId={userId} />
                </TabContainer>
            )}
            {tab === 1 && (
                <TabContainer>
                    <FollowBizList
                        bizRelationships={bizRelationships}
                        handleOpenShareModal={handleOpenShareModal}
                    />
                </TabContainer>
            )}
            {tab === 2 && (
                <TabContainer>
                    <FollowFriendsList followingFriends={followingFriends} />
                </TabContainer>
            )}
        </div>
    );
}

export default ProfileTabs;
