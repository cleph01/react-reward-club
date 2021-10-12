import { firebase, db } from "../../../firebase/firebase_config";

// db functions

const getBizRelationship = async (userId, storeId) => {
    try {
        const relationshipRef = await db
            .collection("user")
            .doc(userId)
            .collection("bizRelationship")
            .doc(storeId)
            .get();

        console.log("Relationship Doc: ", relationshipRef);
        return relationshipRef;
    } catch (error) {
        console.log("Error Getting Business Relationship");
    }
};

export { getBizRelationship };
