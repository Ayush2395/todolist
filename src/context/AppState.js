import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../backend/firebase.config";

const AppContext = createContext();

export default function AppState({ children }) {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState({ error: false, msg: "" });

  const passwordValidation = () => {
    if (password === "" || confirmPass === "") {
      setError({ error: true, msg: "Invalid password" });
      return;
    }
    if (password !== confirmPass && password.length !== confirmPass.length) {
      setError({ error: true, msg: "Password does not match" });
      return;
    }
    return;
  };

  const inputFieldValidation = () => {
    if (email === "" || password === "") {
      return setError({ error: true, msg: "Invalid credential" });
    }
  };

  const registerNewUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(() => {
      sendEmailVerification(auth.currentUser);
    });
  };

  const registerGoogleUser = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then(
      sendEmailVerification(auth.currentUser)
    );
  };

  const loginNewUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleUser = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logOutUser = () => {
    return signOut(auth);
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
    <>
      <AppContext.Provider
        value={{
          user,
          email,
          password,
          confirmPass,
          error,
          setError,
          setEmail,
          setPassword,
          setConfirmPass,
          passwordValidation,
          inputFieldValidation,
          registerNewUser,
          loginNewUser,
          logOutUser,
          googleUser,
          registerGoogleUser,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}

export function useAppState() {
  return useContext(AppContext);
}
