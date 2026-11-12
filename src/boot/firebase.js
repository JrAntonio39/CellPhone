// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwMVfUFHL7StMT-LdZ1XnaWSTm-crzrwY",
  authDomain: "tienda-cellphone-4a5d6.firebaseapp.com",
  projectId: "tienda-cellphone-4a5d6",
  storageBucket: "tienda-cellphone-4a5d6.firebasestorage.app",
  messagingSenderId: "283571930481",
  appId: "1:283571930481:web:b42ae3d7764195520f62d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
