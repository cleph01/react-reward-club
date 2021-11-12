import { db } from "./firebase_config";

const doesUserExist = async (userId) => {
    const result = await db.collection("users").doc(userId).get();

    return result.exists;
};

const getUserByUserId = async (userId) => {
    const result = await db.collection("users").doc(userId).get();

    console.log("Result getUserByUserId: ", result);

    const user = {
        ...result.data(),
        userId,
    };

    return user;
};

const createNewUser = async (userId, newUserData) => {
    return await db
        .collection("users")
        .doc(userId)
        .set(newUserData, { merge: true });
};

export { doesUserExist, getUserByUserId, createNewUser };
