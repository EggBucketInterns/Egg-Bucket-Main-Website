import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCA3LHBnhpgI9UstaaewiqSZeVKx4AsSPI",
  authDomain: "b2c-main.firebaseapp.com",
  projectId: "b2c-main",
  storageBucket: "b2c-main.appspot.com",
  messagingSenderId: "644465249792",
  appId: "1:644465249792:web:4d64b23d65d401fbd292e5",
  measurementId: "G-SBL116DGDY"
};
// import.meta.env.VITE_projectId,
// VITE_apiKey="AIzaSyCA3LHBnhpgI9UstaaewiqSZeVKx4AsSPI"
// VITE_authDomain="b2c-main.firebaseapp.com"
// VITE_projectId="b2c-main"
// VITE_storageBucket="b2c-main.appspot.com"
// VITE_messagingSenderId="644465249792"
// VITE_appId=1:"644465249792:web:4d64b23d65d401fbd292e5"
// VITE_measurementId=G-"SBL116DGDY"

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);