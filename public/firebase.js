import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, get, child } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBjRgnxfLph11ry_rsdiEbx8eLDI_c_aHg",
  authDomain: "landing-page-aldia.firebaseapp.com",
  projectId: "landing-page-aldia",
  storageBucket: "landing-page-aldia.firebasestorage.app",
  messagingSenderId: "327302632823",
  appId: "1:327302632823:web:ccb48a7030324ec1997d72"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export { ref, set, push, get, child};