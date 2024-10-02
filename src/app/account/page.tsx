'use client';

import { UserAuth } from '@/context/authContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Button from '../components/Button/Button';
import { db } from '../firebase-config';
import LeftPanel from '../home/components/LeftPanel';

const Account = () => {
  const {
    user,
    idToken,
    role,
    subscriptionDetails,
    setSubscriptionDetails,
    searches,
    setRole,
    setSearches,
  } = UserAuth();

  const getPlanName = (planName: string) => {
    switch (planName) {
      case 'Basic-USD-Monthly':
        return 'Freelancer';

      case 'Plus-USD-Monthly':
        return 'Agency';

      case 'Pro-USD-Monthly':
        return 'Agency +';

      default:
        return 'Free';
    }
  };

  async function cancelSubscription(subscriptionId: any) {
    const requestData = { subscriptionId: subscriptionId };
    try {
      const response = await fetch(
        'http://localhost:8080/api/auth/cancel-subscription',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert('Subscription cancelled successfully');
        const docRef = doc(db, 'user-roles', user.uid);
        getDoc(docRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              updateDoc(docRef, {
                cancelled_at: data.subscription.cancelled_at,
                current_term_end: data.subscription.current_term_end,
              })
                .then(() => {
                  setSubscriptionDetails({
                    ...subscriptionDetails,
                    nextBilling: 'Renewal Cancelled',
                  });
                })
                .catch((error) => {
                  console.error('Error updating document: ', error);
                });
            } else {
              console.log('Document does not exist.');
            }
          })
          .catch((error) => {
            console.error('Error fetching document: ', error);
          });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      alert('Failed to cancel subscription.');
    }
  }

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
        {subscriptionDetails?.nextBilling && (
          <p>
            Next billing on :{' '}
            {subscriptionDetails?.nextBilling === 'Renewal Cancelled'
              ? 'Renewal Cancelled'
              : new Date(
                  subscriptionDetails?.nextBilling * 1000
                ).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
          </p>
        )}
        {subscriptionDetails.status === 'active' &&
          subscriptionDetails.nextBilling !== 'Renewal Cancelled' && (
            <Button
              type="secondary"
              onClick={() => cancelSubscription(subscriptionDetails.id)}
              text="Cancel Subscription"
            ></Button>
          )}
      </div>
    </div>
  );
};

export default Account;
