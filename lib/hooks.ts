
import { auth, firestore } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { addDoc, setDoc, doc, collection, onSnapshot, getFirestore } from "firebase/firestore";

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState( auth as any);
  const [username, setUsername] = useState(null);
  
  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;
    
    if (user) {
      //const ref = firestore.collection('users').doc(user.uid);

      //const collectionRef = collection(firestore, "users");
      const documentRef = doc(firestore, "users", user.uid);

    unsubscribe = onSnapshot(documentRef, (querySnapshot) => {
        setUsername(querySnapshot.data()?.username);
      });

      // unsubscribe = ref.onSnapshot((doc) => {
      //   setUsername(doc.data()?.username);
      // });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}
