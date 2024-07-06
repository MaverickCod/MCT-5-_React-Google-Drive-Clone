import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB6rtc_yt4fIL-cvNJzRTJHMf01kKNlWls",
    authDomain: "drive-clone-pgc.firebaseapp.com",
    projectId: "drive-clone-pgc",
    storageBucket: "drive-clone-pgc.appspot.com",
    messagingSenderId: "128163260209",
    appId: "1:128163260209:web:9e8c2d5392564a7f347210"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider, storage };
