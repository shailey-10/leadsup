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
const baseUrl = process.env.API_BASE_URL;

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<{} | null>({});
  const [role, setRole] = useState("viewer");
  const [searches, setSearches] = useState(0);
const [idToken, setIdToken] = useState<string | null>(null);
  // const googleSignIn = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider).then(async (result) => {
  //     const user = result.user;

  //     const extraInfo = getAdditionalUserInfo(result);
  //     let newUser = false;
  //     if (extraInfo) {
  //       const { isNewUser } = extraInfo;
  //       newUser = isNewUser;
  //     }
  //     if (newUser) {
  //       setDoc(doc(db, "user-roles", user.uid), {
  //         role: "viewer",
  //         searches: 2000,
  //       });
  //       setRole("viewer");
  //       setSearches(2000);
  //     } else {
  //       console.log("User already exists");
  //       const docRef = doc(db, "user-roles", user.uid);
  //       const docSnap = await getDoc(docRef);
  //       const userData = docSnap.data();
  //       console.log(userData);
  //       setRole(userData?.role);
  //       setSearches(userData?.searches);
  //     }
  //   });
  //   // signInWithRedirect(auth, provider);
  // };

  // Client-side code using async/await

  async function googleSignIn() {
    try {
      console.log("Signing in");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const newIdToken = await result.user.getIdToken();
      setIdToken(newIdToken);
      // Use the idToken to make a request to your protected route
      const response = await fetch(`http://localhost:8080/api/analyzer/protected`, {
        headers: {
Authorization: "Bearer " + newIdToken        
      }});
      console.log(idToken, 'id token')
      if (!response.ok) {
        throw new Error("HTTP error! status: " + response.status);
      }

      const user = result.user;
      const extraInfo = getAdditionalUserInfo(result);
      const isNewUser = extraInfo?.isNewUser;

      if (isNewUser) {
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

      const data = await response.json();
      console.log("Protected data:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const logOut = () => {
    signOut(auth);
    setRole('')
    setSearches(0)
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const newIdToken = await currentUser.getIdToken(true);
          setIdToken(newIdToken);

          const docRef = doc(db, "user-roles", currentUser.uid);
          const docSnap = await getDoc(docRef);
          const userData = docSnap.data();
          setRole(userData?.role);
          setSearches(userData?.searches);
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      } else {
        setIdToken(null);
        
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  
  return (
    <AuthContext.Provider
      value={{ googleSignIn, logOut, user, role, setSearches, searches, idToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
