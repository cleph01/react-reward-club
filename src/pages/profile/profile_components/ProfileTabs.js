import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "../styles/profile_tabs.scss";
import PostGrid from "../post_grid_component/PostGrid";
import FollowList from "../follow_list_component/FollowList";

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
                    <Tab className="tab" label="ShoutOuts" />
                    <Tab className="tab" label="Following" />
                    {/* <Tab className="tab" label="Followers" /> */}
                </Tabs>
            </AppBar>
            {tab === 0 && (
                <TabContainer>
                    <PostGrid posts={posts} userId={userId} />
                </TabContainer>
            )}
            {tab === 1 && (
                <TabContainer>
                    <FollowList
                        bizRelationships={bizRelationships}
                        handleOpenShareModal={handleOpenShareModal}
                    />
                </TabContainer>
            )}
            {tab === 2 && (
                <TabContainer>
                    <FollowList />
                </TabContainer>
            )}
        </div>
    );
}

export default ProfileTabs;
