import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKS-rldnMGZtL7B_06shdoJkbgguBTaV4",
  authDomain: "electron-chat-458f7.firebaseapp.com",
  projectId: "electron-chat-458f7",
  storageBucket: "electron-chat-458f7.appspot.com",
  messagingSenderId: "942871932145",
  appId: "1:942871932145:web:7bada591db4cb449128d50",
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();

const auth = app.auth();

export { db, auth };
