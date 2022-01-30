// import firebase from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKS-rldnMGZtL7B_06shdoJkbgguBTaV4",
  authDomain: "electron-chat-458f7.firebaseapp.com",
  projectId: "electron-chat-458f7",
  storageBucket: "electron-chat-458f7.appspot.com",
  messagingSenderId: "942871932145",
  appId: "1:942871932145:web:7bada591db4cb449128d50",
};

firebase.initializeApp(firebaseConfig);
// const firebaseApp =
//   getApps().length > 0
//     ? initializeApp(firebaseConfig)
//     : getApp();

const db = getFirestore();

const auth = firebase.auth();

// export { firebaseApp, auth, db };
export { auth, db };
