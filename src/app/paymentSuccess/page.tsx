'use client';

import { UserAuth } from '@/context/authContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '../components/Button/Button'; // Add this import

const PaymentSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Use useSearchParams instead

  const query = Object.fromEntries(searchParams.entries()); // Convert to object

  const { setPlan } = UserAuth();

  const handleDashboardClick = () => {
    router.push('/home');
  };

  const { subscriptionDetails } = UserAuth();

  // const saveSubscriptionData = async () => {
  //   if (!user.uid) {
  //     console.error('User is undefined');
  //   } else {
  //     const subscriptionStatus = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/get-subscriptions/${user.uid}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     ).then((res) => res.json());
  //     setSubscriptionDetails({
  //       status: subscriptionStatus.subscriptions[0].subscription.status,
  //       planId:
  //         subscriptionStatus.subscriptions[0].subscription.subscription_items[0]
  //           .item_price_id,
  //       id: subscriptionStatus.subscriptions[0].subscription.id,
  //     });
  //     const docRef = doc(db, 'user-roles', user.uid);
  //     let searches = 0;
  //     const plan =
  //       subscriptionStatus.subscriptions[0].subscription.subscription_items[0]
  //         .item_price_id;

  //     setPlan(plan);
  //     if (plan === 'Basic-USD-Monthly') {
  //       searches = 500;
  //     } else {
  //       if (plan === 'Plus-USD-Monthly') {
  //         searches = 2000;
  //       } else {
  //         if (plan === 'Pro-USD-Monthly') {
  //           searches = 5000;
  //         }
  //       }
  //     }
  //     getDoc(docRef)
  //       .then((docSnapshot) => {
  //         if (docSnapshot.exists()) {
  //           // Check if the payment_reference key exists
  //           updateDoc(docRef, {
  //             role: 'member',
  //             searches: searches,
  //             subscription_id:
  //               subscriptionStatus.subscriptions[0].subscription.id,
  //             status: subscriptionStatus.subscriptions[0].subscription.status,
  //             plan: subscriptionStatus.subscriptions[0].subscription
  //               .subscription_items[0].item_price_id,
  //             current_term_end: deleteField(),
  //             cancelled_at: deleteField(),
  //           })
  //             .then(() => {
  //               setRole('member');
  //               setSearches(searches);
  //             })
  //             .catch((error) => {
  //               console.error('Error updating document: ', error);
  //             });
  //         } else {
  //           console.log('Document does not exist.');
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching document: ', error);
  //       });
  //   }
  // };

  // useEffect(() => {
  //   saveSubscriptionData();
  // }, [user]);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h2>Payment is successfull</h2>
        <p style={{ marginTop: '5px' }}>
          Reference Id : {subscriptionDetails.id}
        </p>
        <div style={{ marginLeft: '50px', marginTop: '20px' }}>
          <Button
            onClick={handleDashboardClick}
            type="primary"
            text="Go to Dashboard"
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
