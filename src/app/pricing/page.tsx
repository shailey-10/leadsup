import React from 'react';
import Button from '../components/Button/Button';
import styles from './pricing.module.css';
import { plans } from '../constants/constants';

const Pricing = () => {
  return (
    <div className={styles.main}>
      <div className={styles.cta}>
        <h1>Ready for 100X growth? Get early access for a discount!</h1>
        <p>
          Join our waitlist and get access to Leadsup for discounted early bird
          prices
        </p>
      </div>
      <div className={styles.formContainer}>
        <form action="https://submit-form.com/NrcdWE3k">
          <h1>Join the waitlist now</h1>
          <div className={styles.form}>
            <input
              type="text"
              placeholder="Enter your email"
            />
            <Button
              text={'Sign Up'}
              type={'CTA'}
            />
          </div>
        </form>
      </div>
      <div className={styles.pricingTable}>
        {plans.map((plan, index) => (
          <div
            className={styles.plan}
            key={index}
          >
            <h2 className={styles.planName}>{plan.name}</h2>
            <p className={styles.planPrice}>{plan.price}</p>
            <ul className={styles.planFeatures}>
              {plan.features.map((feature, featureIndex) => (
                <li
                  className={`${styles.planFeature} ${
                    feature.available ? styles.available : styles.unavailable
                  }`}
                  key={featureIndex}
                >
                  {feature.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.formContainer2}>
        <form action="https://submit-form.com/NrcdWE3k">
          <h1>Join the waitlist now</h1>
          <div className={styles.form}>
            <input
              type="text"
              placeholder="Enter your email"
            />
            <Button
              text={'Sign Up'}
              type={'CTA'}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pricing;
