import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "../../../styles/profile/profile_tabs.scss";
import PostGrid from "../../post_grid_component/PostGrid";
import FollowGrid from "../../follow_grid_component/FollowGrid";

const TabContainer = (props) => {
    return (
        <Typography component="div" style={{ padding: 8 * 2 }}>
            {props.children}
        </Typography>
    );
};

function ProfileTabs({ user, posts }) {
    const [tab, setTab] = useState(0);

    const handleTabChange = (event, value) => {
        setTab(value);
    };

    return (
        <div style={{ margin: "20px 50px" }}>
            <AppBar position="static" color="default">
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="fullWidth"
                >
                    <Tab label="Posts" />
                    <Tab label="Following" />
                    <Tab label="Followers" />
                </Tabs>
            </AppBar>
            {tab === 0 && (
                <TabContainer>
                    <PostGrid itemData={posts} />
                </TabContainer>
            )}
            {tab === 1 && (
                <TabContainer>
                    <FollowGrid people={user} />
                </TabContainer>
            )}
            {tab === 2 && (
                <TabContainer>
                    <FollowGrid people={user} />
                </TabContainer>
            )}
        </div>
    );
}

export default ProfileTabs;
