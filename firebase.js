import { initializeApp } from "firebase/app";
import { getFirestore }
    from "firebase/firestore";

 // Web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAF4UlHOduDAfxD1L2UF2oM289iSRgKLH4",

  authDomain: "ai-flashcards-dj.firebaseapp.com",

  projectId: "ai-flashcards-dj",

  storageBucket: "ai-flashcards-dj.appspot.com",

  messagingSenderId: "889402541495",

  appId: "1:889402541495:web:00b581ff4f7970dbfd9432",

  measurementId: "G-M1CFTL6PGJ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
