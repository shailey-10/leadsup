'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from './components/Button/Button';
import UspCard from './components/UspCard/UspCard';
import { HIGHLIGHTS, USP_CARDS } from './constants/constants';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.radial}></div>
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.content}>
            <h1>
              <span> Supercharge </span>Your Agency&apos;s <br /> Growth with{' '}
              <span> Qualified </span> Leads
            </h1>
            <p>
              Equip your agency with powerful insights to reach businesses in
              need of your expertise and secure high-value clients effortlessly.
            </p>
            <Link href={'/signup'}>
              {' '}
              <Button text={'Get Started Now'} type={'Primary'} />
            </Link>
          </div>
          <div className={styles.image}>
            <iframe
              src="https://player.vimeo.com/video/1032435104?h=73abbfe23f&badge=0&autopause=0&player_id=0&app_id=58479?title=0&byline=0&portrait=0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              title="Leads Lyfter - Demo"
              width="560"
              style={{ borderRadius: '10px' }}
              height="315"
              frameBorder={0}
            ></iframe>
          </div>
        </div>
        <div className={styles.uspContainer}>
          {USP_CARDS.map((card, i) => {
            return (
              <UspCard
                key={i}
                imageUrl={card.imageUrl}
                heading={card.heading}
                description={card.description}
              />
            );
          })}
        </div>
        <div className={styles.potential}>
          <div className={styles.radial2}></div>

          <h2>
            A business running facebook ads having a site that&apos;s not
            responsive for mobile, sounds like an{' '}
            <span> ideal target client right?</span>
          </h2>
          <p>
            Targeted messaging to leads can help you boost the conversion for
            your outreach campaigns. Find exactly where your prospects lack and
            understand how you can help them and address their pain points
            directly. Boost the number of meetings shceduled, the deals closed
            and revenue generated!
          </p>
        </div>
        <div className={styles.highlights}>
          <h2>
            Target the right businesses with the right messaging and 100X your
            growth!
          </h2>
          <p>
            Leads Lyfter is the all-in-one solution that revolutionizes lead
            generation and insights for web design and digital marketing
            agencies. Our powerful platform equips you with the tools and data
            to identify high-quality leads, optimize your campaigns, and propel
            your agency&apos;s success.
          </p>
          <Image
            className={styles.highlightImage}
            src="/DashboardSnapshot.svg"
            alt="Product image"
            width={500}
            height={300}
          />
          <div className={styles.uspContainer}>
            {HIGHLIGHTS.map((card, i) => {
              return (
                <UspCard
                  key={i}
                  imageUrl={card.imageUrl}
                  heading={card.heading}
                  description={card.description}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.potential}>
          <div className={styles.cta}>
            <h2>
              Be the First to Experience Leads Lyfter - Sign Up for Early
              Access!
            </h2>
            <p>
              Don&apos;t miss out on the game-changing solution that will
              revolutionize your agency&apos;s success. Sign up for early access
              to Leads Lyfter and gain a competitive edge in lead generation,
              marketing campaigns, and more. Get exclusive access to our
              groundbreaking features before anyone else.
            </p>
            <div className={styles.form}>
              <Link href={'/signup'}>
                {' '}
                <Button text={'Get Started Now'} type={'Secondary'} />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
