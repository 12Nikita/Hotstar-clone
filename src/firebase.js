
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "API KEY",
  authDomain: "disney-plus-clone-3cbd4.firebaseapp.com",
  projectId: "disney-plus-clone-3cbd4",
  storageBucket: "disney-plus-clone-3cbd4.firebasestorage.app",
  messagingSenderId: "866776278497",
  appId: "1:866776278497:web:69d3c0aa819371478bdea0",
  measurementId: "G-SW8HSMZP3W"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { db,auth, provider, storage };

