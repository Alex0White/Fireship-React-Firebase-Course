import { app } from "../lib/firebase";
import {
  getAuth,
  getFirestore,
  collection,
  onSnapshot,
  query,
} from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { where, getDocs,   } from "firebase/firestore";

export function useUserData(){
  const [user] = useAuthState(getAuth(app));
  console.log('the user auth', user)
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;
    let db = getFirestore(app)
    
    if (user) {
      console.log('user is true')
      let theUsername = collection(db, "users");
      console.log('the username = ' + theUsername.firestore.app.name)
      const ref = query(theUsername, where("uid", "==", user.uid));
      console.log('this is the ref ' + ref.firestore.app.name)

      

      unsubscribe = onSnapshot(ref, (querySnapshot) => {
        setUsername(
          querySnapshot.forEach((doc) => {
            console.log( 'doc id and data ' + doc.id, " => ", doc.data());
            doc.data()?.username;
            console.log('user snapshot', doc.data()?.username)
          })
        );
      });
    } else {
      setUsername(null);
    }
    return unsubscribe;
  }, [user]);
  try{
  console.log('user + username ' + user.uid + username)
  } catch(e){
    console.log('error user + username')
  }
  return {user, username};
}