// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn2tZwpSEadofRwDs-iyrgS2BPh2GIWyA",
  authDomain: "meguesta-6e027.firebaseapp.com",
  projectId: "meguesta-6e027",
  storageBucket: "meguesta-6e027.appspot.com",
  messagingSenderId: "1053030391125",
  appId: "1:1053030391125:web:bdd2ca259ba74117e263dc"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getStorage(firebaseApp);