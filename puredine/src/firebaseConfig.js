import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCNbt9dkXaOzAbc5-h2HFaTXseKGmfvGvg",
  authDomain: "puredine-13017.firebaseapp.com",
  projectId: "puredine-13017",
  storageBucket: "puredine-13017.firebasestorage.app",
  messagingSenderId: "138157161777",
  appId: "1:138157161777:web:d1ab7278341d7109bf0410"
};


export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
