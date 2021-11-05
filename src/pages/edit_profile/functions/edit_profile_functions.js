import { firebase, db } from "../../../firebase/firebase_config";

const isUpdateObjEmpty = (updateObj, setAlertMsg, setOpenSnackBar) => {
    if (!!!updateObj.displayName && !!!updateObj.aboutMe) {
        console.log("Cannot Submit Original Details");

        setAlertMsg({
            message: "Cannot Submit Original Details",
            severity: "error",
        });

        setOpenSnackBar(true);

        return true;
    } else {
        return false;
    }
};

const updateDisplayNameIfAvailable = async (
    userId,
    updateObj,
    setAlertMsg,
    setOpenSnackBar,
    setUpdateObj
) => {
    var isAvailable;

    await db
        .collection("user")
        .where("displayName", "==", updateObj.displayName)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.docs.length > 0) {
                console.log("Display Name Already Exists");

                setAlertMsg({
                    message: "Display Name Already Exists",
                    severity: "error",
                });

                setOpenSnackBar(true);
            } else {
                // Update user displayName
                console.log("Display Name is Available");

                updateUserInfo(
                    userId,
                    updateObj,
                    setAlertMsg,
                    setOpenSnackBar,
                    setUpdateObj
                );
            }
        })
        .catch((error) => {
            console.log("Error getting Display Name: ", error);
        });

    return isAvailable;
};

const updateUserInfo = async (
    userId,
    updateObj,
    setAlertMsg,
    setOpenSnackBar,
    setUpdateObj
) => {
    await db
        .collection("user")
        .doc(userId)
        .update(updateObj)
        .then(() => {
            console.log("Update Obj in Functions: ", updateObj);
            setAlertMsg({
                message: "Profile Successfully Updated!",
                severity: "success",
            });

            setUpdateObj({});

            setOpenSnackBar(true);
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
            setAlertMsg({
                message: "Error Updating Profile",
                severity: "error",
            });

            setOpenSnackBar(true);
        });
};

export { isUpdateObjEmpty, updateDisplayNameIfAvailable, updateUserInfo };
