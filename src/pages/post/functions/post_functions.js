import { firebase, db } from "../../../firebase/firebase_config";


const postShoutout = async (userId, postData) => {
    return db.collection("user").doc(userId).collection("posts").add({
        ...postData,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
};


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
    postShoutout,
    getAllBizRelationships,
    getLoyaltyPrizes,
    getBizRelationship,
    addToWallet,
    decrementPoint,
    getComments,
    followBusiness,
    unFollowBusiness,
};
