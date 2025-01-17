// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAPUY-7WWYh0nsD4cCwo5A3oMPXdwp3zAg",
  authDomain: "disney-plus-clone-85b77.firebaseapp.com",
  projectId: "disney-plus-clone-85b77",
  storageBucket: "disney-plus-clone-85b77.appspot.com",
  messagingSenderId: "216488564370",
  appId: "1:216488564370:web:da93ba3b8543e4cca0b84b"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { db,auth, provider, storage };
export default db;
