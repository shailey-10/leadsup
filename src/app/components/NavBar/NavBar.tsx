"use client";
import { UserAuth } from "@/context/authContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../Button/Button";
import styles from "./Navbar.module.css";
import { NAVBAR_SHOWN_URLS } from "./constants";

const NavBar = () => {
  const { user, logOut } = UserAuth();
  const pathname = usePathname();


  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  if(!NAVBAR_SHOWN_URLS.includes(pathname)){
    return null;
  }

  return (
    <div className={styles.navbar}>
      <Link href={"/"}>
        <p className={styles.logo}>
          Leads <span>Lyfter</span>
        </p>
      </Link>
      <div className={styles.items}>
        {!user?.displayName && (
          <Link href={"/pricing"}>
            <p>Pricing</p>
          </Link>
        )}
        <Link href={"/analyzer"}>
          <p>Analyzer</p>
        </Link>
        {user?.displayName ? (
          <button className={styles.logOut} onClick={handleSignOut}>
            Log Out
          </button>
        ) : (
          <Link href={"/signup"}>
            <Button text={"Signup"} type={"Primary"} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;