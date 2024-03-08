import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import 'firebase/auth'

const app =  initializeApp({
  apiKey: "AIzaSyBjTpfaozkFkJxcYmoNg289lmIQCOyu1LU",
  authDomain: "mobileapp-edf1b.firebaseapp.com",
  projectId: "mobileapp-edf1b",
  storageBucket: "mobileapp-edf1b.appspot.com",
  messagingSenderId: "964878359561",
  appId: "1:964878359561:web:6c5cce294c23deb72becd8",
  measurementId: "G-9HQES1LS51"
});

export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app