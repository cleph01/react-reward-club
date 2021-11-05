import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";

import { db } from "../../../firebase/firebase_config";

import FollowFriendsListItem from "./FollowFriendsListItem";

import Divider from "@mui/material/Divider";

import UpcomingMessage from "../components/UpcomingMessage";

import "./styles/follow_friends_list.scss";

function FollowList({ followingFriends }) {
    const [friendsList, setFriendsList] = useState([]);

    const getFriends = (user_ids, callback) => {
        let friendRefs = user_ids.map((id) => {
            return db.collection("user").doc(id).get();
        });
        Promise.all(friendRefs)
            .then((docs) => {
                let friends = docs.map((doc) => {
                    return { userId: doc.id, userInfo: doc.data() };
                });
                callback(friends);
            })
            .catch((error) => console.log(error));
    };

    const handleSettingFriendsList = (friends) => {
        setFriendsList(
            friends.map((friend) => ({
                userId: friend.userId,
                userInfo: friend.userInfo,
            }))
        );
    };

    useEffect(() => {
        getFriends(followingFriends, handleSettingFriendsList);
    }, []);

    if (!friendsList) {
        return <div>...Loading</div>;
    }

    console.log("FriendList: ", friendsList);
    return (
        <List className="prize-list-container">
            {friendsList.length > 0 ? (
                friendsList.map((friend, i) => (
                    <div key={i}>
                        <FollowFriendsListItem friend={friend} />
                        <Divider />
                    </div>
                ))
            ) : (
                <UpcomingMessage
                    message="Surround Yourself With Other Socialiites Making An Impact in Your World!"
                    emoji="🤜🤛"
                />
            )}
        </List>
    );
}

export default FollowList;
