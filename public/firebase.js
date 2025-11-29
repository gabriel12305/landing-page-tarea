import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, get, child } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBimwM1KdZ4NWo_oxYbhQxMTSUj2W2sPmk",
  authDomain: "landing2-9af07.firebaseapp.com",
  projectId: "landing2-9af07",
  storageBucket: "landing2-9af07.firebasestorage.app",
  messagingSenderId: "169120870256",
  appId: "1:169120870256:web:7c93bd5573766996d8e9b5"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export { ref, set, push, get, child};