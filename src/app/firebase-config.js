// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrv_L5akLYRB_4U4Wwai1P5TnKWZF_ilA",
  authDomain: "leadsup-bd2ab.firebaseapp.com",
  projectId: "leadsup-bd2ab",
  storageBucket: "leadsup-bd2ab.appspot.com",
  messagingSenderId: "878912548898",
  appId: "1:878912548898:web:2dddd04089a393698d9a7b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);
