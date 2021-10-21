import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";

import { db } from "../../../firebase/firebase_config";

import FollowListItem from "./FollowListItem";

import Divider from "@mui/material/Divider";

import "./styles/follow_list.scss";

function FollowList({ bizRelationships, handleOpenShareModal }) {
    console.log("Available Prizes: ", bizRelationships);

    const [businessList, setBusinessList] = useState([]);
    const [prizes, setPrizes] = useState([]);

    const getItems = (item_ids, callback) => {
        let itemRefs = item_ids.map((id) => {
            return db.collection("shops").doc(id).get();
        });
        Promise.all(itemRefs)
            .then((docs) => {
                let items = docs.map((doc) => {
                    console.log("doc in promis: ", doc);
                    return { businessId: doc.id, businessInfo: doc.data() };
                });
                callback(items);
            })
            .catch((error) => console.log(error));
    };

    const handleSettingBusinessList = (items) => {
        console.log("Items List: ", items);
        setBusinessList(
            items.map((item) => ({
                businessId: item.businessId,
                businessInfo: item.businessInfo,
            }))
        );
    };

    const getPrizes = (item_ids, callback) => {
        let itemRefs = item_ids.map((id) => {
            return db
                .collection("shops")
                .doc(id)
                .collection("loyaltyPrizes")
                .get();
        });
        Promise.all(itemRefs)
            .then((docs) => {
                console.log("Big DOC: ", docs);
                let items = docs.map((doc) => {
                    console.log(" Mapped DOC: ", doc.id, " - ", doc);
                    console.log("mapped doc.docs", doc.docs);

                    return doc.docs;
                });
                callback(items);
            })
            .catch((error) => console.log(error));
    };

    const handleSettingPrizes = (items) => {
        items.forEach((docs) => {
            console.log("Remap Doc: ", docs);

            docs.forEach((item, index) => {
                setPrizes((prevState) => {
                    return [
                        ...prevState,
                        { prizeId: item.id, prizeInfo: item.data() },
                    ];
                });
            });
        });
    };

    useEffect(() => {
        const bizIds = bizRelationships.map(
            (relationship) => relationship.relationshipId
        );

        console.log("BizIds: ", bizIds);

        getItems(bizIds, handleSettingBusinessList);

        getPrizes(bizIds, handleSettingPrizes);
    }, []);

    if (!bizRelationships) {
        return <div>...Loading</div>;
    }

    console.log("Business Info: ", businessList);
    console.log("Prize List: ", prizes);
    return (
        <List className="prize-list-container">
            {businessList.map((business, i) => (
                <div key={i}>
                    <FollowListItem
                        business={business}
                        handleOpenShareModal={handleOpenShareModal}
                    />
                    <Divider />
                </div>
            ))}
        </List>
    );
}

export default FollowList;
