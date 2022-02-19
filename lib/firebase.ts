// Import the functions you need from the SDKs you need

import { initializeApp, getApps } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { getStorage } from "firebase/storage";

import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  doc,
  getDoc,
} from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAOUZ-ERkOltSC8_9vCyMElBeMHrkwef0Q",
  authDomain: "nextfire-c9b14.firebaseapp.com",
  projectId: "nextfire-c9b14",
  storageBucket: "nextfire-c9b14.appspot.com",
  messagingSenderId: "678683436596",
  appId: "1:678683436596:web:bfa631383b6b6fc0ff0c61",
  measurementId: "G-Q7792BH0LP",
};

let app;
// Initialize Firebase
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  console.log('app was created ' + app)
}

const analytics = getAnalytics(app);

const googleAuthProvider = new GoogleAuthProvider();

export {
  app,
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  googleAuthProvider,
  signInWithPopup,
  signOut,
  collection,
  getFirestore,
  onSnapshot,
  query,
  doc,
  getDoc,
};
