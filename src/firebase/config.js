// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcFVnTtXh-YUJ3Kxjciztiv8nCPHKbvK4",
  authDomain: "miniblog-68115.firebaseapp.com",
  databaseURL: "https://miniblog-68115-default-rtdb.firebaseio.com",
  projectId: "miniblog-68115",
  storageBucket: "miniblog-68115.appspot.com",
  messagingSenderId: "158463718358",
  appId: "1:158463718358:web:819e3f67a226b7d5cc2a77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db};