import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";; 
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyCkqN8Sj2ys9SIkXrQFEohnQJU-hGyU2WY",
  authDomain: "restuarentapp-236ff.firebaseapp.com",
  projectId: "restuarentapp-236ff",
  storageBucket: "restuarentapp-236ff.appspot.com",
  messagingSenderId: "1070344174371",
  appId: "1:1070344174371:web:a294e14fbc5326141eaa96",
  measurementId: "G-9N9Z20CT3V"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

// Set persistence to AsyncStorage
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Auth persistence set successfully.");
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });


export { auth , db , storage};
