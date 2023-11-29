"use client";
import { UserAuth } from "@/context/authContext";
import Link from "next/link";
import { useEffect } from "react";
import Button from "../Button/Button";
import styles from "./Navbar.module.css";

const NavBar = () => {
  const { user, logOut } = UserAuth();
  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.navbar}>
      <Link href={"/"}>
        {/* <img
          src="/LeadsUpLogo.svg"
          alt="LeadsUp Logo"
          className={styles.logo}
        /> */}
        <p className={styles.logo}>
          Leads <span>Lyfter</span>
        </p>
      </Link>
      <div className={styles.items}>
        {/* <Link href={"/blog"}>
          <p>Blog</p>
        </Link> */}
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
