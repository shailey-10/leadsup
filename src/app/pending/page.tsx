"use client";
import { UserAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserPending = () => {
  const router = useRouter();
  const { user, role } = UserAuth();
  useEffect(() => {
    if (!user) {
      router.push("/signup");
    }
    if (user && role && role !== "viewer") {
      router.push("/analyzer");
    }
    console.log(user, role);
  }, [user, role]);
  return (
    <div style={{ textAlign: "center" }}>
      Plase wait for admin to approve your account
    </div>
  );
};

export default UserPending;
