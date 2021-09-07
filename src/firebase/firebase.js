import firebase from "firebase";

const config = {
    apiKey: "AIzaSyB6hnhcxAfZYXGhLBvtCJI7CKlFBMWu2us",
    authDomain: "reward-club-defbe.firebaseapp.com",
    projectId: "reward-club-defbe",
    storageBucket: "reward-club-defbe.appspot.com",
    messagingSenderId: "577285713008",
    appId: "1:577285713008:web:487b678954a1fbd03158b5",
    measurementId: "G-WVXMWTHNTC",
};

const initFirebase = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
};

// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage();

initFirebase();

export default firebase;
