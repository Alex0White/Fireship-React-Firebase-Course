import "../styles/globals.css";
import { GetServerSideProps } from "next";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
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
import { where } from "firebase/firestore";

import { useUserData } from '../lib/hooks';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  console.log('This is the Userdata ' + userData.user + userData.username)

  return (
    <UserContext.Provider value={ userData }>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}
export default MyApp;
