// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPOZGC2k_sxBR5EtTr9g9RBr-70C7vros",
  authDomain: "optiquechatenay-44520.firebaseapp.com",
  databaseURL: "https://optiquechatenay-44520-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "optiquechatenay-44520",
  storageBucket: "optiquechatenay-44520.appspot.com",
  messagingSenderId: "288485416278",
  appId: "1:288485416278:web:d673706364c38c60978af7",
  measurementId: "G-Z75D2GEN9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);