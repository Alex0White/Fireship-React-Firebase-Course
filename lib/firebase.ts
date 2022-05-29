// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


export const fromMillis = firebase.firestore.Timestamp.fromMillis;



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

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
 export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;
export const increment = firebase.firestore.FieldValue.increment;
firebase.firestore().settings({ experimentalForceLongPolling: true });