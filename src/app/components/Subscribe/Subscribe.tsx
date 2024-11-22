// import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

// const Subscribe = () => {
//   // const saveSubscription = async (subscriptionID: string | null | undefined, status: string) => {
//   //   try {
//   //     await setDoc(doc(db, 'subscriptions', subscriptionID), {
//   //       subscriptionID,
//   //       status,
//   //       createdAt: new Date().toISOString(),
//   //     });
//   //     alert('Subscription saved successfully!');
//   //   } catch (error) {
//   //     console.error('Error saving subscription:', error);
//   //     alert('Failed to save subscription.');
//   //   }
//   // };

//   return (
//     <PayPalScriptProvider
//       options={{
//         clientId:
//           'AQ-TmMfstEwzbHl03ED4WIj5ZOV2r9rO_VfqvkzgsodSWY-LNrZKtUpyhy3NXNFabZyOftcsuOGShzMt',
//         components: 'buttons',
//         intent: 'subscription',
//         vault: true,
//       }}
//     >
//       <PayPalButtons
//         createSubscription={(data, actions) => {
//           return actions.subscription.create({
//             plan_id: 'P-173282126G6048415M4MSC3I', // Replace with your PayPal Plan ID
//           });
//         }}
//         onApprove={async (data, actions) => {
//           const { subscriptionID } = data;
//           try {
//             // Ensure the subscription is saved before finishing
//             // await saveSubscription(subscriptionID, 'active');
//             console.log('Subscription approved:', subscriptionID);
//             console.log(data);
//           } catch (error) {
//             console.error('Error during onApprove:', error);
//           }
//         }}
//         onCancel={() => {
//           alert('Subscription canceled.');
//         }}
//         onError={(err) => {
//           console.error('PayPal error:', err);
//           alert('An error occurred. Please try again.');
//         }}
//       />
//     </PayPalScriptProvider>
//   );
// };

// export default Subscribe;

import { db } from '@/app/firebase-config';
import { UserAuth } from '@/context/authContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
declare global {
  interface Window {
    paypal: any;
  }
}

const Subscribe = ({
  credits,
  planId,
}: {
  credits: number;
  planId: string;
}) => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const { user, setRole, setSearches, setSubscriptionDetails, setPlan } =
    UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (window.paypal) {
      window.paypal
        .Buttons({
          style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'subscribe',
          },
          createSubscription: (data: any, actions: any) => {
            return actions.subscription.create({
              plan_id: planId,
            });
          },
          onApprove: (data: any) => {
            const docRef = doc(db, 'user-roles', user.uid);
            getDoc(docRef).then(async (docSnapshot) => {
              if (docSnapshot.exists()) {
                const subscriptionData = await fetch(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/get-subscriptions/${data.subscriptionID}`,
                  {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }
                ).then((res) => res.json());
                const subscriptionStatus = subscriptionData.subscriptions;

                updateDoc(docRef, {
                  role: 'member',
                  searches: credits,
                  subscription_id: data.subscriptionID,
                  status: 'ACTIVE',
                  plan: subscriptionStatus.plan_id,
                })
                  .then(() => {
                    setRole('member');
                    setSearches(2000);
                    setPlan(subscriptionStatus.plan_id);
                    setSubscriptionDetails({
                      status: 'ACTIVE',
                      planId: subscriptionStatus.plan_id,
                      id: data.subscriptionID,
                    });
                    router.push('/paymentSuccess');
                  })
                  .catch((error) => {
                    console.error('Error updating document: ', error);
                  });
              }
            });
          },
        })
        .render(paypalRef.current!);
    }
  }, [
    credits,
    planId,
    router,
    setPlan,
    setRole,
    setSearches,
    setSubscriptionDetails,
    user,
  ]);

  return <div ref={paypalRef} />;
};

export default Subscribe;
