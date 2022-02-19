import debounce from 'lodash.debounce';
import {
  googleAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
  app,
  doc,
  getDoc
  
} from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
} from "../lib/firebase";
import { getDocs, writeBatch } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect, useCallback } from "react";
import { Firestore, where } from "firebase/firestore";

export default function Enter(props) {
  const { user, username } = useContext(UserContext);
  // user signed out <SignInButton/>
  // user signed in, but mising username <UsernameForm />
  // user signed in, has username <SignOutButton />
  return (
    <main>
      
     {user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}
    </main>
  );
}

// sign in with google
function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(getAuth(app), googleAuthProvider);
  };
  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={"/google.png"} width="30px" /> Sign in with Google
    </button>
  );
}

// sign out with google
function SignOutButton() {
  return <button onClick={() => signOut(getAuth(app))}>Sign Out</button>;
}

function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    //const userDoc = doc(collection(getFirestore(app), `users/${user.uid}`))
    const userDoc = doc(getFirestore(), 'users', user.uid)
    //const usernameDoc = doc(collection(getFirestore(app), `usernames/${formValue}`))
    const usernameDoc = doc(getFirestore(), 'usernames', formValue)
    const batch = writeBatch(getFirestore(app))
    batch.set(userDoc, {username: formValue, photoURL: user.photoURL, displayName: user.displayName});
    batch.set(usernameDoc, {uid: user.uid })
    await batch.commit();
  };

  

  const onChange = (e) =>{
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    if(val.length < 3){
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
    }

    useEffect(() => {
      checkUsername(formValue);
  
    },[formValue]);

    const checkUsername = useCallback(
      debounce(async (username) => {
      if (username.length >= 3){
        console.log(username)
        

        const ref = doc(getFirestore(), 'usernames', username)
        console.log(ref)
        const docSnap = await getDoc(ref);
        let exists = false;
        if (docSnap.exists()) {
          console.log('Firestore read executed!');
          console.log("Document data:", docSnap.data());
          exists = true;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        setIsValid(!exists);
        setLoading(false);
      }
    }
  , 500),
  []
  );
    


  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input name="username" placeholder="username" value={formValue} onChange={onChange} />
          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>
          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>

        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}