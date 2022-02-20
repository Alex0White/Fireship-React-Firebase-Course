// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAOUZ-ERkOltSC8_9vCyMElBeMHrkwef0Q",
  authDomain: "nextfire-c9b14.firebaseapp.com",
  projectId: "nextfire-c9b14",
  storageBucket: "nextfire-c9b14.appspot.com",
  messagingSenderId: "678683436596",
  appId: "1:678683436596:web:bfa631383b6b6fc0ff0c61",
  measurementId: "G-Q7792BH0LP",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();






