import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../service/firebase.config";
import AuthContext from "./AuthContext";

function UserAuthState({ children }) {
  const [user, setUser] = useState("");

  const registerNewUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const googleAuth = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <div>
      <AuthContext.Provider
        value={{ registerNewUser, user, loginUser, logOut, googleAuth }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
}

export default UserAuthState;

export function useAuthContext() {
  return useContext(AuthContext);
}
