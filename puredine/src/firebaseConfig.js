import { initializeApp } from "firebase/app"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";


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


export function signIn() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export function logOut() {
  return signOut(auth);
}

export function useAuthentication() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  return user;
}
