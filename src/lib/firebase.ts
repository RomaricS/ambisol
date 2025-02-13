import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBk2lPBey3alZPajAhH2g-z0hMxXoLeR1A",
  authDomain: "ambisol.firebaseapp.com",
  projectId: "ambisol",
  storageBucket: "ambisol.firebasestorage.app",
  messagingSenderId: "622685809740",
  appId: "1:622685809740:web:b35b77ffbf767c1b3158e9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Create admin user and add sample products
const initialize = async () => {
};

initialize();