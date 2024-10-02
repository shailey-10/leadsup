import { UserAuth } from '@/context/authContext';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './LeftPanel.module.css';

const LeftPanel = () => {
  const pathname = usePathname();
  const { user, logOut, role, plan } = UserAuth();

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push('/home');
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <nav className={styles.leftPanel}>
      <div>
        <Link href={'/home'}>
          <p className={styles.logo}>
            Leads <span>Lyfter</span>
          </p>
        </Link>
        <ul>
          <li>
            <Link
              className={pathname === '/home' ? styles.active : ''}
              href="/home"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={pathname === '/analyzer' ? styles.active : ''}
              href="/analyzer"
            >
              Analyzer
            </Link>
          </li>
          {user && (
            <li>
              <Link
                className={pathname === '/account' ? styles.active : ''}
                href={'/account'}
              >
                Account
              </Link>
            </li>
          )}
          {role !== 'member' && (
            <li>
              <Link href={'/pricing'}>Pricing</Link>
            </li>
          )}
          {!user && (
            <li>
              <Link href={'/signup'}>Signup</Link>
            </li>
          )}
        </ul>
      </div>
      {user && (
        <div className={styles.logout}>
          <Image
            src={user?.photoURL}
            alt="User Image"
            width={30}
            height={30}
          ></Image>
          <div>
            <p> {user.displayName} </p>
            <span> {getPlanName(plan)} </span>
          </div>
          <LogOut cursor="pointer" width={18} onClick={handleSignOut} />
        </div>
      )}
    </nav>
  );
};

export default LeftPanel;
