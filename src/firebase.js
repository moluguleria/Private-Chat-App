import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAX2QiYYtoR8v7xN1PXbeDSAfqoUPCZ-Xc",
  authDomain: "let-s-chat-d981c.firebaseapp.com",
  projectId: "let-s-chat-d981c",
  storageBucket: "let-s-chat-d981c.appspot.com",
  messagingSenderId: "113987229936",
  appId: "1:113987229936:web:4515227cad140ba9b38a35"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

