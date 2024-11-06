// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD2tJbslBv5-Y0ICExeTI4HLkJady70miY',
  authDomain: 'recipe-3a43a.firebaseapp.com',
  // databaseURL: 'https://recipe-3a43a-default-rtdb.firebaseio.com/',
  projectId: 'recipe-3a43a',
  storageBucket: 'recipe-3a43a.appspot.com',
  messagingSenderId: '857389154441',
  appId: '1:857389154441:web:75b0affedb9190431f8658',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
// export const database = getDatabase(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
