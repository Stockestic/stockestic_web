// stockestic_web\client\src\firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, sendEmailVerification, signInWithEmailLink, isSignInWithEmailLink, signInAnonymously } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const sendEmailLink = async (email) => {
  const actionCodeSettings = {
    url: window.location.href,
    handleCodeInApp: true,
  };
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  window.localStorage.setItem("emailForSignIn", email);
};

const confirmEmailLink = async () => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    const storedEmail = window.localStorage.getItem("emailForSignIn");
    await signInWithEmailLink(auth, storedEmail, window.location.href);
    const addEmail = httpsCallable(functions, "addEmail");
    await addEmail({email: storedEmail});
    alert("구독이 완료되었습니다!");
  }
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const functions = getFunctions(app, "asia-southeast1");
const analytics = getAnalytics(app);
