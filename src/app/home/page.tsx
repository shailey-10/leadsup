'use client';

import { UserAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Button from '../components/Button/Button';
import LeftPanel from './components/LeftPanel';
import OptionsCards from './components/OptionsCards';
import { options } from './constants';
import styles from './home.module.css';

export default function Home() {
  const router = useRouter();
  const { user, searches, role } = UserAuth();

  useEffect(() => {
    if (!user || !user?.displayName) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div className={styles.container}>
      <LeftPanel />
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h1>
              {user?.displayName ? `Hi ${user.displayName} 👋🏻` : 'Get started!'}
            </h1>
            <p>There&apos;s multiple ways to find potential leads.</p>
          </div>
          <div className={styles.credits}>
            <p>
              Remaining Credits: <span> {searches} </span>{' '}
            </p>
          </div>
        </div>

        <div className={styles.optionsContainer}>
          {role !== 'member' && (
            <>
              <OptionsCards
                key={1}
                tier={'FREE'}
                title={"FREE search for 'Gyms in New York'"}
                description={
                  'Want to test out the metrics we provide? check this out →'
                }
                style={'freeTag'}
                image={'search'}
                link={'/demoData'}
              />
              <div className={styles.premiumUpsell}>
                <h2>Upgrade to Pro</h2>
                <Button
                  onClick={() => {
                    router.push('/pricing');
                  }}
                  text="Subscribe"
                  type="Primary"
                />
              </div>
            </>
          )}
          {options.map((option) => {
            return (
              <OptionsCards
                key={option.id}
                tier={option.tier}
                title={option.title}
                description={option.description}
                style={option.style}
                image={option.image}
                link={option.link}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
