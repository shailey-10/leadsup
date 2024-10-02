'use client';
import { UserAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { plans } from '../constants/constants';
import styles from './pricing.module.css';

const Pricing = () => {
  const { idToken, user, role } = UserAuth();
  const router = useRouter();
  useEffect(() => {
    if (user?.uid && role === 'member') {
      router.push('/analyzer');
    }
  }, [role, router, user]);

  const subscribeChargebee = (planName: string) => {
    if (!user?.email) {
      router.push('/signup');
      return;
    } else {
      const uniqueId = uuidv4(); // Use a library like uuid

      if (planName === 'agency +') {
        router.push(
          `https://leadslyfter-test.chargebee.com/hosted_pages/checkout` +
            `?subscription_items[item_price_id][0]=Pro-USD-Monthly` +
            `&subscription_items[quantity][0]=1` +
            `&layout=in_app` +
            `&customer[email]=${encodeURIComponent(user.email)}` +
            `&redirect_url=https://localhost:3000/paymentSuccess?checkoutId=${uniqueId}`
        );
      } else if (planName === 'freelancer') {
        router.push(
          `https://leadslyfter-test.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Basic-USD-Monthly&subscription_items[quantity][0]=1&layout=in_app` +
            `&customer[email]=${encodeURIComponent(user.email)}` +
            `&redirect_url=https://localhost:3000/paymentSuccess?checkoutId=${uniqueId}`
        );
      } else {
        router.push(
          `https://leadslyfter-test.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Plus-USD-Monthly&subscription_items[quantity][0]=1&layout=in_app` +
            `&customer[email]=${encodeURIComponent(user.email)}` +
            `&redirect_url=https://localhost:3000/paymentSuccess?checkoutId=${uniqueId}`
        );
      }
    }
  };

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
            <div
              onClick={() => subscribeChargebee(plan.name.toLowerCase())}
              className={
                plan.name === 'Agency' ? styles.agencyCta : styles.planCta
              }
            >
              Get Started
            </div>
            <ul className={styles.planFeatures}>
              {plan.features.map((feature, featureIndex) => (
                <li className={`${styles.planFeature}`} key={featureIndex}>
                  {feature.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
