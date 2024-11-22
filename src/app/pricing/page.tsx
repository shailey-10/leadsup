'use client';
import { UserAuth } from '@/context/authContext';
import { Box, Modal } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Subscribe from '../components/Subscribe/Subscribe';
import { plans } from '../constants/constants';
import styles from './pricing.module.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const Pricing = () => {
  const { idToken, user, role } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.uid && role === 'member') {
      router.push('/analyzer');
    }
  }, [role, router, user]);
  const [domain, setDomain] = useState('');
  const [open, setOpen] = useState(false);
  const [credits, setCredits] = useState(0);
  const [id, setId] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Get domain name in the browser
    setDomain(window.location.host);
  }, []);
  // const subscribeChargebee = (planName: string) => {
  //   if (!user?.email) {
  //     router.push('/signup');
  //     return;
  //   } else {
  //     const uniqueId = uuidv4(); // Use a library like uuid

  //     if (planName === 'agency +') {
  //       router.push(
  //         `${process.env.NEXT_PUBLIC_CHARGEBEE_URL}/hosted_pages/checkout` +
  //           `?subscription_items[item_price_id][0]=Pro-USD-Monthly` +
  //           `&subscription_items[quantity][0]=1` +
  //           `&layout=in_app` +
  //           `&customer[email]=${encodeURIComponent(user.email)}` +
  //           `&redirect_url=${domain}paymentSuccess?checkoutId=${uniqueId}`
  //       );
  //     } else if (planName === 'freelancer') {
  //       router.push(
  //         `${process.env.NEXT_PUBLIC_CHARGEBEE_URL}/hosted_pages/checkout?subscription_items[item_price_id][0]=Basic-USD-Monthly&subscription_items[quantity][0]=1&layout=in_app` +
  //           `&customer[email]=${encodeURIComponent(user.email)}` +
  //           `&redirect_url=${domain}paymentSuccess?checkoutId=${uniqueId}`
  //       );
  //     } else {
  //       router.push(
  //         `${process.env.NEXT_PUBLIC_CHARGEBEE_URL}/hosted_pages/checkout?subscription_items[item_price_id][0]=Plus-USD-Monthly&subscription_items[quantity][0]=1&layout=in_app` +
  //           `&customer[email]=${encodeURIComponent(user.email)}` +
  //           `&redirect_url=${domain}paymentSuccess?checkoutId=${uniqueId}`
  //       );
  //     }
  //   }
  // };

  return (
    <div className={styles.main}>
      <h1>Start getting clients like never before!</h1>
      <div className={styles.pricingTable}>
        {plans.map((plan, index) => (
          <div className={styles.plan} key={index}>
            <div className={styles.planName}>
              {plan.icon}
              <h2 className={styles.planName}>{plan.name}</h2>
            </div>
            <p className={styles.planPrice}>{plan.price}</p>

            {/* {plan.name !== 'Agency +' && (
              <>
                <Subscribe credits={plan.credits} planId={plan.id} />
              </>
            )} */}

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
                marginBottom: '25px',
              }}
            >
              <button
                style={{
                  background: plan.name !== 'Agency +' ? '#000' : '#a6a6a4',
                  color: '#fff',
                  padding: '15px 40px',
                  borderRadius: '8px',
                  outline: 'none',
                  border: 'none',
                  width: '100%',
                  cursor: plan.name !== 'Agency +' ? 'pointer' : 'inherit',
                }}
                disabled={plan.name === 'Agency +'}
                onClick={() => {
                  if (!user) {
                    alert('Login to subscribe!');
                    router.push('/signup');
                    return;
                  }
                  setOpen(true);
                  setCredits(plan.credits);
                  setId(plan.id);
                }}
              >
                {plan.name === 'Agency +' ? 'Coming Soon!' : 'Subscribe'}
              </button>
            </div>

            <ul style={{ marginTop: '20px' }} className={styles.planFeatures}>
              {plan.features.map((feature, featureIndex) => (
                <li className={`${styles.planFeature}`} key={featureIndex}>
                  {feature.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Subscribe credits={credits} planId={id} />
        </Box>
      </Modal>
    </div>
  );
};

export default Pricing;
