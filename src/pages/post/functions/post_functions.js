import { firebase, db } from "../../../firebase/firebase_config";

/**
 * Gets the Businesses General Details
 * @param {string} shopId The Business Id as known in Firebase
 * @returns {promise} Firebase Promise to be resolved into Doc holding the
 */

const getAllBizRelationships = async (userId, setAllBizRelationships) => {
    return await db
        .collection("user")
        .doc(userId)
        .collection("bizRelationship")
        .get();
};
// Snapshot example
// const getAllBizRelationships = (userId, setAllBizRelationships) => {
//     return db
//         .collection("user")
//         .doc(userId)
//         .collection("bizRelationship")
//         .onSnapshot((snapshot) => {
//             setAllBizRelationships(
//                 snapshot.docs.map((doc) => {
//                     return { businessId: doc.id, businessInfo: doc.data() };
//                 })
//             );
//         });
// };

const getLoyaltyPrizes = async (shopId) => {
    return await db
        .collection("shops")
        .doc(shopId)
        .collection("loyaltyPrizes")
        .where("incentive", "==", true)
        .get();
};

const getBizRelationship = async (userId, shopId) => {
    return await db
        .collection("user")
        .doc(userId)
        .collection("bizRelationship")
        .doc(shopId)
        .get();
};

const addToWallet = async (userId, walletItem) => {
    const stampedWalletItem = {
        ...walletItem,
        created: firebase.firestore.FieldValue.serverTimestamp(),
    };
    return await db
        .collection("user")
        .doc(userId)
        .collection("wallet")
        .add(stampedWalletItem);
};

const decrementPoint = async (userId, relationshipId, prizePointThreshold) => {
    return await db
        .collection("user")
        .doc(userId)
        .collection("bizRelationship")
        .doc(relationshipId)
        .update({
            pointSum: firebase.firestore.FieldValue.increment(
                -prizePointThreshold
            ),
        });
};

const getComments = (shopId, setComments) => {
    return db
        .collection("shops")
        .doc(shopId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
            setComments(snapshot.docs.map((doc) => doc.data()));
        });
};

const postComment = async (shopId, comment, displayName) => {
    return db.collection("shops").doc(shopId).collection("comments").add({
        text: comment,
        username: displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

const followBusiness = async (userId, shopId) => {
    let response = {};
    await db
        .collection("user")
        .doc(userId)
        .update({
            followingBusinesses:
                firebase.firestore.FieldValue.arrayUnion(shopId),
        })
        .then(() => {
            console.log(
                "Successfully Added Business to User FollowingBusinesses"
            );

            response.AddToUserFollowing = true;
        })
        .catch((error) => {
            console.log(
                "Error Adding Business to User FollowingBusinesses: ",
                error
            );
        });

    await db
        .collection("shops")
        .doc(shopId)
        .update({
            followers: firebase.firestore.FieldValue.arrayUnion(userId),
        })
        .then(() => {
            console.log(
                "Successfully Added User to Business Info Followers Array"
            );

            response.AddToBusinessFollowers = true;
        })
        .catch((error) => {
            console.log(
                "Error Added User to Business Info Followers Array: ",
                error
            );
        });

    return response;
};

const unFollowBusiness = async (userId, shopId) => {
    let response = {};
    await db
        .collection("user")
        .doc(userId)
        .update({
            followingBusinesses:
                firebase.firestore.FieldValue.arrayRemove(shopId),
        })
        .then(() => {
            console.log(
                "Successfully Added Business to User FollowingBusinesses"
            );

            response.AddToUserFollowing = true;
        })
        .catch((error) => {
            console.log(
                "Error Adding Business to User FollowingBusinesses: ",
                error
            );
        });

    await db
        .collection("shops")
        .doc(shopId)
        .update({
            followers: firebase.firestore.FieldValue.arrayRemove(userId),
        })
        .then(() => {
            console.log(
                "Successfully Added User to Business Info Followers Array"
            );

            response.AddToBusinessFollowers = true;
        })
        .catch((error) => {
            console.log(
                "Error Added User to Business Info Followers Array: ",
                error
            );
        });

    return response;
};

export {
    getAllBizRelationships,
    getLoyaltyPrizes,
    getBizRelationship,
    addToWallet,
    decrementPoint,
    getComments,
    postComment,
    followBusiness,
    unFollowBusiness,
};
