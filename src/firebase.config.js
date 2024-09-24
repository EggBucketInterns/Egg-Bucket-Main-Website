import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyCA3LHBnhpgI9UstaaewiqSZeVKx4AsSPI",
  authDomain: "b2c-main.firebaseapp.com",
  projectId: "b2c-main",
  storageBucket: "b2c-main.appspot.com",
  messagingSenderId: "644465249792",
  appId: "1:644465249792:web:4d64b23d65d401fbd292e5",
  measurementId: "G-SBL116DGDY"
};



const app = initializeApp(firebaseConfig);

export const  auth = getAuth(app);