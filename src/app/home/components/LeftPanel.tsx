import { UserAuth } from "@/context/authContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../../components/Button/Button";
import styles from "./LeftPanel.module.css";

const LeftPanel = () => {
  const pathname = usePathname();
    const { user, logOut } = UserAuth();

    const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className={styles.leftPanel}>
      <div>
      <h1>LeadsUp</h1>
      <ul>
        <li>
          <Link className={pathname === "/home" ? styles.active : ""} href="/home">Home</Link>
        </li>
        <li>
          <Link className={pathname === "/analyzer" ? styles.active : ""} href="/analyzer">Analyzer</Link>
        </li>
        <li>
          <Link className={pathname === "/history" ? styles.active : ""} href="/history">History</Link>
        </li>
        {!user &&<li>
          <Link href={"/signup"}>
            Signup
          </Link>
        </li>}
      </ul>
      </div>
      {user && <Button text="Log Out" type="Primary" onClick={handleSignOut} />}
    </nav>
  );
};

export default LeftPanel;