import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./LeftPanel.module.css";

const LeftPanel = () => {
  const router = useRouter();

  return (
    <nav className={styles.leftPanel}>
      <h1>LeadsUp</h1>
      <ul>
        <li>
          <Link href="/home">Home</Link>
        </li>
        <li>
          <Link href="/analyzer">Analyzer</Link>
        </li>
        <li>
          <Link href="/history">History</Link>
        </li>
      </ul>
    </nav>
  );
};

export default LeftPanel;
