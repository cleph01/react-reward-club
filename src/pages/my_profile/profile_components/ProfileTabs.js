import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "../styles/profile_tabs.scss";
import PostGrid from "../post_grid_component/PostGrid";
import FollowBizList from "../follow_business_list/FollowBizList";
import FollowFriendsList from "../follow_friends_list/FollowFriendsList";

import { db } from "../../../firebase/firebase_config";

const TabContainer = (props) => {
    return (
        <Typography component="div" style={{ padding: 8 * 2 }}>
            {props.children}
        </Typography>
    );
};

function ProfileTabs({ userId, handleOpenShareModal, followingFriends }) {
    console.log("user Id at profile tabs: ", userId);
    const [tab, setTab] = useState(0);

    const handleTabChange = (event, value) => {
        setTab(value);
    };

    const [posts, setPosts] = useState([]);
    const [bizRelationships, setBizRelationships] = useState([]);

    useEffect(() => {
        // Get Posts
        db.collection("user")
            .doc(userId)
            .collection("posts")
            .orderBy("timestamp", "desc")
            .get()
            .then((posts) => {
                console.log("Posts in query: ", posts);
                setPosts(
                    posts.docs.map((doc) => ({
                        postId: doc.id,
                        post: doc.data(),
                    }))
                );
            })
            .catch((error) => {
                console.log("Error GEtting Posts: ", error);
            });

        // Get BizRelationsip Following
        // Get Posts
        db.collection("user")
            .doc(userId)
            .collection("bizRelationships")
            .get()
            .then((bizRelationships) => {
                console.log("Biz Relationships in query: ", bizRelationships);

                setBizRelationships(
                    bizRelationships.docs.map((doc) => ({
                        relationshipId: doc.id,
                        relationship: doc.data(),
                    }))
                );
            })
            .catch((error) => {
                console.log("Error GEtting Biz Relationships: ", error);
            });
    }, []);

    console.log("Biz Relationships: ", bizRelationships);
    console.log("Posts: ", posts);

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
                    <Tab
                        className="tab"
                        label={<span style={{ fonstSize: "46px" }}>🗣️</span>}
                    />
                    <Tab className="tab" label="💰" />
                    <Tab className="tab" label="🤜 🤛" />
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
