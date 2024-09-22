import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
  apiKey: "AIzaSyDnbuIabyVzvdk4l2jNmjCBL3LNaGpjqwE",
  authDomain: "recipe-app-b45d4.firebaseapp.com",
  projectId: "recipe-app-b45d4",
  storageBucket: "recipe-app-b45d4.appspot.com",
  messagingSenderId: "704173439989",
  appId: "1:704173439989:web:6b38d260132dcccc41bebc",
  databaseURL:"https://recipe-app-b45d4-default-rtdb.firebaseio.com/"
};


export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);