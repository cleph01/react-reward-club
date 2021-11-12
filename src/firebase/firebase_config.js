import firebase from "firebase";

const config = {
    apiKey: "AIzaSyCjaMVP_4oXgsii0nO9NGvH8bWsV57wjFQ",
    authDomain: "socialiite-app.firebaseapp.com",
    projectId: "socialiite-app",
    storageBucket: "socialiite-app.appspot.com",
    messagingSenderId: "11532392600",
    appId: "1:11532392600:web:f834875484584aa16dd8ed",
    measurementId: "G-WQJL0G8E9Q",
};

const initFirebase = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
};

initFirebase();

// export default firebase;

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage, firebase };
