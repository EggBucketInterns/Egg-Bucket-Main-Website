import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
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