"use client";
import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../app/firebase-config";

const AuthContext = createContext<any>({});

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<{} | null>({});
  const [role, setRole] = useState("viewer");
  const [searches, setSearches] = useState(0);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;

      const extraInfo = getAdditionalUserInfo(result);
      let newUser = false;
      if (extraInfo) {
        const { isNewUser } = extraInfo;
        newUser = isNewUser;
      }
      if (newUser) {
        setDoc(doc(db, "user-roles", user.uid), {
          role: "viewer",
          searches: 2000,
        });
        setRole("viewer");
        setSearches(2000);
      } else {
        console.log("User already exists");
        const docRef = doc(db, "user-roles", user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        console.log(userData);
        setRole(userData?.role);
        setSearches(userData?.searches);
      }
    });
    // signInWithRedirect(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, "user-roles", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        console.log(userData);
        setRole(userData?.role);
        setSearches(userData?.searches);
      }
      console.log("User", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ googleSignIn, logOut, user, role, setSearches, searches }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
