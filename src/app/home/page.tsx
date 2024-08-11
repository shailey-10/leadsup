"use client";

import { UserAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import styles from "./home.module.css";
import LeftPanel from "./components/LeftPanel";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { user } = UserAuth();

  useEffect(() => {
    if (!user) {
      router.push("/signup");
    }
  }, [user, router]);

  return (
    <div className={styles.container}>
      <LeftPanel />
      <main className={styles.main}>
        <h1>Get started</h1>
        <p>There's multiple ways to find potential leads.</p>

        <div className={styles.optionsContainer}>
          <Link
            href="/analyzer?search=Gyms in New York"
            className={styles.freeOption}
          >
            <div className={styles.optionRow}>
              <Image
                src="/vercel.svg"
                alt="Search"
                width={24}
                height={24}
                className={styles.optionIcon}
              />
              <span className={styles.freeTag}>FREE</span>
            </div>
            <div>
              <h2>FREE search for "Gyms in New York"</h2>
              <p>Wanna test out the metrics we provide? check this out →</p>
            </div>
          </Link>

          <Link
            href="/pricing"
            className={`${styles.option} ${styles.upgradeSection}`}
          >
            <div className={styles.proBanner}>
              <h2>Upgrade to Pro</h2>
              <span className={styles.subscribeButton}>Subscribe</span>
            </div>
          </Link>

          <Link href="/analyzer" className={styles.option}>
            <div className={styles.optionRow}>
              <Image
                src="/vercel.svg"
                alt="Search"
                width={24}
                height={24}
                className={styles.optionIcon}
              />
              <span className={styles.proTag}>PRO</span>
            </div>
            <div className={styles.optionText}>
              <h2>Find with search</h2>
              <p>
                Find prospects by doing a simple search like "Gyms in New York"
              </p>
            </div>
          </Link>

          <Link href="/analyzer?mode=url" className={styles.option}>
            <div className={styles.optionRow}>
              <Image
                src="/vercel.svg"
                alt="Link"
                width={24}
                height={24}
                className={styles.optionIcon}
              />
              <span className={styles.proTag}>PRO</span>
            </div>
            <div className={styles.optionText}>
              <h2>Find with URL</h2>
              <p>Enter the website URL of a potential lead.</p>
            </div>
          </Link>

          <Link href="/analyzer?mode=csv" className={styles.option}>
            <div className={styles.optionRow}>
              <Image
                src="/vercel.svg"
                alt="CSV File"
                width={24}
                height={24}
                className={styles.optionIcon}
              />
              <span className={styles.proTag}>PRO</span>
            </div>
            <div className={styles.optionText}>
              <h2>Find with .csv</h2>
              <p>Upload a .csv file with links to potential leads.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
