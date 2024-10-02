'use client';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../app/firebase-config';

const AuthContext = createContext<any>({});

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<{} | null>({});
  const [role, setRole] = useState('viewer');
  const [plan, setPlan] = useState('Free');
  const [searches, setSearches] = useState(0);
  const [subscriptionDetails, setSubscriptionDetails] = useState({
    status: '',
    nextBilling: '',
    planId: '',
    id: '',
  });
  const [idToken, setIdToken] = useState<string | null>(null);

  async function googleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const newIdToken = await result.user.getIdToken();
      setIdToken(newIdToken);
      // Send token to backend for user management
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google-signin`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${newIdToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: result.user,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to sign in user');
      }

      const data = await response.json();
      setRole(data?.role || 'viewer');
      setPlan(data?.plan || 'Free');
      setSearches(data?.searches || 0);
      setSubscriptionDetails(data.subscriptionDetails);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const logOut = async () => {
    await signOut(auth);
    setRole('');
    setPlan('Free');
    setSearches(0);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const newIdToken = await currentUser.getIdToken(true);
          setIdToken(newIdToken);
          const docRef = doc(db, 'user-roles', currentUser.uid);
          const docSnap = await getDoc(docRef);
          const userData = docSnap.data();
          if (userData?.subscription_id) {
            console.log('getting sub');
            const subscriptionStatus = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/get-subscriptions/${currentUser.uid}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            ).then((res) => res.json());

            const currentDate = new Date().getTime() / 1000;

            if (userData?.current_term_end) {
              if (userData?.status === 'active') {
                if (userData?.current_term_end > currentDate) {
                  setSubscriptionDetails({
                    status:
                      subscriptionStatus.subscriptions[0].subscription.status,
                    nextBilling: 'Renewal Cancelled',
                    planId:
                      subscriptionStatus.subscriptions[0].subscription
                        .subscription_items[0].item_price_id,
                    id: subscriptionStatus.subscriptions[0].subscription.id,
                  });
                  setPlan(userData?.plan);
                  setRole(userData?.role);
                  setSearches(userData?.searches);
                } else {
                  setSubscriptionDetails({
                    status: 'Cancelled',
                    nextBilling: 'Renewal Cancelled',
                    planId: 'Free',
                    id: subscriptionStatus.subscriptions[0].subscription.id,
                  });
                  const docRef = doc(db, 'user-roles', currentUser?.uid);
                  getDoc(docRef)
                    .then((docSnapshot) => {
                      if (docSnapshot.exists()) {
                        updateDoc(docRef, {
                          status:
                            subscriptionStatus.subscriptions[0].subscription
                              .status,
                          plan: 'free',
                          role: 'viewer',
                          searches: 0,
                        });
                      } else {
                        console.log('Document does not exist.');
                      }
                      setPlan('Free');
                      setRole('viewer');
                      setSearches(0);
                    })
                    .catch((error) => {
                      console.error('Error fetching document: ', error);
                    });
                }
              } else {
                setSubscriptionDetails({
                  status: 'Cancelled',
                  nextBilling: 'Renewal Cancelled',
                  planId: 'Free',
                  id: subscriptionStatus.subscriptions[0].subscription.id,
                });
                setPlan('Free');
                setRole('viewer');
                setSearches(0);
              }
            } else {
              setSubscriptionDetails({
                status: subscriptionStatus.subscriptions[0].subscription.status,
                nextBilling:
                  subscriptionStatus.subscriptions[0].subscription
                    .next_billing_at,
                planId:
                  subscriptionStatus.subscriptions[0].subscription
                    .subscription_items[0].item_price_id,
                id: subscriptionStatus.subscriptions[0].subscription.id,
              });
              setPlan(userData?.plan);
              setRole(userData?.role);
              setSearches(userData?.searches);
            }
          }
        } catch (error) {
          console.error('Error fetching token:', error);
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
      value={{
        googleSignIn,
        logOut,
        user,
        role,
        setSearches,
        setRole,
        setPlan,
        plan,
        searches,
        idToken,
        setSubscriptionDetails,
        subscriptionDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
