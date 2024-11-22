'use client';

import { UserAuth } from '@/context/authContext';
import LeftPanel from '../home/components/LeftPanel';

const Account = () => {
  const {
    user,

    subscriptionDetails,
  } = UserAuth();

  const getPlanName = (planName: string) => {
    switch (planName) {
      case 'P-9CA97503EW608442PM4MRTXQ':
        return 'Freelancer';

      case 'P-6SW07264NX224922MM4MRU4Y':
        return 'Agency';
      // update here when pro introduced
      case 'Pro-USD-Monthly':
        return 'Agency +';

      default:
        return 'Free';
    }
  };

  // async function cancelSubscription(subscriptionId: any) {
  //   const requestData = { subscriptionId: subscriptionId };
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/cancel-subscription`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(requestData),
  //       }
  //     );

  //     const data = await response.json();

  //     if (response.ok) {
  //       alert('Subscription cancelled successfully');
  //       const docRef = doc(db, 'user-roles', user.uid);
  //       getDoc(docRef)
  //         .then((docSnapshot) => {
  //           if (docSnapshot.exists()) {
  //             updateDoc(docRef, {
  //               cancelled_at: data.subscription.cancelled_at,
  //               current_term_end: data.subscription.current_term_end,
  //             })
  //               .then(() => {
  //                 setSubscriptionDetails({
  //                   ...subscriptionDetails,
  //                   nextBilling: 'Renewal Cancelled',
  //                 });
  //               })
  //               .catch((error) => {
  //                 console.error('Error updating document: ', error);
  //               });
  //           } else {
  //             console.log('Document does not exist.');
  //           }
  //         })
  //         .catch((error) => {
  //           console.error('Error fetching document: ', error);
  //         });
  //     } else {
  //       throw new Error(data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error cancelling subscription:', error);
  //     alert('Failed to cancel subscription.');
  //   }
  // }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
      }}
    >
      <LeftPanel />
      <div
        style={{
          padding: '85px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          background: '#F9F9F9',
          flex: 1,
        }}
      >
        <h2>Account Details</h2>
        <p style={{ fontSize: '20px', marginTop: '10px' }}>
          Hi 👋🏻 {user?.displayName}
        </p>
        <p>Plan : {getPlanName(subscriptionDetails?.planId)}</p>
        <p>
          Status :{' '}
          {subscriptionDetails?.status ? subscriptionDetails?.status : 'N/A'}
        </p>
        <p>
          Subscription Id :{' '}
          {subscriptionDetails?.id ? subscriptionDetails?.id : 'N/A'}
        </p>

        {/* // this should lead to paypal */}
        <p>
          <b>Note: </b>
          To cancel your subscription please visit your paypal dashboard
        </p>
      </div>
    </div>
  );
};

export default Account;
